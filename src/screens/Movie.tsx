import { useParams } from "react-router-dom";

export const Movie = () => {
    const { id } = useParams();
    return (
        <div>Movie with id {id}</div>
    )
}
