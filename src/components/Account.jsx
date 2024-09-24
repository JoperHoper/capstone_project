import React, { useEffect, useRef, useState } from 'react'
import { Container, Box, Typography, Autocomplete, TextField } from '@mui/material'
import NavBar from './NavBar'
import Footer from './Footer'
import "../css/account.css"
import kittenImg from "../assets/Kitten.jpg"
import { useDispatch, useSelector } from 'react-redux'
import useLocalStorage from "../hook/useLocalStorage";
import { fetchUser } from '../slices/userSlicer'
import { useNavigate } from 'react-router-dom'
import { updateCurrentUser } from '../slices/updateUserSlicer'

function Account() {
    return (
        <Container disableGutters={true} maxWidth="false" className='acc-container'>
            <NavBar />
            <Container disableGutters={true} maxWidth="lg" sx={{ height: "110vh", display: "flex", justifyContent: "center" }}>
                <Profile />
            </Container>
            <Footer />
        </Container>
    )
}

function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const [isSaveToDB, setIsSaveToDB] = useState(false);
    const [btnTxt, setBtnTxt] = useState("Edit")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [birthday, setBirthday] = useState("")
    const [bio, setBio] = useState("")
    const [accessToken, setAccessToken] = useLocalStorage("accessToken", "");
    const nameValue = useRef();
    const emailValue = useRef();
    const dateValue = useRef();
    const bioValue = useRef();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user)
    const updateUser = useSelector((state) => state.updateUser)
    const navigate = useNavigate()

    const nameValueField = nameValue.current
    const emailValueField = emailValue.current
    const birthdayValueField = dateValue.current
    const bioValueField = bioValue.current

    useEffect(() => {
        dispatch(fetchUser({ accessToken: accessToken }))
    }, [])

    useEffect(() => {
        if (user.userArr === 401 || user.userArr === 403) {
            setAccessToken("")
            setTimeout(() => {
                navigate("/login")
            }, 500)
        }
        else {
            setName(user.userArr.name)
            setEmail(user.userArr.email)
            let userDOB = new Date(user.userArr.dob)
            setBirthday(userDOB.getFullYear() + "-" + (userDOB.getMonth() < 9 ? '0' + (userDOB.getMonth() + 1) : (userDOB.getMonth() + 1)) + "-" + (userDOB.getDate() < 10 ? "0" + userDOB.getDate() : userDOB.getDate()))
            setBio(user.userArr.bio)
        }
    }, [user])

    useEffect(() => {
        if (isEditing) {
            setBtnTxt("Save");
        }
        else {
            setBtnTxt("Edit");
            if (isSaveToDB) {
                dispatch(updateCurrentUser({
                    accessToken: accessToken,
                    bio: bio,
                    name: name,
                    email: email,
                    dob: birthday
                }))
            }
            setIsSaveToDB(false)
        }
    }, [isEditing, btnTxt, name, email, birthday, bio])

    const handleEdit = () => {
        if (isEditing) {
            if (nameValueField.value !== "") {
                setName(nameValueField.value)
                setIsSaveToDB(true)
            }
            if (emailValueField.value !== "") {
                setEmail(emailValueField.value)
                setIsSaveToDB(true)
            }
            if (birthdayValueField.value !== "") {
                setBirthday(birthdayValueField.value)
                setIsSaveToDB(true)
            }
            if (bioValueField.value !== "") {
                setBio(bioValueField.value)
                setIsSaveToDB(true)
            }
        }
        setIsEditing(!isEditing)
    }

    return (
        <Container disableGutters={true} maxWidth="md" className='details-container'>
            <Typography variant="typography.p" color="text.primary">
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
                    <Box sx={{ width: "50%", height: "inherit", float: "left", textAlign: "left" }}>
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
                    <Box sx={{ width: "49%", height: "inherit", float: "right" }}>
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
                    placeholder="Add Favourites"
                />
            )}
        />
    )
}

export default Account