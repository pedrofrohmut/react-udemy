import { type RouteConfig, index, route, layout } from "@react-router/dev/routes"

const routes = [
  layout("routes/layouts/HomeLayout.tsx", [index("routes/HomePage.tsx")]),
  layout("routes/layouts/MainLayout.tsx", [
    route("about", "routes/about/AboutPage.tsx"),
    route("contact", "routes/contact/ContactPage.tsx"),
    route("projects", "routes/projects/ProjectsPage.tsx"),
    route("projects/:id", "routes/projects/ProjectDetailsPage.tsx"),
    route("blog", "routes/blog/BlogPage.tsx"),
    route("*", "routes/NotFoundPage.tsx"),
  ])
] satisfies RouteConfig

export default routes
