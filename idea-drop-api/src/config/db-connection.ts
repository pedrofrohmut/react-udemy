import mongoose from "mongoose"

const connectMongoDb = async () => {
  if (!process.env.MONGO_URL) {
    console.error("Database URL (MONGO_URL) not found in the environment.")
    return null
  }

  try {
    const connection = await mongoose.connect(process.env.MONGO_URL)

    const host = connection.connection.host
    const port = connection.connection.port
    const dbName = connection.connection.db?.databaseName
    console.log(`Connected to mongo db at "${host}:${port}/${dbName}"`)

    return connection
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(`Error to connect to mongo db: ${err.message}`)
    } else {
      console.error("Unknown error occurred")
    }
    return null
  }
}

export default connectMongoDb
