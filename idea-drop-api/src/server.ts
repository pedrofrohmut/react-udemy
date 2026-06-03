import express from "express"
import cors from "cors"
import dotenv from "dotenv"

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

let ideas = [
  { id: 1, title: "Idea 1", description: "Idea 1 description" },
  { id: 2, title: "Idea 2", description: "Idea 2 description" },
  { id: 3, title: "Idea 3", description: "Idea 3 description" },
]

app.get("/api/ideas", (req, res) => {
  res.json(ideas)
})

app.post("/api/ideas", (req, res) => {
  ideas.push(req.body)
  res.status(201).json(ideas)
})

app.listen(PORT, () => {
  console.log(`Node/Express server listen on port: ${PORT}`)
})
