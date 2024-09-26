import React from 'react'
import { Container, Box, Button, Typography } from '@mui/material'
import { fetchFavouriteBoard } from "../slices/favouriteBoardSlicer"
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useLocalStorage from "../hook/useLocalStorage";
import { useNavigate } from 'react-router-dom'
import moviePoster from "../assets/movies_posters.jpg"
import "../css/favouriteBoard.css"

function FavouriteBoard() {
    const dispatch = useDispatch();
    const [accessToken, setAccessToken] = useLocalStorage("accessToken", "");

    const fav = useSelector((state) => state.favouriteBoard)
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchFavouriteBoard({ accessToken: accessToken }))
    }, [])

    // Check if user is logged in before favourite. Route to login page if no
    useEffect(() => {
        if (fav && (fav.boardArr === 403 || fav.boardArr === 401)) {
            setAccessToken("")
            setTimeout(() => {
                navigate("/login")
            }, 500)
        }
    }, [fav])

    // handle click into board
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
                        <img className='favourite-board-img' src={moviePoster} />
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
        <Container disableGutters={false} maxWidth="lg" className='favourite-board-container'>
            {handleBoards()}
            <span>
                <button className='favourite-board-btn'>&#43;</button>
            </span>
        </Container>
    )
}

export default FavouriteBoard