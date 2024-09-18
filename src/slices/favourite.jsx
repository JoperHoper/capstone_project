import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { loading: true, movieArr: [], error: '' }

export const fetchFavourites =
    createAsyncThunk("fetchFavourites", async (input) => {
        return axios.get("http://localhost:8000/favourite/get",
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
                return error.message
            })
    })

const favouriteSlice = createSlice({
    name: "favourite",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchFavourites.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchFavourites.fulfilled, (state, action) => {
            console.log("hehe")
            state.loading = false
            state.favArr = action.payload
            state.error = ""
        })
        builder.addCase(fetchFavourites.rejected, (state, action) => {
            state.loading = false
            state.favArr = []
            state.error = action.error.message
        })
    }
})

export default favouriteSlice.reducer

