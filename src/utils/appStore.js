import { configureStore } from "@reduxjs/toolkit";
import  userReducer  from "./userSlice";
import  userFeed from "./feedSlice"
import userConnection from "./connectionSlice"

const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: userFeed,
        connection: userConnection,
    },
})

export default appStore;