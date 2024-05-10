import { Container, Pagination } from "@mui/material"
import { HomeMovieCard } from "../components/HomeMovieCard"
import { useState, useEffect, FunctionComponent } from "react";
import { IMovie } from "../interfaces";

interface IMoviesLayoutProps {
    moviesPerPage: number;
    movies: IMovie[];
}

export const MoviesLayout: FunctionComponent<IMoviesLayoutProps> = ({ movies, moviesPerPage }) => {
    const [page, setPage] = useState(1);
    const [moviesToShow, setMoviesToShow] = useState(movies?.slice(0, moviesPerPage));

    useEffect(() => {
        setMoviesToShow(movies?.slice((page - 1) * moviesPerPage, page * moviesPerPage))
    }, [movies, moviesPerPage, page])

    return (
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <Container style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gridGap: '20px', padding: '20px', maxWidth: '1000px' }}>
                {moviesToShow?.map((movie, index) => (
                    <HomeMovieCard key={index} movie={movie} />
                ))}
            </Container >
            <Pagination count={movies && Math.ceil(movies.length / moviesPerPage)} onChange={(_, page) => setPage(page)} color="primary" sx={{ marginBottom: '16px' }} />
        </div>
    )
}
