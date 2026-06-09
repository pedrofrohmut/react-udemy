import mongoose from "mongoose"

const ideaSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  summary: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  tags: { type: [String], default: [], required: true },
},
// options
{ timestamps: true })

const IdeaModel = mongoose.model("Idea", ideaSchema)

export default IdeaModel
