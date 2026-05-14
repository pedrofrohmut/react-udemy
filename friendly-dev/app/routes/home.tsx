import type { Route } from "./+types/home"

export const meta = ({}: Route.MetaArgs) => {
  return [{ title: "The Friendly Dev" }, { name: "description", content: "Custom website development" }]
}

const Home = () => {
  return (
    <>
      <h1 className="text-3xl text-red-500">My App</h1>
    </>
  )
}

export default Home
