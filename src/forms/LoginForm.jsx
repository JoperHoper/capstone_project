import React, { useState, useRef } from 'react'
import { Container, Typography, Box } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import useLocalStorage from "../hook/useLocalStorage.jsx"
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import forge from "node-forge"
import pubkey from "../../public/id_rsa_capstone.txt";
import 'react-toastify/dist/ReactToastify.css';
import "../css/login.css"
import { useNavigate } from 'react-router-dom';


function LoginForm() {
    return (
        <Typography>
            <Container disableGutters={true} maxWidth="xs" className='login-form-container'>
                <Box sx={{ color: "text.primary", typography: "heading" }}>
                    <h1>Login</h1>
                </Box>
                <LoginInput />
                <ToastContainer />
            </Container>
        </Typography>
    )
}

function LoginInput() {
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(<VisibilityOff />)
    const [accessToken, setAccessToken] = useLocalStorage("accessToken", "");
    const username = useRef();
    const pwd = useRef();
    const navigate = useNavigate()

    const handleToggle = () => {
        if (type === 'password') {
            setIcon(<Visibility />);
            setType('text')
        } else {
            setIcon(<VisibilityOff />)
            setType('password')
        }
    }

    const notify = () => { toast.error("Username or Password Invalid") };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(pubkey).then(row => row.text()).then(publicKeyRSA => {
            let forgepublicKey = forge.pki.publicKeyFromPem(publicKeyRSA);
            // Encrypt password to send to back-end
            let encryptedData = forgepublicKey.encrypt(pwd.current.value);
            let hexValue = forge.util.bytesToHex(encryptedData)
            axios.post("http://localhost:8000/user/login", {
                username: username.current.value,
                password: hexValue
            })
                .then((data) => {
                    console.log(data.data.data)
                    let retrieveAccessToken = data.data.data
                    setAccessToken(retrieveAccessToken)
                    setTimeout(() => {
                        navigate("/")
                    }, 500)
                })
        })
    }

    return (
        <Typography>
            <Container disableGutters={true} maxWidth="xs" sx={{ color: "text.primary", typography: "menu" }} >
                <form className="form-container">
                    {/* Username input */}
                    <label htmlFor="uname" color='text.primary'>Username</label>
                    <input
                        type='text'
                        placeholder='Enter Username'
                        name='uname'
                        maxLength={12}
                        required
                        ref={username}
                        autoComplete='username'
                        className='input-field'
                    />
                    {/* Password input */}
                    <label htmlFor="psw">Password</label>
                    <div className='login-input-container'>
                        <input
                            type={type}
                            placeholder='Enter Password'
                            name='psw'
                            required
                            ref={pwd}
                            autoComplete='no'
                            className='input-field'
                        />
                        <span onClick={handleToggle} className='visibility-toggle'>{icon}</span>
                    </div>
                    <span><p style={{ fontSize: '12px' }}>No account? Click <a href='/Signup'>here</a> to sign up</p></span>
                    <button onClick={handleSubmit} className='login-btn'>Login</button>
                </form>
            </Container>
        </Typography>
    )
}

export default LoginForm