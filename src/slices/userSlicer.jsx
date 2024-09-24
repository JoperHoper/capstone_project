import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = { loading: true, userArr: [], error: '' }

export const fetchUser =
    createAsyncThunk("fetchUser", async (input) => {
        return axios.get("http://localhost:8000/user/get_by_id", {
            headers: {
                Authorization: 'Bearer ' + input.accessToken //the token is a variable which holds the token
            }
        })
            .then((res) => {
                console.log(res)
                return res.data.data
            })
            .catch((error) => {
                return error.status
            })
    })

const userSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.loading = false
            state.userArr = action.payload
            state.error = ""
        })
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.loading = false
            state.userArr = []
            state.error = action.error.message
        })
    }
})

export default userSlice.reducer