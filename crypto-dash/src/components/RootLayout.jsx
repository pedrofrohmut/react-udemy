import { Outlet } from "react-router"
import Header from "./Header"

const RootLayout = () => {
  return (
    <div style={styles.container}>
      <Header />
      <Outlet />
    </div>
  )
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "2rem"
  }
}

export default RootLayout
