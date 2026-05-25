export type Project = {
  id: number
  documentId: string
  title: string
  description: string
  image: string
  url: string
  date: string
  category: string
  isFeatured: boolean
}

export type PostMeta = {
  id: string
  slug: string
  title: string
  excerpt: string
  date: string
}

export type ApiProject = {
  id: number
  documentId: string
  title: string
  description: string
  url: string
  date: string
  category: string
  isFeatured: boolean
  createdAt: string
  updatedAt: string
  publishedAt: string
  image: {
    url: string
  }
}
