import { Container } from '@mui/material'
import "../css/homepage.css"
import React from 'react'
import NavBar from './NavBar'
import HomepageCarousel from './HomepageCarousel'
import Footer from './Footer'
import FilterByYear from '../cards/FilterByYear'
import FIlterByGenre from '../cards/FIlterByGenre'

function Homepage() {
    return (
        <Container disableGutters={true} maxWidth="false" sx={{ minHeight: "220vh" }} className='homepage-container' >
            <NavBar />
            <HomepageCarousel />
            <FilterByYear />
            <FIlterByGenre />
            <Footer />
        </Container>
    )
}

export default Homepage