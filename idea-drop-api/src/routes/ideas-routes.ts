import { Router, Request, Response, NextFunction } from "express"

import IdeaModel, { ideaDbToOutput } from "../models/idea-model"
import { isNumber, isError } from "../utils/utils"
import { protect } from "../middleware/auth-middleware"

import type { IdeaOutput, IdeaDb } from "../types"

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

const getAllIdeas = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { sort, order } = req.query

    let query = IdeaModel.find()

    // Apply Sorting
    if (sort) {
      switch (sort) {
        case "date": {
          if (order == "desc") {
            query = query.sort({ createdAt: -1 })
          } else if (order == "asc") {
            query = query.sort({ createdAt: 1 })
          }
        } break
      }
    }

    // Apply limit
    const limit = req.query?.limit && isNumber(req.query.limit) ? req.query.limit : 10
    query = query.limit(limit)

    const ideasDb = await query.exec()

    const ideasOutput = ideasDb.map(idea => ideaDbToOutput(idea as any))
    res.json(ideasOutput)
  } catch (err) {
    if (!isError(err)) {
      console.log("Unknown error trying to get all ideas", err)
      next(err)
      return
    }

    const customErr = new Error("Unexpected error occurred trying to get all ideas: " + err.message)
    customErr.name = "IdeasRoutes:GetAllIdeas Error"
    customErr.stack = err.stack
    next(customErr)
  }
}

const getSingleIdea = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const idea = await IdeaModel.findById(req.params.id)
    if (!idea) {
      res.status(404).json({ message: "Idea not found" })
      return
    }
    const ideaOutput = ideaDbToOutput(idea as any)
    res.json(ideaOutput)
  } catch (err) {
    if (!isError(err)) {
      console.log("Unknown error trying to get single idea", err)
      next(err)
      return
    }

    const customErr = new Error("Unexpected error occurred trying to get idea by id: " + err.message)
    customErr.name = "IdeasRoutes:GetSingleIdea Error"
    customErr.stack = err.stack
    next(customErr)
  }
}

const createIdea = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { title, summary, description, tags } = req.body || {}

  if (!title || !title.trim() || !summary || !summary.trim() || !description || !description.trim()) {
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

  if (!req.user?.id) {
    res.status(401)
    res.json({ message: "No userId in the request" })
    return
  }

  try {
    const model = new IdeaModel({ title, summary, description, tags: tagsArray, userId: req.user.id  })
    await model.save()

    res.status(201).json(model)
  } catch (err) {
    if (!isError(err)) {
      console.log("Unknown error trying to save a new idea", err)
      next(err)
      return
    }

    const customErr = new Error("Unexpected error occurred trying to save a new idea: " + err.message)
    customErr.name = "IdeasRoutes:CreateIdea Error"
    customErr.stack = err.stack
    next(customErr)
  }
}

const updateIdea = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const idea = await IdeaModel.findById(req.params.id)
    if (!idea) {
      res.status(400).json({ message: "Idea not found with the passed id. Nothing happend" })
      return
    }

    if (!req.user || !req.user?.id) {
      res.status(401)
      res.json({ message: "No user in the request" })
      return
    }

    if (idea.userId.toString() !== req.user.id) {
      res.status(403)
      res.json({ message: "Authenticated user is not the owner of this idea" })
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
    if (!isError(err)) {
      console.log("Unknown error trying to update idea.", err)
      next(err)
      return
    }

    const customErr = new Error("Unexpected error occurred when trying to update an idea: " + err.message)
    customErr.name = "IdeasRoutes:UpdateIdea Error"
    customErr.stack = err.stack
    next(customErr)
  }
}

const deleteIdea = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const idea = await IdeaModel.findById(req.params.id).lean()
    if (!idea) {
      res.status(400)
      res.json({ message: "Idea not found with passed id. Nothing happend." })
      return
    }

    if (!req.user || !req.user?.id) {
      res.status(401)
      res.json({ message: "No user in the request" })
      return
    }

    if (idea.userId.toString() !== req.user.id) {
      res.status(403)
      res.json({ message: "Authenticated user is not the owner of this idea" })
      return
    }

    await IdeaModel.deleteOne({ _id: req.params.id })

    res.status(204)
    res.send("")
  } catch (err) {
    if (!isError(err)) {
      console.log("Unknown error trying to delete idea.", err)
      next(err)
      return
    }

    const customErr = new Error("Unexpected error occurred when trying to delete an idea: " + err.message)
    customErr.name = "IdeasRoutes:DeleteIdea Error"
    customErr.stack = err.stack
    next(customErr)
  }
}

// Base url: /api/ideas
const registerIdeasRoutes = (router: Router, baseUrl: string): void => {

  // @route GET /api/ideas
  // @description Get all ideas
  // @access public
  // @query limit (limit the number of results)
  // @query sort (the type of sorting)
  // @query order (if the sorting is asc or desc. have no effect without sort provided)
  router.get(baseUrl, getAllIdeas)

  // @route Get /api/ideas/:id
  // @description Get a single idea by id
  // @access public
  router.get(`${baseUrl}/:id`, getSingleIdea)

  // @route POST /api/ideas
  // @description Create a new idea
  // @access public
  router.post(baseUrl, protect, createIdea)

  // @route PUT /api/ideas/:id
  // @description Update a single idea
  // @access public
  router.put(`${baseUrl}/:id`, protect, updateIdea)

  // @route DELETE /api/ideas/:id
  // @description delete a single ides
  // @access public
  router.delete(`${baseUrl}/:id`, protect, deleteIdea)

}

export default registerIdeasRoutes
