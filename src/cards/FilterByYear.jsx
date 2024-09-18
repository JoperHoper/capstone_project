import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies } from '../slices/movie'
import { Box, Container, Typography } from '@mui/material'
import { fetchFavourites } from '../slices/favourite'
import { createFavourites } from '../slices/createFavourite'
import useLocalStorage from "../hook/useLocalStorage";
import { FavoriteBorder, Favorite } from '@mui/icons-material'
import { useNavigate } from "react-router-dom";
import "../css/filteredCards.css"

function FilterByYear() {
    const dispatch = useDispatch();
    const movie = useSelector((state) => state.movie)
    const favourite = useSelector((state) => state.favourite)
    const createFavourite = useSelector((state) => state.createFavourite)
    const [currentIndex, setCurrentIndex] = useState(0);
    const [favoriteMap, setFavoriteMap] = useState({})
    const [accessToken, setAccessToken] = useLocalStorage("accessToken", "");
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchMovies())
        dispatch(fetchFavourites({ accessToken: accessToken }))
    }, [])

    useEffect(() => {
        setUpFavouriteMap()
    }, [favourite])

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
        if (favourite?.favArr?.length > 0) {
            let temp = {}
            favourite?.favArr?.map((data) => {
                temp[data.movieId] = true
            })
            setFavoriteMap(temp)
        }
    }

    const handleFavourite = (e) => {
        const movieId = parseInt(e.currentTarget.dataset.id)
        console.log(e)
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
        console.log("movie:", movieId)
        if (favoriteMap[movieId]) {
            return <Favorite data-id={movieId} color='primary' onClick={handleFavourite} />
        }
        else {
            return <FavoriteBorder data-id={movieId} color='primary' onClick={handleFavourite} />
        }
    }


    let filteredArr = movie.movieArr.filter(({ releaseDate }) => {
        return releaseDate.slice(0, 4) >= 2000 && releaseDate.slice(0, 4) <= 2005
    })

    const handleFilteredCards = () => {
        const handleNext = () => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredArr.length);
        };

        const handlePrev = () => {
            setCurrentIndex((prevIndex) => (prevIndex - 1 + filteredArr.length) % filteredArr.length);
        };

        if (currentIndex > filteredArr.length - 5) {
            // console.log(currentIndex)
            setCurrentIndex(0)
            // console.log("hi")
        }

        return (
            <div className='card-slider'>
                <div className='card-wrapper'>
                    {filteredArr.slice(currentIndex, currentIndex + 5).map((card, index) => (
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
                <h1>In the 20's</h1>
            </Typography>
            {movie.loading ? <div>Loading...</div> :
                handleFilteredCards()
            }
        </Container>
    )
}

export default FilterByYear;

