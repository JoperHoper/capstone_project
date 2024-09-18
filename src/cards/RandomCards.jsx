import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies } from '../slices/movie'
import { Box, Container, Typography, Grid2, Card, CardMedia, CardContent, CardActionArea, CardActions } from '@mui/material'

function RandomCards() {
    const dispatch = useDispatch();
    const movie = useSelector((state) => state.movie)
    const [randomIndex, setRandomIndex] = useState(0);
    let movieArr = [...movie.movieArr]

    useEffect(() => {
        dispatch(fetchMovies())
    }, [])

    const getRandomMovies = () => {
        setRandomIndex(Math.floor(Math.random() * movieArr.length));
    }

    const randomizeCards = () => {
        if (movie.loading) {
            return <div>Loading...</div>
        }
        if (movieArr[randomIndex]) {
            return (
                <Card key={movieArr.movieId} sx={{ maxWidth: "30vw", minHeight: "60vh" }}>
                    <CardActionArea sx={{ position: "relative" }}>
                        <CardMedia
                            component="img"
                            height="150"
                            image={movieArr[randomIndex].posterUrl}
                            alt={movieArr[randomIndex].movieTitle}
                        />
                        <CardContent>
                            <Typography>
                                {movieArr[randomIndex].movieTitle}
                            </Typography>
                            <Typography>
                                {movieArr[randomIndex].language}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <a style={{ color: "#6464AE", textDecoration: "none" }} target='blank' href={movieArr[randomIndex].trailerUrl}>Watch Trailer</a>
                        </CardActions>
                    </CardActionArea>
                </Card>
            )
        }

    }

    return (
        <Container maxWidth="false" sx={{ minHeight: "80vh", border: "1px solid red", marginTop: "20px", width: "100%", textAlign: "center" }}>
            <Typography variant='typography.heading' color='text.primary'>
                <h1>I'm Feeling... this movie tonight!</h1>
            </Typography>
            {randomizeCards()}
            <button onClick={getRandomMovies}>Randomize</button>
        </Container>
    )
}

export default RandomCards