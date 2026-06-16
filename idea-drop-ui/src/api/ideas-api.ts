import api from "@/lib/axios"

import type { Idea, NewIdea, EditIdea } from "@/types"

export const fetchRecentIdeas = async (limit: number = 0): Promise<Array<Idea>> => {
  let url = "/ideas"
  url += "?sort=date&order=desc" // Sort by latest
  if (limit && limit > 0) {
    url +=  "&limit=" + limit    // Add limit if informed
  }

  const response = await api().get(url)
  return response.data
}

export const fetchIdeas = async (): Promise<Array<Idea>> => {
  const response = await api().get("/ideas")
  return response.data
}

export const fetchIdea = async (ideaId: string): Promise<Idea> => {
  const response = await api().get(`/ideas/${ideaId}`)
  return response.data
}

export const createIdea = async (newIdea: NewIdea, accessToken: Optional<string>): Promise<Idea> => {
  const now = new Date().toISOString()
  const response = await api(accessToken).post("/ideas", Object.assign(newIdea, { createdAt: now }))
  return response.data
}

export const deleteIdea = async (id: string, accessToken: Optional<string>): Promise<void> => {
  await api(accessToken).delete(`/ideas/${id}`)
}

export const editIdea = async (idea: EditIdea, accessToken: Optional<string>): Promise<void> => {
  await api(accessToken).put(`/ideas/${idea.id}`, idea)
}
