import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies } from '../slices/movie'
import { Box, Container, Typography } from '@mui/material'
import "../css/filteredCards.css"

function FilterByGenre() {
    const dispatch = useDispatch();
    const movie = useSelector((state) => state.movie)
    const [currentIndex, setCurrentIndex] = useState(0);
    let filteredByGenre = [];

    useEffect(() => {
        dispatch(fetchMovies())
    }, [])

    for (let i = 0; i < movie.movieArr.length; i++) {
        for (let j = 0; j < movie.movieArr[i].genres.length; j++) {
            if (movie.movieArr[i].genres[j].genre === "Action") {
                filteredByGenre.push(movie.movieArr[i])
            }
        }
    }

    // console.log(filteredByGenre)

    const handleFilteredCards = () => {
        const handleNext = () => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredByGenre.length);
        };

        const handlePrev = () => {
            setCurrentIndex((prevIndex) => (prevIndex - 1 + filteredByGenre.length) % filteredByGenre.length);
        };

        if (currentIndex > filteredByGenre.length - 5) {
            setCurrentIndex(0)
        }

        return (
            <div className='card-slider'>
                <div className='card-wrapper'>
                    {filteredByGenre.slice(currentIndex, currentIndex + 5).map((card, index) => (
                        <div className='card' key={index}>
                            <img className='' src={card.posterUrl} alt="Card" />
                            <span>
                                <Typography variant='text.primary'>
                                    <Box className="trailer-btn">
                                        <a target='blank' href={card.trailerUrl}>Watch Trailer</a>
                                    </Box>
                                </Typography>
                            </span>
                            <Typography variant='typography.p' color='text.primary'>
                                <h4>{card.movieTitle}</h4>
                                <p>{card.language}</p>
                            </Typography>
                        </div>
                    ))}
                </div>
                <div className="cards-btn-container" style={{ display: "flex", justifyItems: "center", justifyContent: "space-between", position: "relative", top: "-200px" }}>
                    <button className='btn-left' onClick={handlePrev}>&lt;</button>
                    <button className='btn-right' onClick={handleNext}>&gt;</button>
                </div>
            </div>
        )
    }

    return (
        <Container maxWidth="false" sx={{ minHeight: "40vh", border: "1px solid red", marginTop: "20px", width: "100%" }}>
            <Typography variant='typography.menu' color='text.primary'>
                <h1>Classic in Action</h1>
            </Typography>
            {movie.loading ? <div>Loading...</div> :
                handleFilteredCards()
            }
        </Container>
    )
}

export default FilterByGenre