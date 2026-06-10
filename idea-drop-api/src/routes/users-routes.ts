import { Router, Request, Response } from "express"

const registerUsersRoutes = (router: Router, baseUrl: string): void => {
  router.get(baseUrl, async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({ message: "Hello, Users!" })
  })
}

export default registerUsersRoutes
