import mongoose from "mongoose"

import type { IdeaDb, IdeaOutput } from "../types"

const options = { timestamps: true }

const ideaSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    summary: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    tags: { type: [String], default: [], required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  options
)

const IdeaModel = mongoose.model("Idea", ideaSchema)

export const ideaDbToOutput = (ideaDb: IdeaDb): IdeaOutput => ({
  id: ideaDb._id.toString(),
  title: ideaDb.title,
  summary: ideaDb.summary,
  description: ideaDb.description,
  tags: ideaDb.tags,
  createdAt: ideaDb.createdAt,
  updatedAt: ideaDb.updatedAt,
})

export default IdeaModel
