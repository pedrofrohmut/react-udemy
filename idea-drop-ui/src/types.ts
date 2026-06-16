export type Idea = {
  id: string
  title: string
  summary: string
  description: string
  tags: Array<string>
  createdAt: string
  user: string
}

export type NewIdea = {
  title: string
  summary: string
  description: string
  tags: Array<string>
}

export type EditIdea = {
  id: string
  title: string
  summary: string
  description: string
  tags: Array<string>
}

export type CreateUser = {
  name: string
  email: string
  password: string
}

export type SignInCredentials = {
  email: string
  password: string
}

export type SignedUser = {
  userId: string
  name: string
  email: string
  accessToken: string
}
