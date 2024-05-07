import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context";

export const HomeLayout = () => {
    const { userID } = useContext(AuthContext);

    if (userID) {
        return <Navigate to="/" />;
    }

    return (
        <Outlet />
    );
};
