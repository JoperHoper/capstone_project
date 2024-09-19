import React from 'react'
import { Container, Box } from '@mui/material'
import { fetchFavouriteBoard } from "../slices/favouriteBoardSlicer"
import { fetchFavInBoard } from '../slices/favToBoardSlicer'
import { fetchFavourites } from '../slices/favourite'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useLocalStorage from "../hook/useLocalStorage";
import { useParams } from 'react-router-dom'

function BoardDetails() {
    const dispatch = useDispatch();
    const [accessToken, setAccessToken] = useLocalStorage("accessToken", "");
    const fav = useSelector((state) => state.favouriteBoard)
    const favourite = useSelector((state) => state.favourite)
    const favToBoard = useSelector((state) => state.favToBoard)
    const splat = useParams()["*"];

    // useEffect(() => {
    //     dispatch(fetchFavouriteBoard({ accessToken: accessToken }))
    // }, [])
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

    const handleBoards = () => {
        if (fav && fav.boardArr && Array.isArray(fav.boardArr)) {
            return fav.boardArr.map((data) => {
                return (
                    <Box sx={{ border: "1px solid yellow", minWidth: "12vw", height: "35vh", backgroundColor: "#6464AE", boxShadow: "10px 10px #EE6F4E" }}>
                        {data.name}
                    </Box>
                )
            })
        }
        else {
            return <Box></Box>
        }
    }

    return (
        <Container disableGutters={false} maxWidth="lg" sx={{ border: "1px solid red", minHeight: "70vh", display: "flex", flexDirection: "row" }}>

        </Container>
    )
}

export default BoardDetails