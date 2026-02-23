import {configureStore} from "@reduxjs/toolkit"
import { baseApiSlice } from "./ApiSlices/baseApiSlice"
import authReducer from "./featureSlices/authSlice"
import cartReducer from "./featureSlices/cartSlice"

export const store=configureStore({
    reducer:{
        [baseApiSlice.reducerPath]:baseApiSlice.reducer,
        auth:authReducer,
        cart: cartReducer,

    },middleware:(getDefaultMiddleware) =>
  getDefaultMiddleware().concat(baseApiSlice.middleware),

    // Optional middleware, devTools config, etc.
}) 
export default store;
