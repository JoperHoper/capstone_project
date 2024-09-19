import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies } from '../slices/movie'
import { fetchFavourites } from '../slices/favourite'
import { createFavourites } from '../slices/createFavourite'
import { Box, Container, Typography } from '@mui/material'
import { FavoriteBorder, Favorite } from '@mui/icons-material'
import useLocalStorage from "../hook/useLocalStorage";
import "../css/filteredCards.css"

function FilterByGenre() {
    const dispatch = useDispatch();
    const favourite = useSelector((state) => state.favourite)
    const createFavourite = useSelector((state) => state.createFavourite)
    const movie = useSelector((state) => state.movie)
    const [favoriteMap, setFavoriteMap] = useState({})
    const [accessToken, setAccessToken] = useLocalStorage("accessToken", "");
    const [currentIndex, setCurrentIndex] = useState(0);
    let filteredByGenre = [];

    useEffect(() => {
        dispatch(fetchMovies())
        dispatch(fetchFavourites({ accessToken: accessToken }))
    }, [])

    useEffect(() => {
        setUpFavouriteMap()
    }, [favourite])

    const populateMovie = () => {
        if (movie && movie.movieArr && Array.isArray(movie.movieArr)) {
            for (let i = 0; i < movie.movieArr.length; i++) {
                for (let j = 0; j < movie.movieArr[i].genres.length; j++) {
                    if (movie.movieArr[i].genres[j].genre === "Action") {
                        console.log(movie.movieArr[i].genres[j].genre)
                        filteredByGenre.push(movie.movieArr[i])
                    }
                }
            }
        }
    }

    useEffect(() => {
        console.log(createFavourite)
        if (createFavourite.favArr === 403) {
            setAccessToken("")
            setTimeout(() => {
                navigate("/login")
            }, 500)
        }
    }, [createFavourite])

    const setUpFavouriteMap = () => {
        if (favourite && favourite.favArr && Array.isArray(favourite.favArr)) {
            if (favourite?.favArr?.length > 0) {
                let temp = {}
                favourite?.favArr?.map((data) => {
                    temp[data.movieId] = true
                })
                setFavoriteMap(temp)
            }
        }
    }

    const handleFavourite = (e) => {
        const movieId = parseInt(e.currentTarget.dataset.id)
        let latestFavMap = { ...favoriteMap }
        if (!latestFavMap[movieId]) {
            latestFavMap[movieId] = true
            dispatch(createFavourites({ movieId: movieId, accessToken: accessToken }))
        } else {
            latestFavMap[movieId] = !latestFavMap[e.currentTarget.dataset.id]
            if (latestFavMap[movieId]) {
                dispatch(createFavourites({ movieId: movieId, accessToken: accessToken }))
            }
        }
        setFavoriteMap(latestFavMap)
    }

    const favouriteIcon = (movieId) => {
        if (favoriteMap[movieId]) {
            return <Favorite data-id={movieId} color='primary' onClick={handleFavourite} />
        }
        else {
            return <FavoriteBorder data-id={movieId} color='primary' onClick={handleFavourite} />
        }
    }

    const handleFilteredGenre = () => {
        if (filteredByGenre && Array.isArray(filteredByGenre)) {
            return filteredByGenre.slice(currentIndex, currentIndex + 5).map((card, index) => (
                <div className='card' key={index}>
                    <span style={{ zIndex: "10", position: "absolute", border: "2px solid red" }}>
                        {favouriteIcon(card.movieId)}
                    </span>
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
            ))
        }
        else {
            return <div></div>
        }
    }

    const handleFilteredCards = () => {
        const handleNext = () => {
            if (currentIndex === filteredByGenre.length - 1) {
                setCurrentIndex(0)
            }
            else {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredByGenre.length);
            }
        };

        const handlePrev = () => {
            if (currentIndex == 0) {
                setCurrentIndex(filteredByGenre.length - 1)
            }
            else {
                setCurrentIndex((prevIndex) => (prevIndex - 1 + filteredByGenre.length) % filteredByGenre.length);
            }
        };

        if (filteredByGenre.length === 0) {
            populateMovie()
        }

        return (
            <div className='card-slider'>
                <div className='card-wrapper'>
                    {handleFilteredGenre()}
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