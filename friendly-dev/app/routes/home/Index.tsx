import { useEffect } from "react"
import type { Route } from "./+types/Index"

export const meta = ({}: Route.MetaArgs) => {
  return [{ title: "The Friendly Dev" }, { name: "description", content: "Custom Website development" }]
}

const HomePage = () => {
  return (
    <section>My App</section>
  )
}

export default HomePage
