
import { baseApiSlice } from './baseApiSlice';


export const productsApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
getProductsCategoryname: builder.query({
        query: () => ({
            url:'products/category'}),
            
        }),


getProducts: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url:'products/category',
        params: { keyword, pageNumber },
      }),
      providesTags: ['Products'],
    }),

    getProductById: builder.query({
      query: (id) => ({ url: `products/${id}` }),
    }),




 createProduct: builder.mutation({
      query: (datay) => ({
        url: 'products/production',
        method: 'POST',
        body: datay,
      }), 
      invalidatesTags: ['Products'],
    }),

 }),



  });
export const {useGetProductsCategorynameQuery,useCreateProductMutation,useGetProductsQuery,useGetProductByIdQuery}=productsApiSlice

















   