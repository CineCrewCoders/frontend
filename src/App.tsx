import { Route, Routes } from "react-router-dom"
import { NavbarLayout } from "./components/NavbarLayout"
import { LoginScreen, Movie, RegisterScreen } from "./screens"
import { Home } from "./screens/Home"

const App = () => {

  return (
    <Routes>
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route element={<NavbarLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="watchlist" element={<div>watch list</div>} />
        <Route path="watched" element={<div>watched</div>} />
        <Route path="movie/:id" element={<Movie />} />
      </Route>
    </Routes>
  )
}

export default App
