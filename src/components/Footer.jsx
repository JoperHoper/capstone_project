import React from 'react'
import "../css/footer.css"
import { Box, Typography } from '@mui/material'
import { GitHub, LinkedIn } from '@mui/icons-material';

function Footer() {
    return (
        <Typography>
            <footer className="footer">
                <Box className='socials-container' sx={{ typography: "p" }}>
                    <Box>Follow us here:</Box>
                    <Box className="social-links">
                        <a target='blank' href='https://www.linkedin.com/in/josephinelsm/'><LinkedIn sx={{ fontSize: "35px" }} /></a>
                        <a target='blank' href='https://github.com/JoperHoper'><GitHub sx={{ fontSize: "35px" }} /></a>
                    </Box>
                </Box>
                <Box className='footer-container' sx={{ typography: "p" }}>
                    <a href='/about'><p>About</p></a>
                    <a href='/account'><p>Account</p></a>
                </Box>
            </footer>
        </Typography>
    )
}

export default Footer