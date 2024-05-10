import { Clear } from "@mui/icons-material";
import { Button } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { toast } from "react-toastify";
import { useAddMovieToWatched, useRemoveMovieFromWatchlist } from "../api";
import { IMovie } from "../interfaces";
import { MovieCardLayout } from "../layouts";

interface IWatchlistMovieCardProps {
    movie: IMovie;
    removeMovieFromUIWatchlist: (movieID: number) => void;
}

export const WatchlistMovieCard: FunctionComponent<IWatchlistMovieCardProps> = ({ movie, removeMovieFromUIWatchlist }) => {
    const { mutateAsync: removeMovieFromWatchlist } = useRemoveMovieFromWatchlist();
    const { mutateAsync: addMovieToWatched } = useAddMovieToWatched();

    const [isAddedToWatched, setIsAddedToWatched] = useState(false);

    const handleAddToWatched = async () => {
        setIsAddedToWatched(true);
        try {
            await addMovieToWatched(String(movie.ID));
        } catch (error) {
            toast.error((error as Error).message, {
                position: "bottom-center",
            });
        }
    }

    const handleRemoveFromWatchlist = async () => {
        try {
            await removeMovieFromWatchlist(String(movie.ID));
            removeMovieFromUIWatchlist(movie.ID);
        } catch (error) {
            toast.error((error as Error).message, {
                position: "bottom-center",
            });
        }
    }

    return (
        <MovieCardLayout movie={movie} >
            <Button size="small" color="primary" onClick={handleAddToWatched} disabled={isAddedToWatched}>
                {!isAddedToWatched ? 'Add to Watched' : 'Added to Watched'}
            </Button>
            <Button size="small" color="secondary" onClick={handleRemoveFromWatchlist} >
                <Clear />
            </Button>
        </MovieCardLayout >
    )
}
