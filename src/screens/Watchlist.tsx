import { CircularProgress, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getWatchlist } from "../api";
import { MoviesLayout } from "../layouts";
import { useContext } from "react";
import { AuthContext } from "../context";
import { toast } from "react-toastify";
const MOVIES_PER_PAGE = 8;

export const Watchlist = () => {
    const { userID } = useContext(AuthContext);
    const { isPending, isError, data, error } = useQuery({
        queryKey: ['getWatchlist'],
        queryFn: () => getWatchlist(userID || ''),
    })

    if (isError) {
        toast.error((error as Error).message, {
            position: "bottom-center",
        });
    }

    if (isPending) {
        return <CircularProgress />
    }

    if (data?.length === 0) {
        return <Typography variant="h3" style={{ textAlign: 'center', marginTop: '16vh' }}>No movies in your watchlist</Typography>
    }

    return (
        <MoviesLayout movies={data || []} moviesPerPage={MOVIES_PER_PAGE} />
    )
}
