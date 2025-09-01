import { apiSlice } from './apiSlice';

export const wardenApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWhitelist: builder.query({
      query: () => '/api/warden/whitelist',
      providesTags: ['Whitelist'],
    }),
    addToWhitelist: builder.mutation({
      query: (data) => ({
        url: '/api/warden/whitelist',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Whitelist'],
    }),
    createWarden: builder.mutation({
      query: (data) => ({
        url: '/api/warden/create-warden',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useGetWhitelistQuery, useAddToWhitelistMutation,useCreateWardenMutation, } = wardenApiSlice;