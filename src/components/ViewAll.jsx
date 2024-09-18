import React from 'react'
import NavBar from './NavBar'
import { Container } from '@mui/material'
import Footer from './Footer'
import ViewAllCards from '../cards/ViewAllCards'

function ViewAll() {

    return (
        <Container disableGutters={true} maxWidth="false" sx={{ bgcolor: "background.default", justifyContent: "center", minHeight: "155vh", paddingBottom: "15vh" }} className='viewAll-container'>
            <NavBar />
            <ViewAllCards />
            <Footer />
        </Container>
    )
}


export default ViewAll