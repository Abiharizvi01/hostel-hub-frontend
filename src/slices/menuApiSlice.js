import { apiSlice } from './apiSlice';

export const menuApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMenu: builder.query({
      query: () => ({
        url: '/api/menu',
        method: 'GET',
      }),
      providesTags: ['Menu'],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetMenuQuery } = menuApiSlice;