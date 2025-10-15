import { configureStore } from "@reduxjs/toolkit";
import  userReducer  from "./userSlice";
import  userFeed from "./feedSlice"

const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: userFeed,
    },
})

export default appStore;