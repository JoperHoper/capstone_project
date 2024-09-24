import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = { loading: true, userArr: [], error: '' }

export const updateCurrentUser =
    createAsyncThunk("updateCurrentUser", async (input) => {
        console.log(input)
        return axios.post("http://localhost:8000/user/update",
            {
                bio: input.bio,
                name: input.name,
                email: input.email,
                dob: input.dob
            },
            {
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

const updateUserSlice = createSlice({
    name: "updateUser",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(updateCurrentUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(updateCurrentUser.fulfilled, (state, action) => {
            state.loading = false
            state.userArr = action.payload
            state.error = ""
        })
        builder.addCase(updateCurrentUser.rejected, (state, action) => {
            state.loading = false
            state.userArr = []
            state.error = action.error.message
        })
    }
})

export default updateUserSlice.reducer