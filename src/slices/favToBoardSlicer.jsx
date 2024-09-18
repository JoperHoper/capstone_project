import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { loading: true, favInBoardArr: [], error: '' }

export const fetchFavInBoard =
    createAsyncThunk("fetchFavInBoard", async (input) => {
        return axios.get("http://localhost:8000/board_favourite/get",
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

const favToBoardSlice = createSlice({
    name: "favsInBoard",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchFavInBoard.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchFavInBoard.fulfilled, (state, action) => {
            state.loading = false
            state.favInBoardArr = action.payload
            state.error = ""
        })
        builder.addCase(fetchFavInBoard.rejected, (state, action) => {
            state.loading = false
            state.favInBoardArr = []
            state.error = action.error
        })
    }
})

export default favToBoardSlice.reducer