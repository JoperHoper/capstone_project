import Homepage from './components/Homepage'
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme/ThemeComponent';

function App() {

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path='/' element={<Homepage />}></Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App
