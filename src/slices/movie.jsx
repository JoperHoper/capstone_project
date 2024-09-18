import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = { loading: true, movieArr: [], error: '' }

export const fetchMovies =
    createAsyncThunk("fetchMovies", async () => {
        return axios.get("http://localhost:8000/movie/get")
            .then((res) => {
                for (let i = 0; i < res.data.data.length; i++) {
                    let movie = res.data.data[i]
                    movie.releaseDate = new Date(movie.releaseDate)
                    movie.releaseDate = movie.releaseDate.getFullYear() + "/" + movie.releaseDate.getMonth() + "/" + movie.releaseDate.getDate();
                }
                return res.data.data
            })
    })

const movieSlice = createSlice({
    name: "movie",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchMovies.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.loading = false
            state.movieArr = action.payload
            state.error = ""
        })
        builder.addCase(fetchMovies.rejected, (state, action) => {
            state.loading = false
            state.movieArr = []
            state.error = action.error.message
        })
    }
})

export default movieSlice.reducer;