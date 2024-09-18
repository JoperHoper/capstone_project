import React, { useEffect, useRef, useState } from 'react'
import { Container, Box, Typography, Autocomplete, TextField } from '@mui/material'
import NavBar from './NavBar'
import Footer from './Footer'
import "../css/account.css"
import kittenImg from "../assets/Kitten.jpg"
import axios from 'axios'

function Account() {
    // const userInfo = axios.get("http://localhost:8000/user/:id")
    // .then()


    return (
        <Container disableGutters={true} maxWidth="false" sx={{ bgcolor: "background.default" }} className='acc-container'>
            <NavBar />
            <Typography>
                <Box color="text.primary">
                    <h2>Welcome, User!</h2>
                </Box>
            </Typography>
            <Container disableGutters={true} maxWidth="lg" sx={{ border: "1px solid yellow", height: "110vh", display: "flex", justifyContent: "center" }}>
                <Profile />
            </Container>
            <Footer />
        </Container>
    )
}

function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const [btnTxt, setBtnTxt] = useState("Edit")
    const [name, setName] = useState("Jane Susan")
    const [email, setEmail] = useState("Jane.S@test.com")
    const [birthday, setBirthday] = useState("")
    const [bio, setBio] = useState("")
    const nameValue = useRef();
    const emailValue = useRef();
    const dateValue = useRef();
    const bioValue = useRef();

    const nameValueField = nameValue.current
    const emailValueField = emailValue.current
    const birthdayValueField = dateValue.current
    const bioValueField = bioValue.current


    useEffect(() => {
        if (isEditing) {
            setBtnTxt("Save");
        }
        else {
            setBtnTxt("Edit");
        }
    }, [isEditing, btnTxt, name, email, birthday, bio])

    const handleEdit = () => {
        if (isEditing) {
            if (nameValueField.value !== "") {
                setName(nameValueField.value)
            }
            if (emailValueField.value !== "") {
                setEmail(emailValueField.value)
            }
            if (birthdayValueField.value !== "") {
                setBirthday(birthdayValueField.value)
            }
            if (bioValueField.value !== "") {
                setBio(bioValueField.value)
            }
        }
        setIsEditing(!isEditing)
    }

    return (
        <Container disableGutters={true} maxWidth="md" className='details-container'>
            <Typography sx={{ typography: "p", color: "text.primary" }}>
                <Box className="profile-pic-container">
                    <div className='profile-ring'>
                        <img src={kittenImg} />
                    </div>
                </Box>
                <Box className="bio-container" >
                    <h2>Bio</h2>
                    <div>
                        {isEditing ?
                            <textarea
                                maxLength={50}
                                ref={bioValue}
                                placeholder='Enter your Bio'
                                rows={5}
                                cols={30}
                                name='bio'
                            /> :
                            <p className='bio-text'>
                                {bio}
                            </p>
                        }
                    </div>
                </Box>
                <Box className="btn-container">
                    <button className='acc-btn' onClick={handleEdit}>{btnTxt}</button>
                </Box>
                <Container disableGutters={true} maxWidth="md" className='bio-container-2' sx={{ color: "text.primary" }}>
                    <Box sx={{ border: "1px solid yellow", width: "50%", height: "inherit", float: "left", textAlign: "left" }}>
                        <h3 style={{ margin: "0" }}>Name</h3>
                        <hr className='acc-divider' /><br />
                        <div className='value-input-container'>
                            {isEditing ? <input placeholder='Enter Name' ref={nameValue} type='name' /> : <p>{name}</p>}
                        </div><br />
                        <h3 style={{ margin: "0" }}>Birthday</h3>
                        <hr className='acc-divider' /><br />
                        <div className='value-input-container'>
                            {isEditing ? <input placeholder='Enter Birthday' ref={dateValue} type='date' /> : <p>{birthday}</p>}
                        </div>
                    </Box>
                    <Box sx={{ border: "1px solid yellow", width: "49%", height: "inherit", float: "right" }}>
                        <h3 style={{ margin: "0" }}>Email</h3>
                        <hr className='acc-divider' /><br />
                        <div className='value-input-container'>
                            {isEditing ? <input placeholder='Enter Email' ref={emailValue} type='email' /> : <p>{email}</p>}
                        </div><br />
                        <h3 style={{ margin: "0" }}>Favourite Genre</h3>
                        <hr className='acc-divider' /><br />
                        <div className='value-input-container'>
                            <Tags />
                        </div>
                    </Box>
                </Container>
            </Typography >
        </Container >
    )
}

const Tags = () => {
    const movieGenres = [
        { genre: "Horror" },
        { genre: "Drama" },
        { genre: "Comedy" },
        { genre: "Action" },
        { genre: "Thriller" },
        { genre: "Science Fiction" },
        { genre: "Western" },
        { genre: "Crime" },
        { genre: "Animation" },
        { genre: "Fantasy" },
        { genre: "Historical" },
        { genre: "Indie" },
        { genre: "Documentary" },
        { genre: "Musical" },
        { genre: "Romance" },
    ];

    return (
        <Autocomplete
            multiple
            options={movieGenres}
            getOptionLabel={(option) => option.genre}
            limitTags={5}
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="standard"
                    placeholder="Favorites"
                />
            )}
        />
    )
}

// const UploadAvatar = () => {
//     const [picture, setPicture] = useState();

//     const handleUpload = (e) => {
//         console.log(e.target.files)
//         console.log(JSON.stringify(e.target.files))
//         setPicture(URL.createObjectURL(e.target.files[0]));
//     }

//     return (
//         <>
//             <label htmlFor='img'></label>
//             {/* <input
//                 name='img'
//                 type='file'
//                 accept="image/*"
//                 onChange={handleUpload}
//                 className='img-input'
//             /> */}
//         </>
//     )
// }

export default Account