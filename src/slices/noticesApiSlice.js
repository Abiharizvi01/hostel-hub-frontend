import { apiSlice } from './apiSlice';

export const noticesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotices: builder.query({
      query: () => ({
        url: '/api/notices',
        method: 'GET',
      }),
      providesTags: ['Notice'],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetAllNoticesQuery } = noticesApiSlice;


