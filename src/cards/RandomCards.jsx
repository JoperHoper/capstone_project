import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies } from '../slices/movie'
import { Box, Container, Typography, Card, CardMedia, CardContent, CardActionArea, CardActions } from '@mui/material'
import "../css/randomiser.css"

function RandomCards() {
    const dispatch = useDispatch();
    const movie = useSelector((state) => state.movie)
    const [randomIndex, setRandomIndex] = useState(0);

    let movieArr = [...movie.movieArr]

    useEffect(() => {
        dispatch(fetchMovies())
    }, [])

    //Randomising logic
    const getRandomMovies = () => {
        setRandomIndex(Math.floor(Math.random() * movieArr.length));
    }

    // Popuate random card
    const randomizeCards = () => {
        if (movie.loading) {
            return <div>Loading...</div>
        }
        if (movieArr[randomIndex]) {
            return (
                <Card key={movieArr[randomIndex].movieId} className="random-cards-container">
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="150"
                            image={movieArr[randomIndex].posterUrl}
                            alt={movieArr[randomIndex].movieTitle}
                        />
                        <CardContent>
                            <Box sx={{ width: "20vw" }}>
                                <Typography color='primary' variant='typography.heading'>
                                    <h2>{movieArr[randomIndex].movieTitle}</h2>
                                </Typography>
                                <Typography color='primary' variant='typography.p'>
                                    <p><strong>Language:</strong> {movieArr[randomIndex].language}</p>
                                    <p><strong>Genre:</strong>{movieArr[randomIndex].genres.slice(0, 2).map((data) => {
                                        return <p>{data.genre}</p>
                                    })}</p>
                                </Typography>
                                <Typography color='primary' variant='typography.p'>
                                    <p><strong>Released: </strong>{movieArr[randomIndex].releaseDate}</p>
                                </Typography>
                            </Box>
                        </CardContent>
                        <CardActions className="random-cards-trailer">
                            <a target='blank' href={movieArr[randomIndex].trailerUrl}>Watch Trailer</a>
                        </CardActions>
                    </CardActionArea>
                </Card>
            )
        }

    }

    return (
        <Container maxWidth="false" className="randomiser-page-container">
            <Typography variant='typography.heading' color='text.primary'>
                <h1>I'm Feeling... this movie tonight!</h1>
            </Typography>
            <Box className="randomiser-page-wrapper">
                {randomizeCards()}
            </Box>
            <button className="randomiser-btn" onClick={getRandomMovies}>Randomize</button>
        </Container>
    )
}

export default RandomCards