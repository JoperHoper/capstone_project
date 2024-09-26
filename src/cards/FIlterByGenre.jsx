import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies } from '../slices/movie'
import { fetchFavourites } from '../slices/favourite'
import { deleteFavourites } from '../slices/deleteFavourite'
import { createFavourites } from '../slices/createFavourite'
import { Box, Container, Typography } from '@mui/material'
import { FavoriteBorder, Favorite } from '@mui/icons-material'
import useLocalStorage from "../hook/useLocalStorage";
import { useNavigate } from "react-router-dom";
import "../css/filteredCards.css"

function FilterByGenre() {
    const dispatch = useDispatch();
    // Using slicer state
    const favourite = useSelector((state) => state.favourite)
    const createFavourite = useSelector((state) => state.createFavourite)
    const movie = useSelector((state) => state.movie)

    const [favoriteMap, setFavoriteMap] = useState({})
    const [movieToFavouriteMap, setMovieToFavouriteMap] = useState({})
    const [accessToken, setAccessToken] = useLocalStorage("accessToken", "");
    const [currentIndex, setCurrentIndex] = useState(0);

    let filteredByGenre = [];
    const navigate = useNavigate();

    // Dispatch movies and favourite slicer
    useEffect(() => {
        dispatch(fetchMovies())
        dispatch(fetchFavourites({ accessToken: accessToken }))
    }, [])

    // Initialising favourite map, only re-render when new favourite is added
    useEffect(() => {
        setUpFavouriteMap()
    }, [favourite])

    // Filtering movies
    const populateMovie = () => {
        if (movie && movie.movieArr && Array.isArray(movie.movieArr)) {
            for (let i = 0; i < movie.movieArr.length; i++) {
                for (let j = 0; j < movie.movieArr[i].genres.length; j++) {
                    if (movie.movieArr[i].genres[j].genre === "Action") {
                        filteredByGenre.push(movie.movieArr[i])
                    }
                }
            }
        }
    }

    // Check if user is logged in before favourite. Route to login page if no
    useEffect(() => {
        if (createFavourite.favArr === 403) {
            setAccessToken("")
            setTimeout(() => {
                navigate("/login")
            }, 500)
        }
    }, [createFavourite])

    const setUpFavouriteMap = () => {
        // Check if object is available
        if (favourite && favourite.favArr && Array.isArray(favourite.favArr)) {
            if (favourite?.favArr?.length > 0) {
                let favMovieMap = {}
                let movieToFavMap = {}
                favourite?.favArr?.map((data) => {
                    favMovieMap[data.movieId] = true
                    movieToFavMap[data.movieId.toString()] = data.favouriteId
                })
                setFavoriteMap(favMovieMap)
                setMovieToFavouriteMap(movieToFavMap)
            }
        }
    }

    // Handling favourite logic
    const handleFavourite = (e) => {
        const movieId = parseInt(e.currentTarget.dataset.id)
        let latestFavMap = { ...favoriteMap }
        if (!latestFavMap[movieId]) {
            latestFavMap[movieId] = true
            dispatch(createFavourites({ movieId: movieId, accessToken: accessToken }))
        } else {
            latestFavMap[movieId] = !latestFavMap[e.currentTarget.dataset.id]
            console.log(!latestFavMap[e.currentTarget.dataset.id])
            if (latestFavMap[movieId]) {
                dispatch(createFavourites({ movieId: movieId, accessToken: accessToken }))
            }
            else {
                if (movieToFavouriteMap) {
                    let favouriteId = movieToFavouriteMap[movieId]
                    dispatch(deleteFavourites({ favouriteId: favouriteId, accessToken: accessToken }))

                    let updatedFavMap = movieToFavouriteMap
                    updatedFavMap[movieId] = undefined
                    setMovieToFavouriteMap(updatedFavMap)
                    setFavoriteMap(latestFavMap)
                }
            }
        }
        setFavoriteMap(latestFavMap)
    }

    // Toggle between icons
    const favouriteIcon = (movieId) => {
        if (favoriteMap[movieId]) {
            return <Favorite data-id={movieId} color='primary' onClick={handleFavourite} />
        }
        else {
            return <FavoriteBorder data-id={movieId} color='primary' onClick={handleFavourite} />
        }
    }

    const viewMovieDetails = (e) => {
        navigate("/movie/" + e.currentTarget.id)
    }

    // Mapping movie cards
    const handleFilteredGenre = () => {
        if (filteredByGenre && Array.isArray(filteredByGenre)) {
            return filteredByGenre.slice(currentIndex, currentIndex + 5).map((card, index) => (
                <div className='card' key={index}>
                    <span style={{ zIndex: "10", position: "absolute" }}>
                        {favouriteIcon(card.movieId)}
                    </span>
                    <img className='' src={card.posterUrl} alt="Card" id={card.movieId} onClick={viewMovieDetails} />
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

    // Arrow to scroll cards
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
                <div className="cards-btn-container">
                    <button className='btn-left' onClick={handlePrev}>&lt;</button>
                    <button className='btn-right' onClick={handleNext}>&gt;</button>
                </div>
            </div>
        )
    }

    return (
        <Container className='cards-container' maxWidth="false">
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