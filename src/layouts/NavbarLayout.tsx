import { Navigate, Outlet } from "react-router-dom"
import { Navbar } from "../components/Navbar"
import { useContext } from "react";
import { AuthContext } from "../context";

export const NavbarLayout = () => {
  const { userID } = useContext(AuthContext);

  if (!userID) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}
