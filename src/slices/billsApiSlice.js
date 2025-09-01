import { apiSlice } from './apiSlice';

export const billsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyBills: builder.query({
      query: () => ({
        url: '/api/bills/mybills',
        method: 'GET',
      }),
      providesTags: ['Bill'],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetMyBillsQuery } = billsApiSlice;