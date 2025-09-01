import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BACKEND_URL,
  // prepareHeaders is the function we need
  prepareHeaders: (headers, { getState }) => {
    const { userInfo } = getState().auth;
    // If we have a token, add it to the headers
    if (userInfo && userInfo.token) {
      headers.set('authorization', `Bearer ${userInfo.token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User', 'Complaint', 'Post', 'Notice', 'Menu', 'Bill'],
  endpoints: (builder) => ({}),
});