import { Route, Routes } from "react-router-dom"
import { NavbarLayout } from "./layouts/NavbarLayout"
import { LoginScreen, Movie, NotFound, RegisterScreen, Watched, Watchlist } from "./screens"
import { Home } from "./screens/Home"
import { HomeLayout } from "./layouts"

const App = () => {

  return (
    <Routes>
      <Route element={<HomeLayout />} >
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/login" element={<LoginScreen />} />
      </Route>
      <Route element={<NavbarLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="watchlist" element={<Watchlist />} />
        <Route path="watched" element={<Watched />} />
        <Route path="movie/:id" element={<Movie />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
