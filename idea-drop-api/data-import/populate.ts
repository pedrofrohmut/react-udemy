import dotenv from "dotenv"

import connectMongoDb from "../src/config/db-connection"
import IdeaModel from "../src/models/idea-model"
import ideas from "./ideas.json"

const main = async () => {
  try {
    dotenv.config() // Init/Populate env

    const conn = await connectMongoDb()

    for (var idea of ideas) {
      try {
        const model = new IdeaModel(idea)
        await model.save()
      } catch (err) {
        console.log("Error to add idea", err?.message)
      }
    }

    console.log("Populate with no errors")
    process.exit(0)
  } catch (err: unknow) {
    if (err instanceof Error) {
      console.log("[ERROR] error to populate the db: " + err.message)
    }
    process.exit(1)
  }
}

main()
