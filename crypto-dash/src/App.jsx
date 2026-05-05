import { Routes, Route } from "react-router"
import Header from "./components/Header"
import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import NotFoundPage from "./pages/NotFoundPage"
import CoinDetailsPage from "./pages/CoinDetailsPage"
import RootLayout from "./components/RootLayout.jsx"

/*
  TODO: Make a Layout Component to be a parent component that surround every component in the app.
  For example, Layout have a navigation header that will be shared among all the components.
*/
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/coin/:id" element={<CoinDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
