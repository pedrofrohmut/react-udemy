import { Router, Request, Response } from "express"

let ideas = [
  { id: 1, title: "Idea 1", description: "Idea 1 description" },
  { id: 2, title: "Idea 2", description: "Idea 2 description" },
  { id: 3, title: "Idea 3", description: "Idea 3 description" },
]

// Base url: /api/ideas
const routeIdeas = (router: Router, baseUrl: string): void => {
  // public GET /api/ideas
  router.get(baseUrl, (req: Request, res: Response): void => {
    res.status(400)
    throw new Error("Test error")

    res.json(ideas)
  })

  // public POST /api/ideas
  router.post(baseUrl, (req: Request, res: Response): void => {
    ideas.push(req.body)
    res.status(201).json(ideas)
  })
}

export default routeIdeas
