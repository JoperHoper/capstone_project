import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovieById } from '../slices/movieByIdSlicer';
import { useParams } from 'react-router-dom'
import NavBar from './NavBar';
import Footer from './Footer';
import { Container, Box, Typography } from '@mui/material';
import "../css/movieDetails.css"

function MovieDetails() {
    const dispatch = useDispatch();
    const splat = useParams()["*"];
    const movieItem = useSelector((state) => state.movieById)

    useEffect(() => {
        dispatch(fetchMovieById({ movieId: splat }));
    }, [])

    return (
        <Container disableGutters={true} maxWidth="false" className='all-containers' sx={{ minHeight: "100vh" }}>
            <NavBar />
            <Container className='movie-details-container'>
                <Box className='movie-details-wrapper-img'>
                    <img src={movieItem.movieItem.posterUrl} />
                </Box>
                <Box className='movie-details-wrapper-content'>
                    <Typography color='text.primary' variant='typography.p'>
                        <h1>{movieItem.movieItem.movieTitle}</h1>
                        <h3>Language: {movieItem.movieItem.language}</h3>
                        <h4>Release Date: {movieItem.movieItem.releaseDate}</h4>
                        <h4>Run Time: {movieItem.movieItem.runningTime} minutes</h4>
                        <hr />
                        <h4>Synopsis</h4>
                        <p>{movieItem.movieItem.synopsis}</p>
                        <div className='movie-details-btn'><a target='blank' href={movieItem.movieItem.trailerUrl}>Watch Trailer</a></div>
                    </Typography>
                </Box>
            </Container>
            <Footer />
        </Container>
    )
}

export default MovieDetails