import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { logout } from "../featureSlices/authSlice"

// Base API Slice (Single source of truth)

// .injectEndpoints() is a powerful method in RTK Query for code splitting and
//  modular API organization
// It allows you to add endpoints to an existing API slice instead of defining all endpoints in one place. This is crucial for
 
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/",
  credentials: "include",
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    const refreshResult = await baseQuery(
      { url: "users/refresh", method: "POST" },
      api,
      extraOptions
    );
    if (refreshResult?.data) {
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const baseApiSlice=createApi({
    reducerPath:'myApi',
    
baseQuery: baseQueryWithReauth,

tagTypes:["Products","Cart","Categories"],
endpoints:(builder)=>({}),//Empty - endpoints injected elsewhere
}); 
