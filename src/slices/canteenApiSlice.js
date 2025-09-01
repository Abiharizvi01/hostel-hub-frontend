import { apiSlice } from './apiSlice';

export const canteenApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCanteenStatus: builder.query({
      query: () => ({
        url: '/api/canteen/status',
        method: 'GET',
      }),
      providesTags: ['CanteenStatus'],
      pollingInterval: 15000,
    }),
    // Add this mutation
    reportCanteenStatus: builder.mutation({
      query: (data) => ({
        url: '/api/canteen/status',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['CanteenStatus'],
    }),
  }),
});

export const { useGetCanteenStatusQuery, useReportCanteenStatusMutation } = canteenApiSlice;