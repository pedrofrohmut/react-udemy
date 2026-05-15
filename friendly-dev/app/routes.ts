import { type RouteConfig, index, route, layout } from "@react-router/dev/routes"

const routes = [
  layout("routes/layouts/HomeLayout.tsx", [index("routes/HomePage.tsx")]),
  layout("routes/layouts/MainLayout.tsx", [
    route("about", "routes/AboutPage.tsx"),
    route("contact", "routes/ContactPage.tsx"),
    route("projects", "routes/ProjectsPage.tsx"),
    route("blog", "routes/BlogPage.tsx")
  ])
] satisfies RouteConfig

export default routes
