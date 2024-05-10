import { Clear } from "@mui/icons-material";
import { Button } from "@mui/material";
import { FunctionComponent } from "react";
import { toast } from "react-toastify";
import { useRemoveMovieFromWatched } from "../api";
import { IMovie } from "../interfaces";
import { MovieCardLayout } from "../layouts";

interface IWatchedMovieCardProps {
    movie: IMovie;
    removeMovieFromUIWatched: (movieID: number) => void;
}

export const WatchedMovieCard: FunctionComponent<IWatchedMovieCardProps> = ({ movie, removeMovieFromUIWatched }) => {

    const { mutateAsync: removeMovieFromWatched } = useRemoveMovieFromWatched();



    const handleRemoveFromWatched = async () => {
        try {
            await removeMovieFromWatched(String(movie.ID));
            removeMovieFromUIWatched(movie.ID);
        } catch (error) {
            toast.error((error as Error).message, {
                position: "bottom-center",
            });
        }
    }

    return (
        <MovieCardLayout movie={movie} >
            <div style={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
                <Button size="small" color="secondary" onClick={handleRemoveFromWatched} >
                    <Clear />
                </Button>
            </div>
        </MovieCardLayout >
    )
}
