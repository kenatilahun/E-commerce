import {configureStore} from "@reduxjs/toolkit"
import { baseApiSlice } from "./ApiSlices/baseApiSlice"
import authReducer from "./featureSlices/authSlice"

export const store=configureStore({
    reducer:{
        [baseApiSlice.reducerPath]:baseApiSlice.reducer,
        auth:authReducer,

    },middleware:(getDefaultMiddleware) =>
  getDefaultMiddleware().concat(baseApiSlice.middleware),

    // Optional middleware, devTools config, etc.
}) 
export default store;