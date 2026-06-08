import { Request, Response, NextFunction } from "express"

export const errorHandling = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  res.status(res.statusCode || 500)
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : null
  })
  next()
}
