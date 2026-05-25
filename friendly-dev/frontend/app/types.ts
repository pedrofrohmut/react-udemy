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

export type PostMeta = {
  id: string
  documentId: string
  slug: string
  title: string
  excerpt: string
  date: string
  image: string
}

export type ApiPost = {
  id: number
  documentId: string
  title: string
  slug: string
  excerpt: string
  body: string
  date: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  image: {
    url: string
  }
}
