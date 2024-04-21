import { IAuth } from "../interfaces";
import { authApi } from "../config";
import { User } from "@firebase/auth-types";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

export const login = async (credentials: IAuth) => {
    const res = await authApi.post<User>("/login", credentials);
    const user = res.data;
    if (!user?.uid) {
        throw new Error("User not found");
    }
    console.log(user);
    return user;
}

export const register = async (credentials: IAuth) => {
    const res = await authApi.post<User>("/register", credentials);
    const user = res.data;
    if (!user?.uid) {
        throw new Error("User not found");
    }
    console.log(user);
    return user;
}

export const useLogin = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: (credentials: IAuth) => login(credentials),
        onSuccess: () => {
            navigate("/");
        },
        onError: (error) => {
            console.error(error);
        }
    });
}

export const useRegister = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: (credentials: IAuth) => register(credentials),
        onSuccess: () => {
            navigate("/login");
        },
        onError: (error) => {
            console.error(error);
        }
    });
}
