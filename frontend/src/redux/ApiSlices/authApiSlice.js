import { baseApiSlice } from "./baseApiSlice";

const authApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "users/login",
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "users/register",
        method: "POST",
        body: data,
      }),
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "users/refresh",
        method: "POST",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "users/logout",
        method: "POST",
      }),
    }),
    requestPasswordReset: builder.mutation({
      query: (data) => ({
        url: "users/password-reset/request",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "users/password-reset/confirm",
        method: "POST",
        body: data,
      }),
    }),
    getProfile: builder.query({
      query: () => ({
        url: "users/me",
        method: "GET",
      }),
    }),
    updatePassword: builder.mutation({
      query: (data) => ({
        url: "users/update-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useRefreshMutation,
  useRequestPasswordResetMutation,
  useResetPasswordMutation,
  useGetProfileQuery,
  useUpdatePasswordMutation,
} = authApiSlice;
