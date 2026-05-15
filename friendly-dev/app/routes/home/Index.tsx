import type { Route } from "./+types/Index"

export const meta = ({}: Route.MetaArgs) => {
  return [{ title: "The Friendly Dev" }, { name: "description", content: "Custom Website development" }]
}

const HomePage = () => {
  return (
    <>
      Homepage
    </>
  )
}

export default HomePage
