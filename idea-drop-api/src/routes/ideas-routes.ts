import { Router, Request, Response } from "express"
import IdeaModel from "../models/idea-model"

let ideas = [
  { id: 1, title: "Idea 1", description: "Idea 1 description" },
  { id: 2, title: "Idea 2", description: "Idea 2 description" },
  { id: 3, title: "Idea 3", description: "Idea 3 description" },
]

// Base url: /api/ideas
const routeIdeas = (router: Router, baseUrl: string): void => {
  // public GET /api/ideas
  router.get(baseUrl, async (req: Request, res: Response): Promise<any> => {
    try {
      const ideas = await IdeaModel.find()
      res.json(ideas)
    } catch (err) {
      res.status(500).send("Unexpected error occured trying to get all ideas.")
    }
  })

  // public GET /api/ideas/:id
  router.get(`${baseUrl}/:id`, async (req: Request, res: Response): Promise<any> => {
    try {
      const idea = await IdeaModel.findById(req.params.id)
      if (!idea) {
        res.status(404)
        throw new Error("Idea not found")
      }
      res.json(idea)
    } catch (err) {
      res.status(500).send("Unexpected error occured trying to get all ideas.")
    }
  })

  // public POST /api/ideas
  router.post(baseUrl, (req: Request, res: Response): void => {
    ideas.push(req.body)
    res.status(201).json(ideas)
  })
}

export default routeIdeas
