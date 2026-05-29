import { Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools"
import { TanStackDevtools } from "@tanstack/react-devtools"

import "../styles.css"

const RootComponent = () => {
  return (
    <>
      <Outlet />
      <TanStackDevtools
        config={{ position: "bottom-right" }}
        plugins={[ { name: "TanStack Router", render: <TanStackRouterDevtoolsPanel /> } ]}
      />
    </>
  )
}

export default RootComponent
