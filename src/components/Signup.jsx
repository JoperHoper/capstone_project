import React from 'react'
import { Container } from '@mui/material'
import NavBar from './NavBar'
import SignUpForm from '../forms/SignUpForm'
import "../css/signup.css"
import Footer from './Footer'

function Signup() {
    return (
        <Container disableGutters={true} maxWidth="false" className='signup-container' >
            <NavBar />
            <SignUpForm />
            <Footer />
        </Container>
    )
}

export default Signup