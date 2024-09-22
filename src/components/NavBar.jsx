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

function NavBar() {
    const [accessToken, setAccessToken] = useLocalStorage("accessToken", "");

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
                <Grid display={'flex'} justifyContent={"center"} alignItems={'center'} size={3} style={{ border: "1px solid red" }}>
                    <a href='/'><img className='logo' style={{ height: "60px", width: "120px" }} src={logo} href="/" /></a>
                    <img className='app-icon' style={{ height: "50px", width: "50px" }} src={appIcon} />
                </Grid>
                <Grid display={'flex'} justifyContent={"flex-start"} alignItems={'center'} size={1} style={{ border: "1px solid red" }}>
                    <TemporaryDrawer />
                </Grid>
                <Grid display={'flex'} justifyContent={"center"} alignItems={'center'} size={8} style={{ border: "1px solid red" }}>
                    <div style={{ alignItems: "center", display: "flex", borderRadius: "8px", backgroundColor: "white", border: "1px solid yellow", width: "80%", padding: "6px 5px" }}>
                        <span style={{ margin: "0px" }}><Search /></span>
                        <input name='searchBar' type='search' placeholder='Find a movie...' id='searchBar' />
                    </div>
                </Grid>
                <Grid display={'flex'} justifyContent={"space-evenly"} alignItems={"center"} size={4} style={{ border: "1px solid red" }}>
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
        </div>
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

    const routing = () => {
        console.log("here")
        for (let i = 0; i < drawerRoute.length; i++) {
            if (drawerRoute[i] === "View All") {
                navigate("/view-all")
            }
            if (drawerRoute[i] === "Movie Submission") {
                navigate("/movie-request")
            }
            if (drawerRoute[i] === "I\'m Feeling...") {
                navigate("/randomizer")
            }
            if (drawerRoute[i] === "Sign up") {
                navigate("/signup")
            }
        }
    }

    const DrawerList = (
        <Box sx={{ width: 300, backgroundColor: "#2F2E4F", paddingTop: "50px", height: "100%" }} role="presentation" onClick={toggleDrawer(false)}>
            <Typography>
                <List>
                    {drawerRoute.slice(0, 3).map((text, index) => (
                        <ListItem key={index} variant="menu" disablePadding>
                            <ListItemButton onClick={routing}>
                                <ListItemText primary={text} color='secondary.main' />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {drawerRoute.slice(3).map((text, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemButton onClick={routing}>
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