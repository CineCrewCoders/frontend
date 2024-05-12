import axios from "axios";

export const authApi = axios.create({
    baseURL: "http://auth:3000",
    headers: {
        "Content-Type": "application/json",
    },
});