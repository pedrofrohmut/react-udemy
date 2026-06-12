import { Router, Request, Response, NextFunction } from "express"
import jose from "jose"

import UserModel from "../models/user-model"
import { hashPassword, generateJWT, matchPasswordAndHash, getUserIdFromToken } from "../utils/auth-utils"

import type { UserDb } from "../types"

const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (process.env.NODE_ENV !== "development") {
    res.status(401)
    res.json({ message: "Not authorized in production" })
    return
  }

  try {
    const users = await UserModel.find().sort({ createdAt: -1 })
    res.status(200)
    res.json(users)
  } catch (err) {
    if (err instanceof Error) {
      const customErr = new Error("Unexpected error occurred trying to get all users")
      customErr.name = "Get All User Error"
      customErr.stack = err.stack
      next(customErr)
      return
    }
    console.log("Unknown error trying to get all users", err)
  }
}

const signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, password } = req.body || {}

    // Request body validation
    if (
      !name     || !name.trim()     ||
      !email    || !email.trim()    ||
      !password || !password.trim() || password.length <= 3
    ) {
      res.status(400)
      if (password && password.length <= 3) {
        res.json({ message: "Password must be at least 4 characters long" })
      } else {
        res.json({ message: "name, email and password are required to sign up" })
      }
      return
    }

    const userDb = await UserModel.find({ email })
    if (userDb) {
      res.status(400)
      res.json({ message: "User with this e-mail already exists. This e-mail is not available." })
      return
    }

    const passwordHash = hashPassword(password)

    // Save to mongo
    const query = new UserModel({ name, email, passwordHash })
    await query.save()

    res.status(201).json({ message: "User created" })
  } catch (err) {
    if (err instanceof Error) {
      const customErr = new Error("Unexpected error occurred trying to sign up")
      customErr.name = "SignUp Error"
      customErr.stack = err.stack
      next(customErr)
      return
    }
    console.log("Unknown error trying to sign up: ", err)
  }
}

const signIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Validate request body
    const { email, password } = req.body || {}

    if (!email || (email && !email.trim()) || !password || (password && !password.trim())) {
      res.status(400)
      res.json({ message: "email and password are required to sign in" })
      return
    }

    // Check user exists
    const userDb = await UserModel.findOne({ email }) as UserDb
    if (!userDb) {
      res.status(400)
      res.json({ message: "User not found with the e-mail" })
      return
    }

    // Check if password matches
    const isMatch = await matchPasswordAndHash(password, userDb.passwordHash)
    if (!isMatch) {
      res.status(400)
      res.json({ message: "Password does not match the one for this e-mail" })
      return
    }

    // Gen jwt
    const userId = userDb._id.toString()
    const accessToken = await generateJWT({ userId }, "short")
    const refreshToken = await generateJWT({ userId }, "long")

    // Set refresh token in HTTP-Only cookie (cant be accessed by javascript, more secure)
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
    })

    res.status(200)
    res.json({
      userId,
      name: userDb.name,
      email: userDb.email,
      accessToken,
    })
  } catch (err) {
    if (err instanceof Error) {
      const customErr = new Error("Unexpected error occurred trying to sign in")
      customErr.name = "SignIn Error"
      customErr.stack = err.stack
      next(customErr)
      return
    }
    console.log("Unknown error trying to sign in: ", err)
  }
}

const signOut = (req: Request, res: Response, next: NextFunction): void => {
  // res.clearCookie("refreshToken", { httpOnly: true, secure: true, sameSite: "none" })
  try {
    res.clearCookie("refreshToken") // TODO: Check if you need options. Use above line if so
    res.status(200)
    res.json({ message: "User signed out" })
  } catch (err) {
    if (err instanceof Error) {
      const customErr = new Error("Unexpected error occurred trying to sign out")
      customErr.name = "SignOut Error"
      customErr.stack = err.stack
      next(customErr)
      return
    }
    console.log("Unknown error trying to sign out: ", err)
  }
}

const refresh = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Get token from request
    const token = req.cookies?.refreshToken
    if (!token) {
      res.status(401)
      res.json({ message: "No refresh token in the request" })
      return
    }

    // Extract userId from token
    const userId = await getUserIdFromToken(token)
    if (!userId) {
      res.status(401)
      res.json({ message: "Invalid token. Not userId on token payload" })
      return
    }

    // Check db
    const userDb = await UserModel.findById(userId).lean()
    if (!userDb) {
      res.status(401)
      res.json({ message: "User not from token not found" })
      return
    }

    const newAccessToken = await generateJWT({ userId }, "short")

    res.status(200)
    res.json({
      userId,
      name: userDb.name,
      email: userDb.email,
      accessToken: newAccessToken,
    })
  } catch (err) {
    res.status(401)
    next(err)
  }
}

const registerUsersRoutes = (router: Router, baseUrl: string): void => {

  // @route GET /api/users
  // @description Debug route for development mode
  // @access development
  router.get(baseUrl, getAllUsers)


  // @route POST /api/users/signup
  // @description Create a new user with a hashed password
  // @access public
  router.post(`${baseUrl}/signup`, signUp)

  // @route POST /api/users/signin
  // @description Sign In users with email and password to get a AuthToken
  // @access public
  router.post(`${baseUrl}/signin`, signIn)

  // @route POST /api/users/signout
  // @description Signs out a user - destroys the refreshToken
  // @access authenticated
  router.post(`${baseUrl}/signout`, signOut)

  // @route POST /api/users/refresh
  // @description Generate new access token from refresh token
  // @access authenticated (only refresh token, http cookie)
  router.post(`${baseUrl}/refresh`, refresh)

}

export default registerUsersRoutes
