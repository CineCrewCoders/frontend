import { Route, Routes } from "react-router-dom"
import { NavbarLayout } from "./components/NavbarLayout"
import { LoginScreen, RegisterScreen } from "./screens"

const App = () => {

  return (
    <Routes>
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route element={<NavbarLayout />}>
        <Route path="/" element={<div>ggg</div>} />
        <Route path="plan-to-watch" element={<div>ggg</div>} />
        <Route path="watched" element={<div>ggg</div>} />
        <Route path="find-movie" element={<div>ggg</div>} />
      </Route>
    </Routes>
  )
}

export default App
