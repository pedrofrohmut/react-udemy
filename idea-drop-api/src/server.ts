import express, { Request, Response, NextFunction } from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"

import registerIdeasRoutes from "./routes/ideas-routes"
import registerUsersRoutes from "./routes/users-routes"
import { errorHandling } from "./middleware/error-handling"
import connectMongoDb from "./config/db-connection"

const main = async () => {
  dotenv.config() // Init dotenv

  const conn = await connectMongoDb()
  if (!conn) {
    process.exit(1)
  }

  const app = express() // Init express
  const PORT = process.env.PORT || 8080

  // Middlewares
  app.use(cors())
  app.use(express.json()) // parse json request body
  app.use(express.urlencoded({ extended: true })) // parse form data
  app.use(cookieParser())

  // Register /health endpoint
  app.get("/health", (req, res) => res.send("Server is online"))

  // Register routes
  const router = express.Router()
  registerUsersRoutes(router, "/api/users")
  registerIdeasRoutes(router, "/api/ideas")
  app.use("/", router)

  // 404 fallback
  app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`Not found - ${req.originalUrl}`)
    res.status(404)
    next(error)
  })

  // error middleware
  app.use(errorHandling)

  app.listen(PORT, () => {
    console.log(`Node/Express server listen on port: ${PORT}`)
  })
}

main()
