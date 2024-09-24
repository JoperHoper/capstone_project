import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = { loading: true, movieItem: {}, error: '' }

export const fetchMovieById =
    createAsyncThunk("fetchMovieById", async (input) => {
        console.log(input)
        return axios.get("http://localhost:8000/movie/get_by_id",
            {
                params: {
                    movieId: input.movieId
                }
            }
        )
            .then((res) => {
                console.log(res)
                let movie = res.data.data
                movie.releaseDate = new Date(movie.releaseDate)
                movie.releaseDate = movie.releaseDate.getFullYear() + "/" + movie.releaseDate.getMonth() + "/" + movie.releaseDate.getDate();
                return res.data.data
            })
    })

const movieByIdSlice = createSlice({
    name: "movieById",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchMovieById.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchMovieById.fulfilled, (state, action) => {
            state.loading = false
            state.movieItem = action.payload
            state.error = ""
        })
        builder.addCase(fetchMovieById.rejected, (state, action) => {
            state.loading = false
            state.movieItem = {}
            state.error = action.error.message
        })
    }
})

export default movieByIdSlice.reducer;