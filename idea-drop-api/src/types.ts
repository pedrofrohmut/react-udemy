import { Types } from "mongoose"

export type IdeaOutput = {
  id: string
  title: string
  summary: string
  description: string
  tags: Array<string>
  createdAt: string
  updatedAt: string
}

export type IdeaDb = {
  _id: Types.ObjectId
  title: string
  summary: string
  description: string
  tags: Array<string>
  createdAt: string
  updatedAt: string
  __v: number
}

export type UserDb = {
  _id: Types.ObjectId
  name: string
  email: string
  passwordHash: string
  createdAt: string
  updatedAt: string
  __v: number
}
