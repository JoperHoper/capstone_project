import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { loading: true, boardArr: [], error: '' }

export const fetchFavouriteBoard =
    createAsyncThunk("fetchFavouriteBoard", async (input) => {
        return axios.get("http://localhost:8000/board/get",
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

const favouriteBoardSlice = createSlice({
    name: "favouriteBoard",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchFavouriteBoard.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchFavouriteBoard.fulfilled, (state, action) => {
            state.loading = false
            state.boardArr = action.payload
            state.error = ""
        })
        builder.addCase(fetchFavouriteBoard.rejected, (state, action) => {
            state.loading = false
            state.boardArr = []
            state.error = action.error
        })
    }
})

export default favouriteBoardSlice.reducer