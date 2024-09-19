import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "../slices/movie";
import favouriteSlice from "../slices/favourite";
import createFavouriteSlice from "../slices/createFavourite";
import favouriteBoardSlicer from "../slices/favouriteBoardSlicer";
import favToBoardSlicer from "../slices/favToBoardSlicer";

export const store = configureStore({
    reducer: {
        movie: movieSlice,
        favourite: favouriteSlice,
        createFavourite: createFavouriteSlice,
        favouriteBoard: favouriteBoardSlicer,
        favToBoard: favToBoardSlicer
    }
})