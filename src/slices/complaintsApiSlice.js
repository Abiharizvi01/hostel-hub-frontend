import { apiSlice } from './apiSlice';

export const complaintsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyComplaints: builder.query({
      query: () => ({
        url: '/api/complaints/mycomplaints',
        method: 'GET',
      }),
      keepUnusedDataFor: 5, // Optional: cache data for 5 seconds
    }),
    createComplaint: builder.mutation({
        query: (data) => ({
          url: '/api/complaints',
          method: 'POST',
          body: data,
        }),
    }),
    getAllComplaints: builder.query({
      query: () => ({
        url: '/api/complaints',
        method: 'GET',
      }),
      providesTags: ['Complaint'],
      keepUnusedDataFor: 5,
    }),
    updateComplaintStatus: builder.mutation({
      query: (data) => ({
        url: `/api/complaints/${data.complaintId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Complaint'],
    }),
  }),
});

export const { useGetMyComplaintsQuery,useCreateComplaintMutation,useGetAllComplaintsQuery,useUpdateComplaintStatusMutation, } = complaintsApiSlice;