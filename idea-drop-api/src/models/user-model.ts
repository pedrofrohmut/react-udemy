import { NextFunction } from "express"
import mongoose from "mongoose"

import bcrypt from "bcryptjs"

const options = { timestamps: true }

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
  },
  options
)

const UserModel = mongoose.model("User", userSchema)

export default UserModel
