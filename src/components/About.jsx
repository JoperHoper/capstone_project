import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import { Container } from '@mui/material'
import AboutPageInfo from './AboutPageInfo'

function About() {
    return (
        <Container disableGutters={true} maxWidth="false" className='all-containers' sx={{ minHeight: "110vh" }} >
            <NavBar />
            <AboutPageInfo />
            <Footer />
        </Container>
    )
}

export default About
