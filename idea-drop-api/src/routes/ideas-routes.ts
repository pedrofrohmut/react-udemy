import { Router, Request, Response } from "express"
import IdeaModel from "../models/idea-model"

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
        res.status(404).json({ message: "Idea not found" })
        return
      }
      res.json(idea)
    } catch (err) {
      res.status(500).send("Unexpected error occured trying to get idea by id.")
    }
  })

  // public POST /api/ideas
  router.post(baseUrl, async (req: Request, res: Response): Promise<void> => {
    const { title, summary, description, tags } = req.body
    // TODO: Add validations
    try {
      const model = new IdeaModel({ title, summary, description, tags })
      await model.save()
      res.status(201).json(model)
    } catch (err) {
      res.status(500).send("Unexpected error occured trying to save a new idea.")
    }
  })
}

export default routeIdeas
