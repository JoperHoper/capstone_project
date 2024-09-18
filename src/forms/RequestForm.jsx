import { Box, Container, Typography } from '@mui/material'
import "../css/movie-request.css"
import React, { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function RequestForm() {
    return (
        <Container disableGutters={true} maxWidth="lg" className='request-form-container'>
            <Typography >
                <Box sx={{ color: "text.primary", typography: "heading" }}>
                    <h1>Movie Request</h1>
                </Box>
            </Typography>
            <MovieRequest />
            <ToastContainer />
        </Container>
    )
}

function MovieRequest() {
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [date, setDate] = useState("");

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
        console.log(e.target.value)
    }


    const handleSubmit = () => {
        if (title && genre && date) {
            console.log(title)
            console.log(genre)
            console.log(date)
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
        <Typography>
            <Container disableGutters={true} maxWidth="md" sx={{ color: "text.primary", typography: "menu" }} >
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
                        required
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
            </ Container>
            <button onClick={handleSubmit} type='submit' className='request-btn'>Submit</button>
        </Typography>
    )
}

export default RequestForm