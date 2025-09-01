import { apiSlice } from './apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: '/api/auth/login',
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: '/api/auth/register',
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
        query: () => ({
          url: '/api/auth/logout', // We'll create this backend route later
          method: 'POST',
        }),
    }),
  }),
});

// This exports a hook that we can use in our components, e.g., useLoginMutation
export const { useLoginMutation, useRegisterMutation,useLogoutMutation,} = usersApiSlice;