import React from 'react'
import { Button, Container, Grid2, Card, Typography, CardMedia, CardContent, CardActionArea, CardActions } from '@mui/material'
import { fetchFavInBoard } from '../slices/favToBoardSlicer'
import { fetchFavourites } from '../slices/favourite'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useLocalStorage from "../hook/useLocalStorage";
import { useParams } from 'react-router-dom'
import "../css/boardDetails.css"

function BoardDetails() {
    const dispatch = useDispatch();
    const [accessToken, setAccessToken] = useLocalStorage("accessToken", "");
    const [viewMore, setViewMore] = useState(false)
    const favourite = useSelector((state) => state.favourite)
    const favToBoard = useSelector((state) => state.favToBoard)
    const splat = useParams()["*"];

    useEffect(() => {
        dispatch(fetchFavInBoard({ boardId: splat, accessToken: accessToken }));
    }, [])

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