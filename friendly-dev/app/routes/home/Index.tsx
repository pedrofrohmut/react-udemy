import type { Route } from "./+types/Index"
import Hero from "../../components/Hero"

export const meta = ({}: Route.MetaArgs) => {
  return [{ title: "The Friendly Dev" }, { name: "description", content: "Custom Website development" }]
}

const HomePage = () => {
  return (
    <section>
      <Hero name="Pedro Frohmut" />
    </section>
  )
}

export default HomePage
