export const formatDate = (dateToFmt: string): string => {
  const options: any = {
    weekday: "long",
    year: "2-digit",
    month: "short",
    day: "numeric"
  }
  return new Date(dateToFmt).toLocaleDateString("pt-BR", options)
}
