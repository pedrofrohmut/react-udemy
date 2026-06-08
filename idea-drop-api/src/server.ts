import express, { Request, Response, NextFunction } from "express"
import cors from "cors"
import dotenv from "dotenv"

import routeIdeas from "./routes/ideas-routes"
import { errorHandling } from "./middleware/error-handling"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080

// Middlewares
app.use(cors())
app.use(express.json()) // parse json request body
app.use(express.urlencoded({ extended: true })) // parse form data

// Register /health endpoint
app.get("/health", (req, res) => {
  res.send("Server is online")
})

// Register routes
const router = express.Router()
routeIdeas(router, "/api/ideas")
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
