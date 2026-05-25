import type { PostMeta } from "./types"

export const formatDate = (dateToFmt: string): string => {
  const options: any = {
    weekday: "long",
    year: "2-digit",
    month: "short",
    day: "numeric"
  }
  return new Date(dateToFmt).toLocaleDateString("pt-BR", options)
}

// Descending b - a
// StructuredClone is for array deep copy
export const sortedPostsByDateDesc = (posts: Array<PostMeta>): Array<PostMeta> =>
  structuredClone(posts).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

export const getImageUrlOrNone = (url: string | undefined) =>
  url ? `${import.meta.env.VITE_STRAPI_URL}${url}` : "/images/no-image.png"
