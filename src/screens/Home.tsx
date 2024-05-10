import { CircularProgress, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { toast } from "react-toastify";
import { getMovies, getWatched, getWatchlist } from "../api";
import { AuthContext } from "../context";
import { MoviesLayout } from "../layouts";

const MOVIES_PER_PAGE = 8;

export const Home = () => {
    const { userID } = useContext(AuthContext);

    const { isPending, isError, data: allMovies, error } = useQuery({
        queryKey: ['getMovies'],
        queryFn: getMovies,
    })
    const { data: userWatchlist, error: watchlistError } = useQuery({
        queryKey: ['getWatchlist'],
        queryFn: () => getWatchlist(userID || ''),
    })
    const { data: userWatched, error: watchedError } = useQuery({
        queryKey: ['getWatched'],
        queryFn: () => getWatched(userID || ''),
    })
    if (watchlistError || watchedError) {
        toast.error((watchlistError || watchedError as Error).message, {
            position: "bottom-center",
        });
    }


    if (!isPending && allMovies === undefined) {
        toast.error('Movies not found', {
            position: "bottom-center",
        });
        return <Typography variant="h3" style={{ textAlign: 'center' }}>Movies not found</Typography>
    }
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
