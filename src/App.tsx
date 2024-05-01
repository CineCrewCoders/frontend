import { Route, Routes } from "react-router-dom"
import { NavbarLayout } from "./components/NavbarLayout"
import { LoginScreen, RegisterScreen } from "./screens"

const App = () => {

  return (
    <Routes>
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route element={<NavbarLayout />}>
        <Route path="/" element={<div>home</div>} />
        <Route path="watchlist" element={<div>watch list</div>} />
        <Route path="watched" element={<div>watched</div>} />
      </Route>
    </Routes>
  )
}

export default App
