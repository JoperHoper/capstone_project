import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies } from '../slices/movie'
import { Box, Container, Typography, Card, CardMedia, CardContent, CardActionArea, CardActions } from '@mui/material'

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
            console.log(movieArr[randomIndex])

            return (
                <Card key={movieArr[randomIndex].movieId} sx={{ minWidth: '20vw', maxWidth: "40vw", minHeight: "50vh" }}>
                    <CardActionArea sx={{ position: "relative" }}>
                        <CardMedia
                            component="img"
                            height="150"
                            image={movieArr[randomIndex].posterUrl}
                            alt={movieArr[randomIndex].movieTitle}
                        />
                        <CardContent>
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
                        </CardContent>
                        <CardActions sx={{ display: 'flex', justifyContent: "center" }}>
                            <a style={{ color: "black", textDecoration: "none", fontSize: "15px", fontWeight: "bold" }} target='blank' href={movieArr[randomIndex].trailerUrl}>Watch Trailer</a>
                        </CardActions>
                    </CardActionArea>
                </Card>
            )
        }

    }

    return (
        <Container maxWidth="false" sx={{ minHeight: "80vh", marginTop: "20px", width: "100%", textAlign: "center", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
            <Typography variant='typography.heading' color='text.primary'>
                <h1>I'm Feeling... this movie tonight!</h1>
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", maxWidth: "30vw", padding: "20px" }}>
                {randomizeCards()}
            </Box>
            <button style={{ border: "none", cursor: "pointer", width: "10%", padding: "10px", borderRadius: "10px", fontSize: "15px", color: "white", backgroundColor: "#6464AE" }} onClick={getRandomMovies}>Randomize</button>
        </Container>
    )
}

export default RandomCards