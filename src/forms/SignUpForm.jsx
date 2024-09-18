import React, { useState, useRef, useEffect } from 'react'
import { Container, Typography, Box } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import forge from "node-forge"
import pubkey from "../../public/id_rsa_capstone.txt";
import 'react-toastify/dist/ReactToastify.css';
import "../css/signup.css"
import axios from 'axios';

function SignUpForm() {
    return (
        <Typography>
            <Container disableGutters={true} maxWidth="lg" className='signup-form-container'>
                <Box sx={{ color: "text.primary", typography: "heading" }}>
                    <h1>Register</h1>
                </Box>
                <SignupInput />
            </Container>
        </Typography>
    )
}

function SignupInput() {
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    const [userSubmit, setUserSubmit] = useState(false)
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(<VisibilityOff />)
    const username = useRef();
    const firstName = useRef();
    const lastName = useRef();

    const noMatchPwd = () => {
        toast.error("Password does not match");
        setTimeout(() => {
            toast.clearWaitingQueue();
        }, 1000);
    };

    const invalidUserPass = () => {
        toast.error("Invalid Password");
        setTimeout(() => {
            toast.clearWaitingQueue();
        }, 1000);
    };

    const success = () => {
        toast.success("Submitted");
    };

    const handleToggle = () => {
        if (type === 'password') {
            setIcon(<Visibility />);
            setType('text')
        } else {
            setIcon(<VisibilityOff />)
            setType('password')
        }
    }

    const pwdIsSame = (e) => {
        e.preventDefault()
        let retypePwd = e.target.value
        setRePassword(retypePwd)
        console.log(rePassword)
    }

    const handlepwd = (e) => {
        e.preventDefault();
        setPassword(e.target.value)
        console.log(password)
    }

    const handleEmail = (e) => {
        e.preventDefault();
        setEmail(e.target.value)
        console.log(email)
    }

    useEffect(() => {
        console.log("validEmail:", validEmail)
        console.log("validPassword", validPassword)
        if (userSubmit) {
            if (validPassword && validEmail) {
                console.log(password)
                console.log(rePassword)
                if (password == rePassword) {
                    fetch(pubkey).then(row => row.text()).then(publicKeyRSA => {
                        let forgepublicKey = forge.pki.publicKeyFromPem(publicKeyRSA);
                        // Encrypt password to send to back-end
                        let encryptedData = forgepublicKey.encrypt(password);
                        let hexValue = forge.util.bytesToHex(encryptedData)
                        axios.post("http://localhost:8000/user/create", {
                            firstName: firstName.current.value,
                            lastName: lastName.current.value,
                            username: username.current.value,
                            email: email,
                            password: hexValue
                        })
                            .then((data) => {
                                console.log(data)
                            })
                    })
                    success();
                }
                else {
                    noMatchPwd()
                }
            }
            else {
                invalidUserPass()
            }
        }
    }, [validEmail, validPassword, userSubmit])

    function handleSubmit() {
        // Minimum eight characters, at least one letter and one number
        let pwdPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        let emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        setValidEmail(emailPattern.test(email));
        setValidPassword(pwdPattern.test(password));
        setUserSubmit(true)
    }

    return (
        <Typography>
            <Container disableGutters={true} maxWidth="md" sx={{ color: "text.primary", typography: "menu" }}>
                <form className='su-form-container'>
                    {/* FName input */}
                    <label htmlFor="fname" color='text.primary'>First Name</label>
                    <input
                        type='text'
                        placeholder='Enter Name'
                        name='fname'
                        maxLength={30}
                        required
                        ref={firstName}
                        autoComplete="given-name"
                        className='su-input-field'
                    />
                    {/* LName input */}
                    <label htmlFor="lname" color='text.primary'>Last Name</label>
                    <input
                        type='text'
                        placeholder='Enter Last Name'
                        name='lname'
                        maxLength={30}
                        required
                        ref={lastName}
                        autoComplete="family-name"
                        className='su-input-field'
                    />
                    {/* Email input */}
                    <label htmlFor="email" color='text.primary'>Email</label>
                    <input
                        type='email'
                        placeholder='Enter Email'
                        name='email'
                        onChange={handleEmail}
                        value={email}
                        required
                        className='su-input-field'
                    />
                    {/* Username input */}
                    <label htmlFor="username" color='text.primary'>Username</label>
                    <input
                        type='username'
                        placeholder='Enter Username'
                        name='username'
                        required
                        ref={username}
                        className='su-input-field'
                    />
                    {/* Password input */}
                    <label htmlFor={"psw"}>Password</label>
                    <div className='pwd-container'>
                        <input
                            type={type}
                            placeholder='Enter Password'
                            name={"psw"}
                            maxLength={12}
                            required
                            autoComplete='new-password'
                            className='su-input-field'
                            value={password}
                            onChange={handlepwd}
                        />
                        <span className='visible-toggle' onClick={handleToggle}>
                            {icon}
                        </span>
                    </div>

                    {/* Re-enter Password input */}
                    <label htmlFor="repsw">Re-enter Password</label>
                    <input
                        type={type}
                        placeholder='Re-enter Password'
                        name='repsw'
                        maxLength={12}
                        required
                        onChange={pwdIsSame}
                        className='su-input-field' />
                </form>
            </Container>
            <span style={{ textAlign: "center" }}><p style={{ fontSize: "12px", color: "#faf8f6" }}>Have an account with us? Click <a href='/login'>here</a> to login.</p></span>
            <button onClick={handleSubmit} type='submit' className='reg-btn'>Register</button>
            <ToastContainer limit={1} />
        </Typography>
    )
}

export default SignUpForm