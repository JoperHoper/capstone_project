import React from 'react'
import { Button, Container, Grid2, Card, Typography, CardMedia, CardContent, CardActionArea, CardActions } from '@mui/material'
import { fetchFavInBoard } from '../slices/favToBoardSlicer'
import { fetchFavourites } from '../slices/favourite'
import { createFavourites } from '../slices/createFavourite'
import { deleteFavourites } from '../slices/deleteFavourite'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { FavoriteBorder, Favorite } from '@mui/icons-material'
import useLocalStorage from "../hook/useLocalStorage";
import "../css/boardDetails.css"

function BoardDetails() {
    const dispatch = useDispatch();
    const favourite = useSelector((state) => state.favourite)
    const favToBoard = useSelector((state) => state.favToBoard)
    const [accessToken, setAccessToken] = useLocalStorage("accessToken", "");
    const [viewMore, setViewMore] = useState(false)
    // const createFavourite = useSelector((state) => state.createFavourite)
    const [favoriteMap, setFavoriteMap] = useState({})
    const [movieToFavouriteMap, setMovieToFavouriteMap] = useState({})
    const splat = useParams()["*"];

    //Retrieve boardId via splat
    useEffect(() => {
        dispatch(fetchFavInBoard({ boardId: splat, accessToken: accessToken }));
    }, [])

    // Initialising favourite map, only re-render when new favourite is added
    useEffect(() => {
        setUpFavouriteMap()
    }, [favourite])

    // Check if user is logged in before favourite. Route to login page if no
    useEffect(() => {
        if (favToBoard && (favToBoard.favInBoardArr === 403 || favToBoard.favInBoardArr === 401)) {
            setAccessToken("")
            setTimeout(() => {
                navigate("/login")
            }, 500)
        }
        let favIds = []
        if (favToBoard && favToBoard.favInBoardArr && Array.isArray(favToBoard.favInBoardArr)) {

            for (let i = 0; i < favToBoard.favInBoardArr.length; i++) {
                favIds.push(favToBoard.favInBoardArr[i].favouriteId)
            }
            dispatch(fetchFavourites({ favouriteIds: favIds.toString(), accessToken: accessToken }))
        }
    }, [favToBoard])

    const handleCards = () => {
        setViewMore(true)
    }

    const setUpFavouriteMap = () => {
        if (favourite && favourite.favArr && Array.isArray(favourite.favArr)) {
            // Check if object is available
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

    // Handling favourite logic
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
                    setTimeout(() => {
                        window.location.reload();
                    }, 100)
                }
            }
        }
        setFavoriteMap(latestFavMap)
    }

    // Toggle between icons
    const favouriteIcon = (movieId) => {
        if (favoriteMap[movieId]) {
            return <Favorite data-id={movieId} color='primary' onClick={handleFavourite} />
        }
        else {
            return <FavoriteBorder data-id={movieId} color='primary' onClick={handleFavourite} />
        }
    }

    // Mapping movie cards
    const displayFavourites = () => {
        if (favourite && favourite.favArr && Array.isArray(favourite.favArr)) {
            let favDisplay = [...favourite.favArr];
            if (!viewMore) {
                favDisplay = favDisplay.slice(0, 12);
            }
            return favDisplay.map((fav) => {
                let movie = fav.movie
                return (
                    <Grid2 size={{ xs: 4, md: 2 }} key={movie.movieId}>
                        <Card sx={{ maxWidth: "20vw", minHeight: "50vh" }}>
                            <CardActionArea sx={{ position: "relative" }}>
                                <span style={{ position: "absolute" }}>
                                    {favouriteIcon(movie.movieId)}
                                </span>
                                <CardMedia
                                    component="img"
                                    height="150"
                                    image={movie.posterUrl}
                                    alt={movie.movieTitle}
                                />
                                <CardContent>
                                    <Typography variant="h6" component="div" color='black' sx={{ lineHeight: 1.2 }}>
                                        {movie.movieTitle}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        {movie.language} <br />
                                        Run time: {movie.runningTime} <br />
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <a style={{ color: "#6464AE", textDecoration: "none" }} target='blank' href={movie.trailerUrl}>Watch Trailer</a>
                                </CardActions>
                            </CardActionArea>
                        </Card>
                    </Grid2>
                )
            })
        }
    }

    return (
        <Container disableGutters={false} maxWidth="lg" className='board-details-container'>
            <Grid2 container spacing={3} justifyItems="center" >
                {displayFavourites()}
            </Grid2>
            <Typography>
                {viewMore ? null : <Button sx={{ color: "#faf8f6", float: 'right', fontSize: "medium" }} onClick={handleCards}>View More</Button>}
            </Typography>
        </Container>
    )
}

export default BoardDetails