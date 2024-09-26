import React, { useState } from 'react'
import { Box, Container, Typography } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../css/movie-request.css"

function RequestForm() {
    return (
        <Container disableGutters={true} maxWidth="lg" className='request-form-container'>
            <Typography color="text.primary" variant="typography.heading" >
                <h1 style={{ textAlign: "center" }}>Movie Request</h1>
                <Box sx={{ display: "flex", flexDirection: "column", height: "80vh" }}>
                    {MovieRequest()}
                </Box>
            </Typography>
            <ToastContainer limit={2} />
        </Container>
    )
}

function MovieRequest() {
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [date, setDate] = useState("");
    const [cast, setCast] = useState("");
    const [director, setDirector] = useState("");

    // Genre dropdown
    const AllGenre = () => {
        const movieGenres = ["Horror", "Drama", "Comedy", "Action", "Romance", "Thriller", "Science Fiction", "Western", "Crime", "Animation", "Fantasy", "Historical", "Indie", "Documentary", "Musical", "Romance", "Others"];

        let genre = movieGenres.map((data, i) => {
            return (<option key={i} value={data}>{data}</option>)
        })
        return genre
    }

    const success = () => {
        toast.success("Submitted");
    };

    const formError = () => {
        toast.error("Unsuccessful, please retry");
        setTimeout(() => {
            toast.clearWaitingQueue();
        }, 1000);
    };

    const handleTitleInput = (e) => {
        setTitle(e.target.value);
    }

    const handleCastInput = (e) => {
        setCast(e.target.value);
    }

    const handleDirectorInput = (e) => {
        setDirector(e.target.value);
    }


    const handleSubmit = () => {
        if (title && genre && date) {
            setDate("")
            setTitle("")
            setGenre({ selected: "" })
            success();
        }
        else {
            formError();
        }
    }

    return (
        <Box sx={{ height: "inherit" }}>
            <Typography>
                <form className='rq-form-container'>
                    {/* Title Input */}
                    <label htmlFor='title' color='text.primary'>Movie Title</label>
                    <input
                        type='text'
                        placeholder='Enter Movie Title'
                        name='title'
                        value={title}
                        maxLength={50}
                        onChange={handleTitleInput}
                        className='request-field'
                    />
                    {/* Cast Input */}
                    <label htmlFor='cast' color='text.primary'>Casts</label>
                    <textarea
                        type='text'
                        placeholder='Enter Casts Name'
                        name='cast'
                        value={cast}
                        maxLength={50}
                        onChange={handleCastInput}
                        multiple
                        className='request-field'
                    />
                    {/* Director Input */}
                    <label htmlFor='director' color='text.primary'>Director</label>
                    <textarea
                        type='text'
                        placeholder='Enter Director Name'
                        name='director'
                        value={director}
                        maxLength={50}
                        onChange={handleDirectorInput}
                        required
                        multiple
                        className='request-field'
                    />
                    {/* Genre Input */}
                    <label htmlFor='genre'>Genre</label>
                    <select name='genre' required className='request-field' onChange={(e) => setGenre(e.target.value)}>
                        <option disabled selected>Select a Genre</option>
                        {AllGenre()}
                    </select>
                    {/* Release Date Input */}
                    <label htmlFor='date'>Release Date</label>
                    <input name='date' type='date' required className='request-field' onChange={(e) => setDate(e.target.value)} />
                </form>
            </Typography>
            <Box sx={{ minHeight: "10vh" }}>
                <button onClick={handleSubmit} type='submit' className='request-btn'>Submit</button>
            </Box>
        </ Box>
    )
}

export default RequestForm