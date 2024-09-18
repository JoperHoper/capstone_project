import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import { Container } from '@mui/material'

function FavouritesError() {
    return (
        <Container disableGutters={true} maxWidth="false" sx={{ bgcolor: "background.default", minHeight: "220vh" }}>
            <NavBar />
            <Footer />
        </Container>
    )
}

export default FavouritesError