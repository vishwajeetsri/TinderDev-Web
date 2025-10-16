import { configureStore } from "@reduxjs/toolkit";
import  userReducer  from "./userSlice";
import  userFeed from "./feedSlice"
import userConnection from "./connectionSlice"
import userRequest from "./requestSlice"

const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: userFeed,
        connection: userConnection,
        requests: userRequest
    },
})

export default appStore;