import { type RouteConfig, index, route } from "@react-router/dev/routes"

const routes = [
  index("routes/home/Index.tsx"),
  route("about", "routes/about/Index.tsx"),
  route("contact", "routes/contact/Index.tsx"),
  route("projects", "routes/projects/Index.tsx"),
  route("blog", "routes/blog/Index.tsx"),
] satisfies RouteConfig

export default routes
