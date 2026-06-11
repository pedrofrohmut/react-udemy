import { SignJWT } from "jose"
import dotenv from "dotenv"
import bcrypt from "bcryptjs"

export const getJWTSecret = () => {
  dotenv.config() // populate env variable
  const secret = new TextEncoder().encode(process.env.JWT_SECRET)
  return secret
}

/**
 * Generates a JWT (Json Web Token)
 * @param {Object} payload - Object with the contents the token will hold
 * @param {string} expirationType - long or short
 */
export const generateJWT = async (payload: any, expirationType: string): Promise<string> => {
  const alg = "HS256"
  const expiration = expirationType === "long" ? "30d" : "1m"
  const secret = getJWTSecret()

  const jwt =
    await new SignJWT(payload)
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setExpirationTime(expiration)
      .sign(secret)

  return jwt
}

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10)
  const passwordHash = await bcrypt.hash(password, salt)
  return passwordHash
}

export const matchPasswordAndHash = async (password: string, hash: string): Promise<boolean> => {
  const isMatch = await bcrypt.compare(password, hash)
  return isMatch
}
