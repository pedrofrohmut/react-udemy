import { Router, Request, Response, NextFunction } from "express"

import UserModel from "../models/user-model"
import { hashPassword, generateJWT, matchPasswordAndHash } from "../utils/auth-utils"

import type { UserDb } from "../types"

const registerUsersRoutes = (router: Router, baseUrl: string): void => {

  // @route GET /api/users
  // @description Debug route for development mode
  // @access development
  router.get(baseUrl, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
        const customErr = new Error("Unexpected error occurred when getting all users")
        customErr.name = "Get All User Error"
        customErr.stack = err.stack
        next(customErr)
      }
      console.log("Unknown error when getting all users", err)
    }
  })


  // @route POST /api/users/signup
  // @description Create a new user with a hashed password
  // @access public
  router.post(`${baseUrl}/signup`, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { name, email, password } = req.body

      // Request body validation
      if (!name     || !name.trim()     ||
          !email    || !email.trim()    ||
          !password || !password.trim() || (password && password.length <= 3))
      {
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
        const customErr = new Error("Unexpected error occurred when trying to create a new user")
        customErr.name = "SignUp Error"
        customErr.stack = err.stack
        next(customErr)
      }
      console.log("Unknown error when sign up: ", err)
    }
  })

  // @route POST /api/users/signin
  // @description Sign In users with email and password to get a AuthToken
  // @access public
  router.post(`${baseUrl}/signin`, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password } = req.body

      // Validate request body
      if (!email || !email.trim() || !password || !password.trim()) {
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
        const customErr = new Error("Unexpected error occurred when trying to sign in a user")
        customErr.name = "SignIn Error"
        customErr.stack = err.stack
        next(customErr)
      }
      console.log("Unknown error when sign in: ", err)
    }
  })

}

export default registerUsersRoutes
