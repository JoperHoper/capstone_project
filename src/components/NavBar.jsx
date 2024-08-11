import { Container, Typography, Box } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import logo from "../assets/jpmovie_logo_cropped_white.png"
import appIcon from "../assets/jpmovie_icon_cropped_white.png"
import { grey } from '@mui/material/colors';
import React from 'react'
import "../css/navbar.css"

function NavBar() {
    return (
        <Container disableGutters={true} maxWidth="false" variant="flex_cont" className='navbar-container'>
            <img className='logo' style={{ height: "60px", width: "120px" }} src={logo} />
            <img className='app-icon' style={{ height: "50px", width: "50px" }} src={appIcon} />
            <span className='menu-icon'><MenuIcon sx={{ color: grey[50] }} fontSize="large" /></span>
            <Box className='navbar-menu'>
                <Typography variant='menu' color='text.primary'>Movies</Typography>
                <span className='vl' />
                <Typography variant='menu' color='text.primary'>Cinema</Typography>
                <span className='vl' />
                <Typography variant='menu' color='text.primary'>Promo</Typography>
                <span className='vl' />
                <Typography variant='menu' color='text.primary'>Login</Typography>
            </Box>
        </Container>
    )
}

export default NavBar