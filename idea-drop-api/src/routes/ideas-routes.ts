import { Router, Request, Response, NextFunction } from "express"
import IdeaModel from "../models/idea-model"

const getTagsArray = (tags?: string | Array<string>): { ok: boolean, tagsArray: Array<string> } => {
  if (!tags) {
    return { ok: true, tagsArray: [] }
  }

  if (tags && typeof tags === "string") {
    const tagsArray = tags.split(",").map(tag => tag.trim()).filter(tag => tag !== "")
    return { ok: true, tagsArray }
  }

  if (tags && Array.isArray(tags)) {
    return { ok: true, tagsArray: tags }
  }

  return { ok: false, tagsArray: [] }
}

// Base url: /api/ideas
const routeIdeas = (router: Router, baseUrl: string): void => {

  // public GET /api/ideas
  router.get(baseUrl, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const ideas = await IdeaModel.find()
      res.json(ideas)
    } catch (err) {
      // res.status(500).send("Unexpected error occured trying to get all ideas.")
      if (err instanceof Error) {
        next(new Error("Unexpected error occured trying to get all ideas."))
      }
    }
  })

  // public GET /api/ideas/:id
  router.get(`${baseUrl}/:id`, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const idea = await IdeaModel.findById(req.params.id)
      if (!idea) {
        res.status(404).json({ message: "Idea not found" })
        return
      }
      res.json(idea)
    } catch (err) {
      // res.status(500).send("Unexpected error occured trying to get idea by id.")
      if (err instanceof Error) {
        next(new Error("Unexpected error occured trying to get idea by id."))
      }
    }
  })

  // public POST /api/ideas
  router.post(baseUrl, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { title, summary, description, tags } = req.body

    if (!title.trim() || !summary.trim() || !description.trim()) {
      res.status(400).json({ message: "Title, summary and description are all required." })
      return
    }

    const { ok, tagsArray } = getTagsArray(req.body.tags)
    if (!ok) {
      res.status(400).json({
        message: "Invalid format for tags. It can be a string with comma separated values of an array of strings"
      })
      return
    }

    try {
      const model = new IdeaModel({ title, summary, description, tags: tagsArray })
      await model.save()

      res.status(201).json(model)
    } catch (err) {
      // res.status(500).send("Unexpected error occured trying to save a new idea.")
      if (err instanceof Error) {
        next(new Error("Unexpected error occured trying to save a new idea: " + err.message))
      }
    }
  })

  // public PUT /api/ideas/:id
  router.put(`${baseUrl}/:id`, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // const { title, summary, description, tags } = req.body
    try {
      const idea = await IdeaModel.findById(req.params.id)
      if (!idea) {
        res.status(400).json({ message: "Idea not found with the passed id. Nothing happend" })
        return
      }

      const { ok, tagsArray } = getTagsArray(req.body.tags)
      if (!ok) {
        res.status(400).json({
          message: "Invalid format for tags. It can be a string with comma separated values of an array of strings"
        })
        return
      }

      const updatedIdea = {
        title: req.body.title || idea.title,
        summary: req.body.summary || idea.summary,
        description: req.body.description || idea.description,
        tags: req.body.tags ? tagsArray : idea.tags
      }

      await idea.updateOne(updatedIdea)

      res.status(204).send("")
    } catch (err) {
      if (err instanceof Error) {
        // res.status(500).send("Unexpected error occured when trying to update an idea")
        if (err instanceof Error) {
          next(new Error("Unexpected error occured when trying to update an idea: " + err.message))
        }
      }
    }
  })

  // public DELETE /api/ideas/:id
  router.delete(`${baseUrl}/:id`, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const idea = await IdeaModel.findById(req.params.id)
      if (!idea) {
        res.status(400).json({ message: "Idea not found with passed id. Nothing happend." })
        return
      }

      await IdeaModel.deleteOne({ _id: req.params.id })

      res.status(204).send("")
    } catch (err) {
      // res.status(500).send("Unexpected error occured when trying to delete an idea")
      if (err instanceof Error) {
        next(new Error("Unexpected error occured when trying to delete an idea"))
      }
    }
  })

}

export default routeIdeas
