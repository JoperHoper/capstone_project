import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import BoardDetails from './BoardDetails'
import { Container } from '@mui/material'


function Board() {
    return (
        <Container disableGutters={true} maxWidth="false" className='all-containers' sx={{ minHeight: "200vh" }} >
            <NavBar />
            <BoardDetails />
            <Footer />
        </Container>
    )
}

export default Board