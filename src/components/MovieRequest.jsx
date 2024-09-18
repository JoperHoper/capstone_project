import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import { Container } from '@mui/material'
import RequestForm from '../forms/RequestForm'
import "../css/movie-request.css"

function MovieRequest() {
    return (
        <Container disableGutters={true} maxWidth="false" sx={{ bgcolor: "background.default" }} className='request-container'>
            <NavBar />
            <RequestForm />
            <Footer />
        </Container>
    )
}

export default MovieRequest