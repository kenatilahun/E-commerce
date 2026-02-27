import { baseApiSlice } from "./baseApiSlice";

export const bannerApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPublicBanners: builder.query({
      query: (params = {}) => ({
        url: "banners/public",
        params,
      }),
      providesTags: ["Banners"],
    }),
    getAdminBanners: builder.query({
      query: (params = {}) => ({
        url: "banners",
        params,
      }),
      providesTags: ["Banners"],
    }),
    createBanner: builder.mutation({
      query: (formData) => ({
        url: "banners",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Banners"],
    }),
    updateBanner: builder.mutation({
      query: ({ id, formData }) => ({
        url: `banners/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Banners"],
    }),
    deleteBanner: builder.mutation({
      query: (id) => ({
        url: `banners/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Banners"],
    }),
  }),
});

export const {
  useGetPublicBannersQuery,
  useGetAdminBannersQuery,
  useCreateBannerMutation,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
} = bannerApiSlice;
