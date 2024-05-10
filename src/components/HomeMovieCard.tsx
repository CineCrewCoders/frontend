import { Check } from '@mui/icons-material';
import { Button, CircularProgress } from '@mui/material';
import { FunctionComponent, useState } from 'react';
import { toast } from 'react-toastify';
import { useAddMovieToWatched, useAddMovieToWatchlist } from '../api';
import { IMovie } from '../interfaces';
import { MovieCardLayout } from '../layouts';

interface IHomeMovieCardProps {
  movie: IMovie;
  watchlist?: boolean;
  watched?: boolean;
}

export const HomeMovieCard: FunctionComponent<IHomeMovieCardProps> = ({ movie }) => {

  const [isAddedToWatched, setIsAddedToWatched] = useState(false);
  const [isAddedToWatchlist, setIsAddedToWatchlist] = useState(false);


  const { mutateAsync: onAddToWatchlist, error: errorAddMovieToWatchlist, isPending: isAddMovieToWatchlistPending } = useAddMovieToWatchlist();
  const { mutateAsync: onAddToWatched, error: errorAddMovieToWatched, isPending: isAddMovieToWatchedPending } = useAddMovieToWatched();

  if (errorAddMovieToWatched || errorAddMovieToWatchlist) {
    toast.error((errorAddMovieToWatched as Error).message, {
      position: "bottom-center",
    });
  }

  const handleAddToWatched = async () => {
    setIsAddedToWatched(true);
    try {
      await onAddToWatched(String(movie.ID));
    } catch (error) {
      toast.error((error as Error).message, {
        position: "bottom-center",
      });
    }
  }

  const handleAddToWatchlist = async () => {
    setIsAddedToWatchlist(true);
    try {
      await onAddToWatchlist(String(movie.ID));
    } catch (error) {
      toast.error((error as Error).message, {
        position: "bottom-center",
      });
    }
  }

  return (
    <MovieCardLayout movie={movie}>
      {isAddMovieToWatchlistPending || isAddMovieToWatchedPending ? <CircularProgress /> :
        <>
          {!isAddedToWatched && <Button size="small" color={isAddedToWatchlist ? "secondary" : "primary"} onClick={handleAddToWatchlist} disabled={isAddedToWatchlist}>
            {!isAddedToWatchlist ? 'Add to Watchlist' : 'Added to Watchlist'}
          </Button>}
          {!isAddedToWatchlist && <Button size="small" color="primary" onClick={handleAddToWatched} disabled={isAddedToWatched}>
            {!isAddedToWatched ? <Check color="secondary" /> : 'Added to Watched'}
          </Button>}
        </>
      }
    </MovieCardLayout >
  );
}