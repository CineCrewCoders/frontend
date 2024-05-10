import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getMovies, getWatched, getWatchlist } from "../api";
import { MoviesLayout } from "../layouts";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../context";

const MOVIES_PER_PAGE = 8;

export const Home = () => {
    const { userID } = useContext(AuthContext);

    const { isPending, isError, data: allMovies, error } = useQuery({
        queryKey: ['getMovies'],
        queryFn: getMovies,
    })
    const { data: userWatchlist } = useQuery({
        queryKey: ['getWatchlist'],
        queryFn: () => getWatchlist(userID || ''),
    })
    const { data: userWatched } = useQuery({
        queryKey: ['getWatched'],
        queryFn: () => getWatched(userID || ''),
    })
    const filteredMovies = allMovies?.filter(movie => !userWatchlist?.find(watchlistMovie => watchlistMovie.ID === movie.ID)).filter(movie => !userWatched?.find(watchedMovie => watchedMovie.ID === movie.ID));

    if (isError) {
        toast.error((error as Error).message, {
            position: "bottom-center",
        });
    }

    if (isPending) {
        return <CircularProgress />
    }

    return (
        <MoviesLayout movies={filteredMovies?.sort(() => 0.5 - Math.random()) || []} moviesPerPage={MOVIES_PER_PAGE} movieCardType="home" />
    )
}
