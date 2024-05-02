import { api } from "../config";
import { IMovie } from "../interfaces";

export const getMovies = async () => {
    try {

        const res = await api.get<IMovie[]>("/movies");
        console.log(res);

        const movies = res.data;
        if (!movies) {
            throw new Error("movies not found");
        }
        
        console.log(movies);
        return movies;
    } catch (error) {
        throw new Error("movies not found");
    }
}

