import { baseApiSlice } from "./baseApiSlice"
const authApiSlice=baseApiSlice.injectEndpoints({
    endpoints:(builder)=>({
       login: builder.mutation({
        query:(data)=>({
            url:'users/login',
            method:'POST',
            body:data,

        })
       })
 ,
        logout: builder.mutation({
          query: () => ({
          url: `logout`,
          method: 'POST',
                        }),
    }),
})
 })
export const {useLoginMutation, useLogoutMutation}=authApiSlice