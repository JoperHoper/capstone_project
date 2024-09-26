import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import { Container } from '@mui/material'
import RandomCards from '../cards/RandomCards'

function Randomizer() {
    return (
        <Container disableGutters={true} maxWidth="false" className='all-containers' sx={{ minHeight: "120vh" }}>
            <NavBar />
            <RandomCards />
            <Footer />
        </Container>
    )
}

export default Randomizer