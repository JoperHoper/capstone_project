import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import { Container } from '@mui/material'
import FavouriteBoard from "../components/FavouriteBoard"

function Favourites() {
    return (
        <Container disableGutters={true} maxWidth="false" className='all-containers' sx={{ minHeight: "100vh" }}>
            <NavBar />
            <FavouriteBoard />
            <Footer />
        </Container>
    )
}

export default Favourites