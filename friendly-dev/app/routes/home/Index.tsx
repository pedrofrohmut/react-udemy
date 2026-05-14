import type { Route } from "./+types/Index"

export const meta = ({}: Route.MetaArgs) => {
  return [{ title: "The Friendly Dev" }, { name: "description", content: "Custom Website development" }]
}

const HomePage = () => {
  console.log("Hello from home page...")
  return (
    <section>My App</section>
  )
}

export default HomePage
