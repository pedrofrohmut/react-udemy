import { Router, Request, Response, NextFunction } from "express"
import bcrypt from "bcryptjs"

import UserModel from "../models/user-model"

const registerUsersRoutes = (router: Router, baseUrl: string): void => {

  // @route GET /api/users
  // @description Debug route for development mode
  // @access development
  router.get(baseUrl, async (req: Request, res: Response): Promise<void> => {
    if (process.env.NODE_ENV !== "development") {
      res.status(401).json({ message: "Not authorized in production" })
      return
    }

    const users = await UserModel.find().sort({ createdAt: -1 })

    res.status(200).json(users)
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

      // Hash password
      const salt = await bcrypt.genSalt(10)
      const passwordHash = await bcrypt.hash(password, salt)

      // Save to mongo
      const query = new UserModel({ name, email, passwordHash })
      await query.save()

      res.status(201).json({ message: "User created" })
    } catch (err) {
      const custom = new Error("Unexpected error occurred when trying to create a new user")
      custom.name = ""
      custom.stack = err.stack
      next(custom)
    }
  })
}

export default registerUsersRoutes
