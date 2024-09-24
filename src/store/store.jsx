import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "../slices/movie";
import favouriteSlice from "../slices/favourite";
import createFavouriteSlice from "../slices/createFavourite";
import favouriteBoardSlicer from "../slices/favouriteBoardSlicer";
import favToBoardSlicer from "../slices/favToBoardSlicer";
import userSlicer from "../slices/userSlicer";
import updateUserSlicer from "../slices/updateUserSlicer";
import movieByIdSlicer from "../slices/movieByIdSlicer";


export const store = configureStore({
    reducer: {
        movie: movieSlice,
        favourite: favouriteSlice,
        createFavourite: createFavouriteSlice,
        favouriteBoard: favouriteBoardSlicer,
        favToBoard: favToBoardSlicer,
        user: userSlicer,
        updateUser: updateUserSlicer,
        movieById: movieByIdSlicer
    }
})