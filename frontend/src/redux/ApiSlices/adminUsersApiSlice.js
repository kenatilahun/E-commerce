import { baseApiSlice } from "./baseApiSlice";

const adminUsersApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "users",
      providesTags: ["Users"],
    }),
    makeAdmin: builder.mutation({
      query: (id) => ({
        url: `users/${id}/make-admin`,
        method: "POST",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const { useGetUsersQuery, useMakeAdminMutation } = adminUsersApiSlice;
