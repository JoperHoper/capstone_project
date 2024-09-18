import React from 'react'
import { Container, Box } from '@mui/material'
import { fetchFavouriteBoard } from "../slices/favouriteBoardSlicer"
import { fetchFavInBoard } from '../slices/favToBoardSlicer'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useLocalStorage from "../hook/useLocalStorage";

function FavouriteBoard() {
    const dispatch = useDispatch();
    const [accessToken, setAccessToken] = useLocalStorage("accessToken", "");
    const fav = useSelector((state) => state.favouriteBoard)
    const favToBoard = useSelector((state) => state.favsInBoard)

    useEffect(() => {
        dispatch(fetchFavouriteBoard({ accessToken: accessToken }))
    }, [])

    // useEffect(() => {
    //     let boardId = fav.boardArr[0].boardId
    //     console.log(boardId)
    //     dispatch(fetchFavInBoard({ boardId: boardId }));
    // }, [fav])

    const handleBoards = () => {
        return fav.boardArr.map((data) => {
            return (
                <Box sx={{ border: "1px solid yellow", minWidth: "12vw", height: "35vh", backgroundColor: "#6464AE", boxShadow: "10px 10px #EE6F4E" }}>
                    {data.name}
                </Box>
            )
        })
    }

    return (
        <Container disableGutters={false} maxWidth="lg" sx={{ border: "1px solid red", minHeight: "70vh", display: "flex", flexDirection: "row" }}>
            {handleBoards()}
            <span style={{ padding: "0px 25px", border: "1px solid blue", height: "35vh" }}>
                <button style={{ borderRadius: "50px", border: "none", padding: "20px 30px", fontSize: "30px", cursor: "pointer", marginTop: "12vh", backgroundColor: "#6464AE", color: "#faf8f6" }}>&#43;</button>
            </span>
        </Container>
    )
}

export default FavouriteBoard