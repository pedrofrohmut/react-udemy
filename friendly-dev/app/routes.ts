import { type RouteConfig, index, route, layout } from "@react-router/dev/routes"

const routes = [
  layout("routes/layouts/HomeLayout.tsx", [index("routes/home/Index.tsx")]),
  layout("routes/layouts/MainLayout.tsx", [
    route("about", "routes/about/Index.tsx"),
    route("contact", "routes/contact/Index.tsx"),
    route("projects", "routes/projects/Index.tsx"),
    route("blog", "routes/blog/Index.tsx")
  ])
] satisfies RouteConfig

export default routes
