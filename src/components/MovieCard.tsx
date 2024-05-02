import { Button, CardActionArea, CardActions } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { IMovie } from '../interfaces';
import { FunctionComponent, useState } from 'react';
import { Favorite } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import placeholder from "../assets/movie_placeholder.png";

interface IMovieCardProps {
  movie: IMovie;
}

export const MovieCard: FunctionComponent<IMovieCardProps> = ({ movie }) => {
  const navigate = useNavigate();
  const [image, setImage] = useState(movie.poster_url);
  console.log(movie)


  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea
        onClick={() => {
          navigate(`/movie/${movie.ID}`)
        }}
        sx={{}}
      >
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt={movie.title}
          sx={{ height: '100%' }}
          onError={(e: unknown) => { console.log(e), setImage(placeholder) }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {movie.title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Add to Watchlist
        </Button>
        <Button size="small" color="primary">
          <Favorite color="secondary" />
        </Button>
      </CardActions>
    </Card>
  );
}