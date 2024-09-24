import React from 'react'
import { Container, Box, Button, Typography } from '@mui/material'
import { fetchFavouriteBoard } from "../slices/favouriteBoardSlicer"
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useLocalStorage from "../hook/useLocalStorage";
import { useNavigate } from 'react-router-dom'
import moviePoster from "../assets/movies_posters.jpg"

function FavouriteBoard() {
    const dispatch = useDispatch();
    const [accessToken, setAccessToken] = useLocalStorage("accessToken", "");
    const fav = useSelector((state) => state.favouriteBoard)
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchFavouriteBoard({ accessToken: accessToken }))
    }, [])

    useEffect(() => {
        if (fav && (fav.boardArr === 403 || fav.boardArr === 401)) {
            setAccessToken("")
            console.log("hi")
            setTimeout(() => {
                navigate("/login")
            }, 500)
        }
        if (fav && fav.boardArr && Array.isArray(fav.boardArr)) {

            if (fav.boardArr[0]) {
                let boardId = fav.boardArr[0].boardId
                console.log(boardId)
                // dispatch(fetchFavInBoard({ boardId: boardId, accessToken: accessToken }));
            }
        }
    }, [fav])

    const handleClick = () => {
        if (fav.boardArr[0]) {
            let boardId = fav.boardArr[0].boardId
            navigate("board/" + boardId)
        }
    }

    const handleBoards = () => {
        if (fav && fav.boardArr && Array.isArray(fav.boardArr)) {
            return (
                <Box>
                    <Button onClick={handleClick} sx={{ maxWidth: "12vw", height: "35vh", backgroundColor: "#6464AE", boxShadow: "10px 10px #6464AE" }}>
                        <img style={{ height: "inherit", width: "12vw", opacity: "0.8", borderRadius: "5px" }} src={moviePoster} />
                    </Button>
                    <Typography variant='typography.menu' color='text.primary'>
                        <h2>Favourites</h2>
                    </Typography>
                </Box>
            )
        }
        else {
            return <Box></Box>
        }
    }

    return (
        <Container disableGutters={false} maxWidth="lg" sx={{ minHeight: "70vh", display: "flex", flexDirection: "row" }}>
            {handleBoards()}
            <span style={{ padding: "0px 25px", height: "35vh" }}>
                <button style={{ borderRadius: "50px", border: "none", padding: "20px 30px", fontSize: "30px", cursor: "pointer", marginTop: "12vh", backgroundColor: "#6464AE", color: "#faf8f6" }}>&#43;</button>
            </span>
        </Container>
    )
}

export default FavouriteBoard