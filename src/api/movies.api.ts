import { api } from "../config";
import { IMovie } from "../interfaces";

export const getMovies = async () => {
    try {
        const res = await api.get<IMovie[]>("/movies")
        return res.data;
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

