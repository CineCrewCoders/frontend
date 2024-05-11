import { Search as SearchIcon, Star } from "@mui/icons-material";
import { Button, Checkbox, CircularProgress, Container, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Rating, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { MoviesLayout } from "../layouts";
import { useSearchMovies } from "../api";
import { IMovie } from "../interfaces";

const genres = ['Comedy', 'Fantasy', 'Crime', 'Drama', 'Music', 'Adventure', 'History', 'Thriller', 'Animation', 'Family', 'Mystery', 'Biography', 'Action', 'Film-Noir', 'Romance', 'Sci-Fi', 'War', 'Western', 'Horror', 'Musical', 'Sport']
const ratings = Array.from({ length: 11 }, (_, index) => index / 2);

export const Search = () => {
    const [title, setTitle] = useState<string>('')
    const [selectedGenres, setSelectedGenres] = useState<string[]>([])
    const [minRating, setMinRating] = useState<number>(0)
    const [searchedMovies, setSearchedMovies] = useState<IMovie[]>([])
    const { mutateAsync: searchMovies, isPending } = useSearchMovies();


    const handleGenresChange = (e: SelectChangeEvent<typeof selectedGenres>) => {
        const { target: { value } } = e;
        setSelectedGenres(
            typeof value === 'string' ? value.split(',') : value
        )
    }

    const handleRateChange = (e: SelectChangeEvent<number>) => {
        const { target: { value } } = e;
        setMinRating(typeof value === 'string' ? parseFloat(value) : value)
    }

    const handleSearch = async () => {
        const data = await searchMovies({ title, genres: selectedGenres, minScore: minRating * 2 })
        console.log(data)
        setSearchedMovies(data || [])
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
            e.currentTarget.blur();
        }
    };

    return (
        <Container>
            <Typography variant="h2">Search movies</Typography >
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
                <TextField
                    label="Movie title"
                    variant="outlined"
                    sx={{ width: '40%' }}
                    value={title}
                    onKeyDown={handleKeyPress}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <Button sx={{ minWidth: 12 }} onClick={handleSearch}>
                                <SearchIcon />
                            </Button>
                        ),
                    }}
                />
                <FormControl sx={{ width: '20%' }}>
                    <InputLabel sx={{ marginLeft: 13.5 }} id="genres">Genres</InputLabel>
                    <Select multiple value={selectedGenres} sx={{ marginLeft: 16 }} onChange={handleGenresChange} renderValue={(selected) => selected.join(', ')} input={<OutlinedInput label="Name" />} >
                        {genres.map((genre, index) => (
                            <MenuItem key={index} value={genre}>
                                <Checkbox checked={selectedGenres.indexOf(genre) > -1} />
                                <ListItemText primary={genre} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl sx={{ width: '15%', maxHeight: '50' }}>
                    <InputLabel sx={{ marginLeft: 12 }} id="genres">Minimum Rating</InputLabel>
                    <Select label="Minimum Rate" sx={{ marginLeft: 16 }} value={minRating} onChange={handleRateChange} renderValue={(selected) => <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Typography>{selected}</Typography><Star fontSize="small" /></div>}>
                        {ratings.map((rating, index) => (
                            <MenuItem key={index} value={rating}>{<Rating size="small" readOnly value={rating} precision={0.5} />}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            {isPending ? <CircularProgress /> :
                <MoviesLayout movies={searchedMovies} moviesPerPage={8} movieCardType='empty' />}
        </Container>
    )
}
