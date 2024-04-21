import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:3003",
    headers: {
        "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
        // "Access-Control-Allow-Credentials": "true",
    },
});