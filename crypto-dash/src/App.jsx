import { lazy, Suspense } from "react"
import { Routes, Route } from "react-router"
import RootLayout from "./components/RootLayout.jsx"
import Loading from "./components/Loading.jsx"

const HomePage = lazy(() => import("./pages/HomePage"))
const AboutPage = lazy(() => import("./pages/AboutPage"))
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"))
const CoinDetailsPage = lazy(() => import("./pages/CoinDetailsPage"))

const App = () => {
  return (
    <>
      <Suspense fallback={<Loading color="white" text="Loading page..." />}>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/coin/:id" element={<CoinDetailsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}

export default App
