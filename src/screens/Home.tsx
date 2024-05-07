import { useQuery } from "@tanstack/react-query"
import { getMovies } from "../api"
import { CircularProgress, Container, Pagination } from "@mui/material";
import { MovieCard } from "../components/MovieCard";
import { useEffect, useState } from "react";

const MOVIES_PER_PAGE = 8;

export const Home = () => {
    const [page, setPage] = useState(1);
    const { isPending, isError, data, error } = useQuery({
        queryKey: ['getMovies'],
        queryFn: getMovies,
    })
    const [moviesToShow, setMoviesToShow] = useState(data?.slice(0, MOVIES_PER_PAGE));
    useEffect(() => {
        window.scrollTo(0, 0)
        setMoviesToShow(data?.slice((page - 1) * MOVIES_PER_PAGE, page * MOVIES_PER_PAGE))
    }, [data, page])

    if (isError) {
        console.error(error);
    }

    if (isPending) {
        return <CircularProgress />
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <Container style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gridGap: '20px', padding: '20px', maxWidth: '1000px' }}>
                {moviesToShow?.map((movie, index) => (
                    <MovieCard key={index} movie={movie} />
                ))}
            </Container >
            <Pagination count={data && Math.ceil(data.length / MOVIES_PER_PAGE)} onChange={(_, page) => setPage(page)} color="primary" sx={{ marginBottom: '16px' }} />
        </div>
    )
}
