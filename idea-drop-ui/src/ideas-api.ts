import api from "@/lib/axios"

import type { Idea } from "@/types"

export const fetchRecentIdeas = async (limit: number): Promise<Array<Idea>> => {
  const response = await api.get("/ideas")
  const ideas = response.data

  const sorted = ideas.sort((a: Idea, b: Idea) => {
    const bTime = new Date(b.createdAt).getTime()
    const aTime = new Date(a.createdAt).getTime()
    return bTime - aTime
  })

  if (!limit) {
    return sorted
  }

  return sorted.slice(0, limit)
}

export const fetchIdeas = async (): Promise<Array<Idea>> => {
  const response = await api.get("/ideas")
  return response.data
}

export const fetchIdea = async (ideaId: string): Promise<Idea> => {
  const response = await api.get(`/ideas/${ideaId}`)
  return response.data
}
