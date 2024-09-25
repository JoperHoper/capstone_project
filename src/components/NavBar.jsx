import { Typography, Box, Drawer, Button, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, } from '@mui/material'
import Grid from '@mui/material/Grid2';
import { Menu, Search, AccountCircle } from '@mui/icons-material';
import logo from "../assets/jpmovie_logo_cropped_white.png"
import appIcon from "../assets/jpmovie_icon_cropped_white.png"
import React from 'react'
import "../css/navbar.css"
import Link from '@mui/material/Link';
import useLocalStorage from "../hook/useLocalStorage.jsx"
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies } from '../slices/movie'

function NavBar() {
    const [accessToken, setAccessToken] = useLocalStorage("accessToken", "");
    const [searchResult, setSearchResult] = useState([]);
    const dispatch = useDispatch();
    const movie = useSelector((state) => state.movie)
    const searchRef = useRef()
    const searchDrop = useRef()
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchMovies())
    }, [])

    const handleSearch = () => {
        if (searchRef.current.value.length > 0) {
            let OGsearch = searchDrop.current.className
            if (OGsearch.includes("hidden")) {
                searchDrop.current.className = OGsearch.replace("hidden", "")
                searchDrop.current.className = searchDrop.current.className.trim()
            }
            if (movie && movie.movieArr && Array.isArray(movie.movieArr)) {
                let filteredSearch = movie.movieArr.filter((movieItem) => {
                    return movieItem.movieTitle.toLowerCase().includes(searchRef.current.value)
                })
                setSearchResult(filteredSearch)
            }
        } else {
            let OGsearch = searchDrop.current.className
            if (!OGsearch.includes("hidden")) {
                searchDrop.current.className = OGsearch + " hidden"
            }
        }
    }

    const viewMovieDetails = (e) => {
        navigate("/movie/" + e.currentTarget.id)
        window.location.reload()
    }

    const displaySearchResult = () => {
        if (searchResult.length > 0) {
            return searchResult.slice(0, 5).map((searchItem, index) => {
                return (
                    <>
                        <div key={index} id={searchItem.movieId} onClick={viewMovieDetails} className='search-result'>
                            <img src={searchItem.posterUrl} className='search-result-img' />
                            <h3>{searchItem.movieTitle}</h3>
                        </div>
                        <Divider />
                    </>
                )
            })
        }
        else {
            return <div>No Match Found</div>
        }
    }

    const handleProfileDisplay = () => {
        if (accessToken !== "") {
            return <a href='/account'><AccountCircle /></a>
        }
        else {
            return <Link underline='none' href="/login" color={'inherit'}>Login</Link>
        }
    }

    return (
        <div>
            <Grid container spacing={4} columns={16} sx={{ height: "10vh" }} >
                <Grid display={'flex'} justifyContent={"center"} alignItems={'center'} size={3} className="nav-logo-container">
                    <a href='/'><img className='logo' src={logo} href="/" /></a>
                    <img className='app-icon' src={appIcon} />
                </Grid>
                <Grid display={'flex'} justifyContent={"flex-start"} alignItems={'center'} size={1}>
                    <TemporaryDrawer />
                </Grid>
                <Grid display={'flex'} flexDirection={"column"} justifyContent={"center"} alignItems={'center'} size={8} className="nav-searchbar-container">
                    <div className="nav-searchbar">
                        <span><Search /></span>
                        <input ref={searchRef} onChange={handleSearch} name='searchBar' type='search' placeholder='Find a movie...' id='searchBar' />
                    </div>
                    <div className='search-dropdown hidden' ref={searchDrop}>
                        {displaySearchResult()}
                    </div>
                </Grid>
                <Grid display={'flex'} justifyContent={"space-evenly"} alignItems={"center"} size={4}>
                    <Typography variant='menu' color='text.primary'>
                        <Link underline='none' href="/favourites" color={'inherit'}>Favourites</Link>
                    </Typography>
                    <span className='vl' />
                    <Typography variant='menu' color='text.primary'>
                        {handleProfileDisplay()}
                    </Typography>
                </Grid>
            </Grid>
            <hr />
        </div >
    )
}

function TemporaryDrawer() {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    let drawerRoute = [
        "View All",
        "Movie Submission",
        'I\'m Feeling...',
        'About',
        'Sign up'
    ]

    const routing = (e) => {
        switch (e.currentTarget.id) {
            case "view-all":
                navigate("/view-all")
                break;
            case "movie-submission":
                navigate("/movie-request")
                break;
            case "i-m-feeling-":
                navigate("/randomizer")
                break;
            case "sign-up":
                navigate("/signup")
                break;
            case "about":
                navigate("/about")
                break;
        }
    }

    const DrawerList = (
        <Box className="drawer-container" role="presentation" onClick={toggleDrawer(false)}>
            <Typography>
                <List>
                    {drawerRoute.slice(0, 3).map((text, index) => (
                        <ListItem key={index} variant="menu" disablePadding>
                            <ListItemButton id={text.replace(new RegExp(/[\s\'.]+/g), "-").toLowerCase()} onClick={routing}>
                                <ListItemText primary={text} color='secondary.main' />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {drawerRoute.slice(3).map((text, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemButton id={text.replace(new RegExp(/[\s\'.]+/g), "-").toLowerCase()} onClick={routing}>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Typography>
        </Box>
    );

    return (
        <div>
            <Button onClick={toggleDrawer(true)}><Menu /></Button>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}

export default NavBar