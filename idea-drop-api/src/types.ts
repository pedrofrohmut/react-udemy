import { ObjectId } from "mongoose"

export type IdeaOutput = {
  id: string
  title: string
  summary: string
  description: string
  tags: Array<string>
}

export type IdeaDb = {
  _id: ObjectId
  title: string
  summary: string
  description: string
  tags: Array<string>
  createdAt: string
  updatedAt: string
  __v: number
}
