import React from 'react'
import NavBar from './NavBar'
import { Container } from '@mui/material'
import "../css/login.css"
import LoginForm from '../forms/LoginForm'
import Footer from './Footer'

function Login() {
    return (
        <Container disableGutters={true} maxWidth="false" className='login-container' >
            <NavBar />
            <LoginForm />
            <Footer />
        </Container>
    )
}

export default Login