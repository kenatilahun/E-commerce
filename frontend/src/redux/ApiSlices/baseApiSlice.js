import { createApi, fetchBaseQuery,} from '@reduxjs/toolkit/query/react'

// Base API Slice (Single source of truth)

// .injectEndpoints() is a powerful method in RTK Query for code splitting and
//  modular API organization
// It allows you to add endpoints to an existing API slice instead of defining all endpoints in one place. This is crucial for
 
export const baseApiSlice=createApi({
    reducerPath:'myApi',
    
baseQuery:fetchBaseQuery({baseUrl: "http://localhost:5000/api/",
 credentials: "include"    
}),

tagTypes:["Products","Cart","Categories"],
endpoints:(builder)=>({}),//Empty - endpoints injected elsewhere
}); 
