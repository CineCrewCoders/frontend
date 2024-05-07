import { Box, CircularProgress, Container, Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getMovie } from "../api";
import { AuthContext } from "../context";

export const Movie = () => {
    const { id } = useParams();
    const { userID } = useContext(AuthContext);
    const { isPending, data, error } = useQuery({ queryKey: ["movie"], queryFn: () => getMovie(id || '', userID || '') });

    if (error) {
        toast.error((error as Error).message, {
            position: "bottom-center",
        });
        return null;
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
                            backgroundImage: `url(${data.poster_url})`,
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
                            {data.title}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {data.year} | {data.runtime} minutes
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            Directed by {data.director}
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
                            {data.genres.map((genre, index) => (
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
                            {data.plot}
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle2" color="textSecondary">
                                    Actors:
                                </Typography>
                                <Box>
                                    {data.actors.map((actor, index) => (
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
                                    {data.rating.average} / 10 ({data.rating.num_votes} votes)
                                </Typography>
                            </Grid>
                        </Grid>
                    </Container>
                </Container>
            )}
        </Container>
    );
}
