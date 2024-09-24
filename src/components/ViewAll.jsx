import React from 'react'
import NavBar from './NavBar'
import { Container } from '@mui/material'
import Footer from './Footer'
import ViewAllCards from '../cards/ViewAllCards'

function ViewAll() {

    return (
        <Container disableGutters={true} maxWidth="false" className='all-containers' sx={{ minHeight: "160vh", paddingBottom: "15vh" }}>
            <NavBar />
            <ViewAllCards />
            <Footer />
        </Container>
    )
}


export default ViewAll