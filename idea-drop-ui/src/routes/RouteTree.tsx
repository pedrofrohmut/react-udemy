import rootRoute from "./RootRoute"
import HomeRoute from "./HomeRoute"
import AboutRoute from "./AboutRoute"
import IdeasRoute from "./ideas/IdeasRoute"
import IdeasDetailsRoute from "./ideas/IdeasDetailsRoute"
import NewIdeaRoute from "./ideas/NewIdeaRoute"
import EditIdeaRoute from "./ideas/EditIdeaRoute"

const routeTree = rootRoute.addChildren([
  HomeRoute,
  AboutRoute,
  IdeasRoute,
  IdeasDetailsRoute,
  NewIdeaRoute,
  EditIdeaRoute,
])

export default routeTree
