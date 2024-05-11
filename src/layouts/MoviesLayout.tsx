import { Container, Pagination } from "@mui/material"
import { HomeMovieCard } from "../components/HomeMovieCard"
import { useState, useEffect, FunctionComponent } from "react";
import { IMovie } from "../interfaces";
import { WatchedMovieCard, WatchlistMovieCard } from "../components";
import { MovieCardLayout } from "./MovieCardLayout";

interface IMoviesLayoutProps {
    moviesPerPage: number;
    movies: IMovie[];
    movieCardType: 'home' | 'watchlist' | 'watched' | 'empty';
}

export const MoviesLayout: FunctionComponent<IMoviesLayoutProps> = ({ movies, moviesPerPage, movieCardType }) => {
    const [page, setPage] = useState(1);
    const [moviesToShow, setMoviesToShow] = useState(movies.length ? movies.slice(0, moviesPerPage) : []);

    useEffect(() => {
        setMoviesToShow(movies.length ? movies.slice((page - 1) * moviesPerPage, page * moviesPerPage) : [])
    }, [movies, moviesPerPage, page])

    const removeMovieFromUIList = (movieID: number) => {
        setMoviesToShow(moviesToShow.filter(movie => movie.ID !== movieID))
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <Container style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gridGap: '20px', padding: '20px', maxWidth: '1000px' }}>
                {moviesToShow?.map((movie, index) => (
                    movieCardType === 'home' ? <HomeMovieCard key={index} movie={movie} /> :
                        movieCardType === 'watchlist' ? <WatchlistMovieCard key={index} movie={movie} removeMovieFromUIWatchlist={removeMovieFromUIList} /> :
                            movieCardType === 'watched' ? <WatchedMovieCard key={index} movie={movie} removeMovieFromUIWatched={removeMovieFromUIList} /> :
                                movieCardType === 'empty' ? <MovieCardLayout key={index} movie={movie} /> : null
                ))}
            </Container >
            {moviesToShow.length ? <Pagination count={movies && Math.ceil(movies.length / moviesPerPage)} onChange={(_, page) => setPage(page)} color="primary" sx={{ marginBottom: '16px' }} /> : null}
        </div>
    )
}
