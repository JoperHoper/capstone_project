import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies } from '../slices/movie'
import { fetchFavourites } from '../slices/favourite'
import { deleteFavourites } from '../slices/deleteFavourite'
import { createFavourites } from '../slices/createFavourite'
import { Button, Container, Grid2, Card, Typography, CardMedia, CardContent, CardActionArea, CardActions } from '@mui/material'
import { FavoriteBorder, Favorite } from '@mui/icons-material'
import useLocalStorage from "../hook/useLocalStorage";
import { useNavigate } from "react-router-dom";
import "../css/ViewAll.css"

function ViewAllCards() {
    const dispatch = useDispatch();
    const movie = useSelector((state) => state.movie)
    const favourite = useSelector((state) => state.favourite)
    const createFavourite = useSelector((state) => state.createFavourite)
    const deleteFavourite = useSelector((state) => state.deleteFavourites)
    const [viewMore, setViewMore] = useState(false)
    const [favoriteMap, setFavoriteMap] = useState({})
    const [movieToFavouriteMap, setMovieToFavouriteMap] = useState({})
    const [accessToken, setAccessToken] = useLocalStorage("accessToken", "");
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchMovies())
        dispatch(fetchFavourites({ accessToken: accessToken }))
    }, [])

    useEffect(() => {
        setUpFavouriteMap()
    }, [favourite])

    useEffect(() => {
        if (createFavourite.favArr === 403 || createFavourite.favArr === 401) {
            setAccessToken("")
            setTimeout(() => {
                navigate("/login")
            }, 500)
        }
    }, [createFavourite])

    const handleCards = () => {
        setViewMore(true)
    }

    const setUpFavouriteMap = () => {
        if (favourite && favourite.favArr && Array.isArray(favourite.favArr)) {
            if (favourite?.favArr?.length > 0) {
                let favMovieMap = {}
                let movieToFavMap = {}
                favourite.favArr.map((data) => {
                    favMovieMap[data.movieId] = true
                    movieToFavMap[data.movieId.toString()] = data.favouriteId
                })
                setFavoriteMap(favMovieMap)
                setMovieToFavouriteMap(movieToFavMap)
            }
        }
    }

    const handleFavourite = (e) => {
        const movieId = parseInt(e.currentTarget.dataset.id)
        let latestFavMap = { ...favoriteMap }
        if (!latestFavMap[movieId]) {
            latestFavMap[movieId] = true
            dispatch(createFavourites({ movieId: movieId, accessToken: accessToken }))
        } else {
            latestFavMap[movieId] = !latestFavMap[e.currentTarget.dataset.id]
            if (latestFavMap[movieId]) {
                dispatch(createFavourites({ movieId: movieId, accessToken: accessToken }))
            }
            else {
                if (movieToFavouriteMap) {
                    let favouriteId = movieToFavouriteMap[movieId]
                    dispatch(deleteFavourites({ favouriteId: favouriteId, accessToken: accessToken }))
                    let updatedFavMap = movieToFavouriteMap
                    updatedFavMap[movieId] = undefined
                    setMovieToFavouriteMap(updatedFavMap)
                    setFavoriteMap(latestFavMap)
                }
            }
        }
        setFavoriteMap(latestFavMap)
    }

    const favouriteIcon = (movieId) => {
        if (favoriteMap[movieId]) {
            return <Favorite data-id={movieId} color='primary' onClick={handleFavourite} />
        }
        else {
            return <FavoriteBorder data-id={movieId} color='primary' onClick={handleFavourite} />
        }
    }

    const viewMovieDetails = (e) => {
        navigate("/movie/" + e.currentTarget.id)
    }

    const cards = () => {
        if (movie.loading) {
            return <div>Loading...</div>
        }
        let movieDisplay = [...movie.movieArr]
        if (!viewMore) {
            movieDisplay = movieDisplay.slice(0, 12);
        }
        return movieDisplay.map((movie) => {
            return <Grid2 size={{ xs: 4, md: 2 }} key={movie.movieId}>
                <Card className='movie-card-container'>
                    <CardActionArea>
                        <Typography>
                            <span>
                                {favouriteIcon(movie.movieId)}
                            </span>
                        </Typography>
                        <CardMedia
                            component="img"
                            height="150"
                            image={movie.posterUrl}
                            alt={movie.movieTitle}
                            id={movie.movieId}
                            onClick={viewMovieDetails}
                        />
                        <CardContent>
                            <Typography variant="h6" component="div" color='black' sx={{ lineHeight: 1.2 }}>
                                {movie.movieTitle}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {movie.language} <br />
                                Run time: {movie.runningTime} <br />
                                Released on: {movie.releaseDate}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <a style={{ color: "#6464AE", textDecoration: "none" }} target='blank' href={movie.trailerUrl}>Watch Trailer</a>
                        </CardActions>
                    </CardActionArea>
                </Card>
            </Grid2>
        })
    }

    return (
        <Container maxWidth="lg" className='viewAll-container'>
            <Grid2 container spacing={3} justifyItems="center">
                {cards()}
            </Grid2>
            <Typography>
                {viewMore ? null : <Button sx={{ color: "#faf8f6", float: 'right', fontSize: "medium" }} onClick={handleCards}>View More</Button>}
            </Typography>
        </Container>
    )
}

export default ViewAllCards