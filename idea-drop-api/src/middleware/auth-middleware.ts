import { Request, Response, NextFunction } from "express"
import { jwtVerify } from "jose"

import { getJWTSecret } from "../utils/auth-utils"
import UserModel from "../models/user-model"

import type { UserDb } from "../types"

export const protect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers?.authorization
  if (!authHeader) {
    res.status(401)
    res.json({ message: "No authorization token" })
    return
  }

  if (!authHeader.startsWith("Bearer ")) {
    res.status(401)
    res.json({ message: "Invalid token format. Expected a bearer token" })
    return
  }

  const token = authHeader.split(" ")[1]
  let userId = ""
  try {
    const secret = getJWTSecret()
    const { payload } = await jwtVerify(token, secret)
    userId = payload?.userId || ""
  } catch (err) {
    res.status(401)

    if (!err instanceof Error) {
      res.json({ message: "Unknown error to verify token" })
      return
    }

    if (err.name === "JWTExpired") {
      res.json({ message: "Expired access token get a new one to proceed" })
      return
    }

    res.json({ message: "Error to verify token: " + err.message })

    return
  }

  if (userId === "") {
    res.status(401)
    res.json({ message: "Invalid bearer token no userId provided" })
    return
  }

  try {
    const userDb = await UserModel.findById(userId).lean() as UserDb
    if (!userDb) {
      res.status(401)
      res.json({ message: "User from token not found" })
    }

    req.user = { id: userDb._id.toString(), name: userDb.name, email: userDb.email }
    next()
  } catch (err) {
    if (err instanceof Error) {
      const customErr = new Error("Unexpected error occurred trying to protect the route")
      customErr.name = "Auth Protect Error"
      customErr.stack = err.stack
      next(customErr)
      return
    }
    console.log("Unknown error trying to protect the route")
  }
}
