import express from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080

// Middlewares
app.use(cors())

// Register /health endpoint
app.get("/health", (req, res) => {
  res.send("Server is online")
})

app.listen(PORT, () => {
  console.log(`Node/Express server listen on port: ${PORT}`)
})
