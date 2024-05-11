import { AxiosError } from "axios";
import { api } from "../config";
import { IMovie } from "../interfaces";
import { getAxiosErrorMessages } from "../utils";
import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../context";
import { toast } from "react-toastify";

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

export const getWatchlist = async (uid: string) => {
    try {
        const res = await api.get<IMovie[]>('/movies/plan_to_watch', {
            headers: {
                UserId: uid
            }
        });
        return res.data;
    } catch (error) {
        throw new Error(getAxiosErrorMessages(error as AxiosError));
    }
}

export const getWatched = async (uid: string) => {
    try {
        const res = await api.get<IMovie[]>('/movies/watched', {
            headers: {
                UserId: uid
            }
        });
        return res.data;
    } catch (error) {
        throw new Error(getAxiosErrorMessages(error as AxiosError));
    }
}

export const addMovieToWatchlist = async (movieId: string, uid: string) => {
    try {
        await api.post('/movies/list', {
            movieId,
            list: 'PlanToWatch',

        }, {
            headers: {
                UserId: uid
            }
        });
    } catch (error) {
        throw new Error(getAxiosErrorMessages(error as AxiosError));
    }
}

export const useAddMovieToWatchlist = (): UseMutationResult<void, Error, string, unknown> => {
    const { userID } = useContext(AuthContext);
    return useMutation({
        mutationFn: (movieId: string) => addMovieToWatchlist(movieId, userID || ''),
        onError: (error) => {
            toast.error((error as Error).message, {
                position: "bottom-center",
            });
        }
    });
}

export const addMovieToWatched = async (movieId: string, uid: string) => {
    try {
        await api.post('/movies/list', {
            movieId,
            list: 'Watched',
        }, {
            headers: {
                UserId: uid
            }
        });
    } catch (error) {
        throw new Error(getAxiosErrorMessages(error as AxiosError));
    }
}

export const useAddMovieToWatched = (): UseMutationResult<void, Error, string, unknown> => {
    const { userID } = useContext(AuthContext);
    return useMutation({
        mutationFn: (movieId: string) => addMovieToWatched(movieId, userID || ''),
        onError: (error) => {
            toast.error((error as Error).message, {
                position: "bottom-center",
            });
        }
    });
}

export const removeMovieFromWatchlist = async (movieId: string, uid: string) => {
    try {
        await api.delete(`/movies/plan_to_watch?movieId=${movieId}`, {
            headers: {
                UserId: uid
            },
        });
    } catch (error) {
        throw new Error(getAxiosErrorMessages(error as AxiosError));
    }
}

export const useRemoveMovieFromWatchlist = (): UseMutationResult<void, Error, string, unknown> => {
    const { userID } = useContext(AuthContext);
    return useMutation({
        mutationFn: (movieId: string) => removeMovieFromWatchlist(movieId, userID || ''),
        onError: (error) => {
            toast.error((error as Error).message, {
                position: "bottom-center",
            });
        }
    });
}

export const removeMovieFromWatched = async (movieId: string, uid: string) => {
    try {
        await api.delete(`/movies/watched?movieId=${movieId}`, {
            headers: {
                UserId: uid
            },
        });
    } catch (error) {
        throw new Error(getAxiosErrorMessages(error as AxiosError));
    }
}

export const useRemoveMovieFromWatched = (): UseMutationResult<void, Error, string, unknown> => {
    const { userID } = useContext(AuthContext);
    return useMutation({
        mutationFn: (movieId: string) => removeMovieFromWatched(movieId, userID || ''),
        onError: (error) => {
            toast.error((error as Error).message, {
                position: "bottom-center",
            });
        }
    });
}


export const rateMovie = async (movieId: string, score: number, uid: string) => {
    try {
        await api.post('/movies/rate', {
            movieId,
            score
        }, {
            headers: {
                UserId: uid
            }
        });
    } catch (error) {
        throw new Error(getAxiosErrorMessages(error as AxiosError));
    }
}

export const useRateMovie = (): UseMutationResult<void, Error, { movieId: string, score: number }, unknown> => {
    const { userID } = useContext(AuthContext);
    return useMutation({
        mutationFn: ({ movieId, score }) => rateMovie(movieId, score, userID || ''),
        onError: (error) => {
            toast.error((error as Error).message, {
                position: "bottom-center",
            });
        }
    });
}

const modifyMovieRating = async (movieId: string, score: number, uid: string) => {
    try {
        await api.put('/movies/rate', {
            movieId,
            score
        }, {
            headers: {
                UserId: uid
            }
        });
    } catch (error) {
        throw new Error(getAxiosErrorMessages(error as AxiosError));
    }
}

export const useModifyMovieRating = (): UseMutationResult<void, Error, { movieId: string, score: number }, unknown> => {
    const { userID } = useContext(AuthContext);
    return useMutation({
        mutationFn: ({ movieId, score }) => modifyMovieRating(movieId, score, userID || ''),
        onError: (error) => {
            toast.error((error as Error).message, {
                position: "bottom-center",
            });
        }
    });
}

export const searchMovies = async (title: string, minScore: number, genres: string[], uid: string) => {
    try {
        const res = await api.get<IMovie[]>('/search', {
            params: {
                title,
                "min_average": minScore,
                ...(genres.length > 0 && { genres: genres.join(',') })
            },
            headers: {
                UserId: uid
            }
        });
        return res.data;
    } catch (error) {
        throw new Error(getAxiosErrorMessages(error as AxiosError));
    }
}

export const useSearchMovies = (): UseMutationResult<IMovie[], Error, { title: string, minScore: number, genres: string[] }, unknown> => {
    const { userID } = useContext(AuthContext);
    return useMutation({
        mutationFn: ({ title, minScore, genres }) => searchMovies(title, minScore, genres, userID || ''),
        onError: (error) => {
            toast.error((error as Error).message, {
                position: "bottom-center",
            });
        }
    });
}