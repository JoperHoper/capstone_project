import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { loading: true, favArr: [], error: '' }


export const createFavourites =
    createAsyncThunk("createfavourites", async (input) => {
        console.log(input)
        return axios.post("http://localhost:8000/favourite/create",
            {
                movieId: input.movieId
            },
            {
                headers: {
                    Authorization: 'Bearer ' + input.accessToken //the token is a variable which holds the token
                }
            }
        )
            .then((res) => {
                return res.data.data
            })
            .catch((error) => {
                return error.status
            })
    })

const createFavouriteSlice = createSlice({
    name: "createFavourite",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(createFavourites.pending, (state) => {
            state.loading = true
        })
        builder.addCase(createFavourites.fulfilled, (state, action) => {
            state.loading = false
            state.favArr = action.payload
            state.error = ""
        })
        builder.addCase(createFavourites.rejected, (state, action) => {
            state.loading = false
            state.favArr = []
            state.error = action.error
        })
    }
})

export default createFavouriteSlice.reducer

