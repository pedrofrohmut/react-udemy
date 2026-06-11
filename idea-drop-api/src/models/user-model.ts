import { NextFunction } from "express"
import mongoose from "mongoose"

import bcrypt from "bcryptjs"

const options = { timestamps: true }

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
  },
  options
)

const UserModel = mongoose.model("User", userSchema)

export default UserModel
