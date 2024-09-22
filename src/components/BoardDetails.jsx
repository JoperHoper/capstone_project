import React from 'react'
import { Container, Grid2, Card, Typography, CardMedia, CardContent, CardActionArea, CardActions } from '@mui/material'
import { fetchFavInBoard } from '../slices/favToBoardSlicer'
import { fetchFavourites } from '../slices/favourite'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useLocalStorage from "../hook/useLocalStorage";
import { useParams } from 'react-router-dom'

function BoardDetails() {
    const dispatch = useDispatch();
    const [accessToken, setAccessToken] = useLocalStorage("accessToken", "");
    const favourite = useSelector((state) => state.favourite)
    const favToBoard = useSelector((state) => state.favToBoard)
    const splat = useParams()["*"];

    console.log(splat)
    useEffect(() => {
        dispatch(fetchFavInBoard({ boardId: splat, accessToken: accessToken }));
    }, [])

    useEffect(() => {
        console.log(favToBoard)
        let favIds = []
        if (favToBoard && favToBoard.favInBoardArr && Array.isArray(favToBoard.favInBoardArr)) {
            for (let i = 0; i < favToBoard.favInBoardArr.length; i++) {
                favIds.push(favToBoard.favInBoardArr[i].favouriteId)
            }
            console.log(favIds.toString())
            dispatch(fetchFavourites({ favouriteIds: favIds.toString(), accessToken: accessToken }))
        }
    }, [favToBoard])

    useEffect(() => {
        console.log(favourite)
    }, [favourite])

    const displayFavourites = () => {
        if (favourite && favourite.favArr && Array.isArray(favourite.favArr)) {
            return favourite.favArr.map((fav) => {
                let movie = fav.movie
                return (
                    <Grid2 size={{ xs: 4, md: 2 }} key={movie.movieId}>
                        <Card sx={{ maxWidth: "20vw", minHeight: "50vh" }}>
                            <CardActionArea sx={{ position: "relative" }}>
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
        <Container disableGutters={false} maxWidth="lg" sx={{ border: "1px solid red", minHeight: "70vh", display: "flex", justifyContent: "space-evenly" }}>
            <Grid2 container spacing={3} justifyItems="center" sx={{ border: "1px solid green", width: "100%" }}>
                {displayFavourites()}
            </Grid2>

        </Container>
    )
}

export default BoardDetails