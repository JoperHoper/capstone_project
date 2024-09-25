import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { loading: true, favArr: [], error: '' }

export const deleteFavourites =
    createAsyncThunk("deletefavourites", async (input) => {
        return axios.post("http://localhost:8000/favourite/delete",
            {
                favouriteId: input.favouriteId
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

const deleteFavouriteSlice = createSlice({
    name: "deleteFavourites",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(deleteFavourites.pending, (state) => {
            state.loading = true
        })
        builder.addCase(deleteFavourites.fulfilled, (state, action) => {
            state.loading = false
            state.favArr = action.payload
            state.error = ""
        })
        builder.addCase(deleteFavourites.rejected, (state, action) => {
            state.loading = false
            state.favArr = []
            state.error = action.error
        })
    }
})

export default deleteFavouriteSlice.reducer
