import Homepage from './components/Homepage'
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme/ThemeComponent';
import Login from './components/Login';
import SignUp from './components/Signup';
import ViewAll from './components/ViewAll';
import MovieRequest from './components/MovieRequest';
import Account from './components/Account';
import Randomizer from './components/Randomizer';
import Favourites from './components/Favourites';
import Board from './components/Board';
import About from './components/About';
import MovieDetails from './components/MovieDetails';

function App() {

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='view-all' element={<ViewAll />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='movie-request' element={<MovieRequest />} />
        <Route path='account' element={<Account />} />
        <Route path='randomizer' element={<Randomizer />} />
        <Route path='favourites' element={<Favourites />} />
        <Route path='about' element={<About />} />
        <Route path='favourites/board/*' element={<Board />} />
        <Route path='movie/*' element={<MovieDetails />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
