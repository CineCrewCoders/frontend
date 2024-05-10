import { Container, Pagination } from "@mui/material"
import { HomeMovieCard } from "../components/HomeMovieCard"
import { useState, useEffect, FunctionComponent } from "react";
import { IMovie } from "../interfaces";
import { WatchedMovieCard, WatchlistMovieCard } from "../components";

interface IMoviesLayoutProps {
    moviesPerPage: number;
    movies: IMovie[];
    movieCardType: 'home' | 'watchlist' | 'watched';
}

export const MoviesLayout: FunctionComponent<IMoviesLayoutProps> = ({ movies, moviesPerPage, movieCardType }) => {
    const [page, setPage] = useState(1);
    const [moviesToShow, setMoviesToShow] = useState(movies?.slice(0, moviesPerPage));

    useEffect(() => {
        setMoviesToShow(movies?.slice((page - 1) * moviesPerPage, page * moviesPerPage))
    }, [movies, moviesPerPage, page])

    const removeMovieFromUIList = (movieID: number) => {
        setMoviesToShow(moviesToShow?.filter(movie => movie.ID !== movieID))
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <Container style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gridGap: '20px', padding: '20px', maxWidth: '1000px' }}>
                {moviesToShow?.map((movie, index) => (
                    movieCardType === 'home' ? <HomeMovieCard key={index} movie={movie} /> :
                        movieCardType === 'watchlist' ? <WatchlistMovieCard key={index} movie={movie} removeMovieFromUIWatchlist={removeMovieFromUIList} /> :
                            movieCardType === 'watched' ? <WatchedMovieCard key={index} movie={movie} removeMovieFromUIWatched={removeMovieFromUIList}/> :
                                null
                ))}
            </Container >
            <Pagination count={movies && Math.ceil(movies.length / moviesPerPage)} onChange={(_, page) => setPage(page)} color="primary" sx={{ marginBottom: '16px' }} />
        </div>
    )
}
