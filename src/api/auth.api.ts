import { User } from "@firebase/auth-types";
import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { generateUsername } from "unique-username-generator";
import { api, authApi } from "../config";
import { AuthContext } from "../context";
import { IAuth } from "../interfaces";

const login = async (credentials: IAuth) => {
    try {
        const res = await authApi.post<User>("/login", credentials);
        return res.data;
    } catch (error) {
        const res = (error as AxiosError).response?.data as object;
        if (res && "error" in res) {
            throw new Error(res.error as string);
        }
        throw new Error(`An error occurred: ${(error as AxiosError).message}`);
    }
}

const register = async (credentials: IAuth) => {
    try {
        const res = await authApi.post<User>("/register", credentials);
        const uid = res.data.uid;
        const username = generateUsername();
        await api.post<string>(`/signup`, { userID: uid, username: username });
        return res.data;
    } catch (error) {
        const res = (error as AxiosError).response?.data as object;
        if (res && "error" in res) {
            throw new Error(res.error as string);
        }
        throw new Error(`An error occurred: ${(error as AxiosError)}`);
    }
}

export const useFirebaseLogin = (): UseMutationResult<User, Error, IAuth, unknown> => {
    const { loginLocal } = useContext(AuthContext);
    const navigate = useNavigate();
    return useMutation({
        mutationFn: (credentials: IAuth) => login(credentials),
        onSuccess: (user) => {
            loginLocal(user)
            navigate("/");
        }
    });
}

export const useFirebaseRegister = (): UseMutationResult<User, Error, IAuth, unknown> => {
    const navigate = useNavigate();
    return useMutation<User, Error, IAuth, unknown>({
        mutationFn: (credentials: IAuth) => register(credentials),
        onSuccess: () => {
            navigate("/login");
        }
    });
}
