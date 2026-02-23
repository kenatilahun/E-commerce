import { baseApiSlice } from "./baseApiSlice";

export const categoryApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: "categories",
      }),
    }),
    getProductsByCategorySlug: builder.query({
      query: (slug) => ({
        url: `categories/slug/${slug}/products`,
      }),
    }),
    createCategory: builder.mutation({
      query: (formData) => ({
        url: "categories",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetProductsByCategorySlugQuery,
  useCreateCategoryMutation,
} = categoryApiSlice;
