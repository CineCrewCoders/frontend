export interface IMovie {
    ID: number
    title: string
    year: string
    runtime: string
    genres: string[]
    actors: string[]
    director: string
    plot: string
    poster_url: string
    rating: {
        num_votes: number
        average: number
    }
    score?: number
}