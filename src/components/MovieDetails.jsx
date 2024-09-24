import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovieById } from '../slices/movieByIdSlicer';
import { useParams } from 'react-router-dom'
import NavBar from './NavBar';
import Footer from './Footer';
import { Container, Box, Typography } from '@mui/material';

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
            <Container sx={{ height: "70vh", display: "flex" }}>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <img style={{ height: "55vh" }} src={movieItem.movieItem.posterUrl} />
                </Box>
                <Box sx={{ padding: "15px 20px" }}>
                    <Typography color='text.primary' variant='typography.p'>
                        <h1>{movieItem.movieItem.movieTitle}</h1>
                        <h3>Language: {movieItem.movieItem.language}</h3>
                        <h4>Release Date: {movieItem.movieItem.releaseDate}</h4>
                        <h4>Run Time: {movieItem.movieItem.runningTime} minutes</h4>
                        <hr />
                        <h4>Synopsis</h4>
                        <p>{movieItem.movieItem.synopsis}</p>
                        <div style={{ cursor: "pointer", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", width: "8vw", padding: "10px 0px", backgroundColor: "#6464AE" }}><a target='blank' href={movieItem.movieItem.trailerUrl}>Watch Trailer</a></div>
                    </Typography>
                </Box>
            </Container>
            <Footer />
        </Container>
    )
}

export default MovieDetails