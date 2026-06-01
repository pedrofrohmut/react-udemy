import rootRoute from "./RootRoute"
import HomeRoute from "./HomeRoute"
import AboutRoute from "./AboutRoute"
import IdeasRoute from "./ideas/IdeasRoute"
import IdeasDetailsRoute from "./ideas/IdeasDetailsRoute"

const routeTree = rootRoute.addChildren([
  HomeRoute,
  AboutRoute,
  IdeasRoute,
  IdeasDetailsRoute,
])

export default routeTree
