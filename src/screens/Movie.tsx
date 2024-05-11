import { Box, Button, CircularProgress, Container, Grid, Rating, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getMovie, useModifyMovieRating, useRateMovie } from "../api";
import { AuthContext } from "../context";

export const Movie = () => {
    const { id } = useParams();
    const { userID } = useContext(AuthContext);
    const { isPending, data: movie, error } = useQuery({ queryKey: ["movie"], queryFn: () => getMovie(id || '', userID || '') });
    const [rating, setRating] = useState<number>((movie?.score || 0) / 2);
    const [wasMovieRated, setWasMovieRated] = useState<boolean>(movie?.score !== undefined || false);
    const [isMovieRated, setIsMovieRated] = useState<boolean>(movie?.score !== undefined || false);
    const { mutateAsync: rateMovie } = useRateMovie();
    const { mutateAsync: modifyMovieRating } = useModifyMovieRating();


    useEffect(() => {
        if (movie?.score) {
            setRating(Number(movie.score) / 2);
            setIsMovieRated(true);
        }
    }, [isPending, movie?.score]);

    if (error) {
        toast.error((error as Error).message, {
            position: "bottom-center",
        });
        return null;
    }

    const handleRateMovie = () => {
        if (rating * 2 < 1) return;
        if (movie?.score || wasMovieRated) {
            modifyMovieRating({ movieId: String(movie?.ID), score: rating * 2 });
        } else {
            rateMovie({ movieId: String(movie?.ID), score: rating * 2 });
        }
        setIsMovieRated(true);
        setWasMovieRated(true);
    }

    const reRateMovie = () => {
        setIsMovieRated(false);
    }

    return (
        <Container
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'space-between',
                marginTop: "16vh",
                paddingLeft: 0,
            }}
        >
            {isPending ? (
                <Container>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                        <CircularProgress />
                    </div>
                </Container>
            ) : (
                <Container
                    sx={{
                        display: 'flex',
                        width: '80%',
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: 24,
                        borderRadius: '8px',
                        boxShadow: 4,
                        overflow: 'hidden',
                        padding: "0px !important",
                    }}
                >
                    <Container
                        sx={{
                            width: { xs: '100%', sm: 400 },
                            height: { xs: '100%', sm: 450 },
                            backgroundImage: `url(${movie.poster_url})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                        }}
                    />
                    <Container
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            padding: 16
                        }}
                    >
                        <Typography variant="h4" component="h2">
                            {movie.title}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {movie.year} | {movie.runtime} minutes
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            Directed by {movie.director}
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: 1,
                                marginTop: 4,
                                marginBottom: 4,
                            }}
                        >
                            {movie.genres.map((genre, index) => (
                                <Typography
                                    key={index}
                                    variant="body2"
                                    color="primary"
                                    sx={{
                                        backgroundColor: 'primary.main',
                                        color: 'white',
                                        padding: '2px 8px',
                                        marginRight: '4px',
                                        borderRadius: 1,
                                    }}
                                >
                                    {genre}
                                </Typography>
                            ))}
                        </Box>
                        <Typography variant="body1" paragraph align="left" paddingRight="10px">
                            {movie.plot}
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle2" color="textSecondary">
                                    Actors:
                                </Typography>
                                <Box>
                                    {movie.actors.map((actor, index) => (
                                        <Typography key={index} variant="body2">
                                            {actor}
                                        </Typography>
                                    ))}
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle2" color="textSecondary">
                                    Rating:
                                </Typography>
                                <Typography variant="body2">
                                    {movie.rating.average} / 10 ({movie.rating.num_votes} votes)
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <div style={{ marginTop: '24px', display: 'flex', width: '80%', gap: 13 }}>
                                    <Rating size="large" value={rating} onChange={(_, newValue) => setRating(newValue || 0)} precision={0.5} readOnly={isMovieRated} />
                                    {!isMovieRated && <Button onClick={handleRateMovie}> <Typography variant="h6">Rate Movie</Typography></Button>}
                                    {isMovieRated && (
                                        <Button onClick={reRateMovie}>
                                            <Typography variant="h6">
                                                Change Rating
                                            </Typography>
                                        </Button>
                                    )}
                                </div>
                            </Grid>
                        </Grid>
                    </Container>
                </Container>
            )}
        </Container>
    );
}
