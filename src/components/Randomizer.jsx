import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import { Container } from '@mui/material'
import RandomCards from '../cards/RandomCards'

function Randomizer() {
    return (
        <Container disableGutters={true} maxWidth="false" sx={{ bgcolor: "background.default", minHeight: "220vh" }}>
            <NavBar />
            <RandomCards />
            <Footer />
        </Container>
    )
}

export default Randomizer