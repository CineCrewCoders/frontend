import { useQuery } from "@tanstack/react-query"
import { getMovies } from "../api"
import { Container } from "@mui/material";
import { MovieCard } from "../components/MovieCard";

export const Home = () => {
    const { isPending, isError, data, error } = useQuery({
        queryKey: ['getMovies'],
        queryFn: getMovies,
    })
    if (isError) {
        console.error(error);
    }
    if (isPending) {
        return <div>Loading...</div>
    }

    const moviesToShow = data?.slice(0, 24);

    return (
        <Container style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gridGap: '20px', padding: '20px', maxWidth: '1000px' }}>
            {moviesToShow?.map((movie, index) => (
                <MovieCard key={index} movie={movie} />
            ))}
        </Container >
    )
}
