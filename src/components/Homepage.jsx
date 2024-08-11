import { Container, Typography } from '@mui/material'
import "../css/homepage.css"
import React from 'react'
import NavBar from './NavBar'

function Homepage() {
    return (
        <Container disableGutters={true} maxWidth="false" sx={{ bgcolor: "background.default" }} className='homepage-container' >
            <NavBar />
            <Typography variant='heading'>Testing the theme</Typography>
        </Container>
    )
}

export default Homepage