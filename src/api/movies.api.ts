import { AxiosError } from "axios";
import { api } from "../config";
import { IMovie } from "../interfaces";
import { getAxiosErrorMessages } from "../utils";

export const getMovies = async () => {
    try {
        const res = await api.get<IMovie[]>("/movies")
        return res.data;
    } catch (error) {
        throw new Error(getAxiosErrorMessages(error as AxiosError));
    }
}

export const getMovie = async (id: string, uid: string) => {
    try {
        const res = await api.get<IMovie>(`/movies/${id}`, {
            headers: {
                UserId: uid
            }
        });
        return res.data;
    } catch (error) {
        throw new Error(getAxiosErrorMessages(error as AxiosError));
    }
}

