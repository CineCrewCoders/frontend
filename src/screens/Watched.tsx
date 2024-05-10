import { CircularProgress, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { toast } from "react-toastify";
import { getWatched } from "../api";
import { AuthContext } from "../context";
import { MoviesLayout } from "../layouts";
const MOVIES_PER_PAGE = 8;

export const Watched = () => {
    const { userID } = useContext(AuthContext);
    const { isPending, isError, data, error } = useQuery({
        queryKey: ['getWatched'],
        queryFn: () => getWatched(userID || ''),
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
        return <Typography variant="h3" style={{ textAlign: 'center', marginTop: '16vh' }}>You didn't add any movies here</Typography>
    }

    return (
        <MoviesLayout movies={data || []} moviesPerPage={MOVIES_PER_PAGE} movieCardType="watched" />
    )
}
