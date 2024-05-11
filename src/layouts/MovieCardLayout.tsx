import { Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { FunctionComponent, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import placeholder from "../assets/movie_placeholder.png";
import { IMovie } from "../interfaces";

interface IMovieCardLayoutProps {
    children?: ReactNode,
    movie: IMovie,
}

export const MovieCardLayout: FunctionComponent<IMovieCardLayoutProps> = ({ movie, children }) => {
    const navigate = useNavigate();
    const [image, setImage] = useState(movie.poster_url);

    useEffect(() => {
        setImage(movie.poster_url)
      }, [movie.poster_url])

    return (
        <Card sx={{ maxWidth: 345, maxHeight: 500 }}>
            <CardActionArea
                onClick={() => {
                    navigate(`/movie/${movie.ID}`)
                }}
            >
                <CardMedia
                    component="img"
                    height="140"
                    image={image}
                    alt={movie.title}
                    sx={{ height: '350px' }}
                    onError={() => { setImage(placeholder) }}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" height={28} sx={{
                        whiteSpace: 'pre',
                        display: 'block',
                        textOverflow: 'ellipsis',
                        wordWrap: 'break-word',
                        overflow: 'hidden'
                    }} >
                        {movie.title}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                {children}
            </CardActions>
        </Card>
    )
}
