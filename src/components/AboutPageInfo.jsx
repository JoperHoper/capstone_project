import React from 'react'
import { Container, Typography } from '@mui/material'

function AboutPageInfo() {
    let libraries = [
        "@mui/icons-material: ^6.0.0",
        "@mui/material: ^6.0.0",
        "@reduxjs/toolkit: ^2.2.7",
        "axios: ^1.7.7",
        "react-toastify: ^10.0.5",
        "redux: ^5.0.1",
        "swiper:^11.1.10",
        "sshpk:^1.18.0"
    ]

    return (
        <Container disableGutters={true} maxWidth="false" sx={{ width: "90vw", minHeight: "80vh" }}>
            <Typography variant='typography.menu' color='text.primary'>
                <h2>About Classic Movies Web</h2>
                <p>This mock website is created by Josephine for Institute of Data Capstone Project purposes only. Please do not share or use it for any commercial purposes.</p>
            </Typography>
            <Typography variant='typography.menu' color='text.primary'>
                <h2>Libraries used</h2>
                <ul>{libraries.map((lib) => {
                    return <li>{lib}</li>
                })}</ul>
            </Typography>
            <Typography variant='typography.menu' color='text.primary'>
                <h2>References</h2>
                <p>Movie Information and Posters: <a style={{ textDecoration: "underline" }} target='blank' href='https://www.imdb.com/'>Click</a></p>
                <p>Cat Profile Picture: <a style={{ textDecoration: "underline" }} target='blank' href='https://www.adanavet.com/wp-content/uploads/2024/07/blog-2024-08.jpg'>Click</a></p>
                <p>Movie Poster: <a style={{ textDecoration: "underline" }} target='blank' href='https://cloudfront-us-east-1.images.arcpublishing.com/gmg/C6Y5QFY2HNDLVLDSXD35KMCSMI.jpg'>Click</a></p>
            </Typography>
            <Typography variant='typography.menu' color='text.primary'>
                <h2>Connect With Me</h2>
                <p>Github: <a style={{ textDecoration: "underline" }} target='blank' href='https://github.com/JoperHoper'>Click</a></p>
                <p>Linkedin: <a style={{ textDecoration: "underline" }} target='blank' href='https://www.linkedin.com/in/josephinelsm/'>Click</a></p>
            </Typography>
        </Container>
    )
}

export default AboutPageInfo