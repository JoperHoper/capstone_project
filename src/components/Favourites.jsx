import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import { Container } from '@mui/material'
import FavouriteBoard from "../components/FavouriteBoard"

function Favourites() {
    return (
        <Container disableGutters={true} maxWidth="false" sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
            <NavBar />
            <FavouriteBoard />
            <Footer />
        </Container>
    )
}

export default Favourites