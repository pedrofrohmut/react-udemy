import rootRoute from "@/routes/RootRoute"

import homeRoute from "@/routes/HomeRoute"
import aboutRoute from "@/routes/AboutRoute"

import ideasRoute from "@/routes/ideas/IdeasRoute"
import ideasDetailsRoute from "@/routes/ideas/IdeasDetailsRoute"
import newIdeaRoute from "@/routes/ideas/NewIdeaRoute"
import editIdeaRoute from "@/routes/ideas/EditIdeaRoute"

import authRoute from "@/routes/auth/AuthRoute"
import signUpRoute from "@/routes/auth/SignUpRoute"
import signInRoute from "@/routes/auth/SignInRoute"

const routeTree = rootRoute.addChildren([
  homeRoute,
  aboutRoute,

  ideasRoute,
  ideasDetailsRoute,
  newIdeaRoute,
  editIdeaRoute,

  authRoute.addChildren([
    signUpRoute,
    signInRoute,
  ])
])

export default routeTree
