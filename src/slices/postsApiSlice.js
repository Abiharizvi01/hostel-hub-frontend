import { apiSlice } from './apiSlice';

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => ({
        url: '/api/posts',
        method: 'GET',
      }),
      providesTags: ['Post'], // Provides the 'Post' tag
      keepUnusedDataFor: 5,
    }),
    getPostById: builder.query({
      query: (id) => ({
        url: `/api/posts/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Post', id }],
    }),
    createPost: builder.mutation({
      query: (data) => ({
        url: '/api/posts',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Post'], // Invalidates the 'Post' tag
    }),
    createPostComment: builder.mutation({
      query: (data) => ({
        url: `/api/posts/${data.postId}/comments`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.postId }],
    }),
    upvotePost: builder.mutation({
      query: (postId) => ({
        url: `/api/posts/${postId}/upvote`,
        method: 'PUT',
      }),
      async onQueryStarted(postId, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedPost } = await queryFulfilled;
          // Update list cache
          dispatch(
            apiSlice.util.updateQueryData('getAllPosts', undefined, (draft) => {
              const idx = draft.findIndex((p) => p._id === postId);
              if (idx !== -1) draft[idx] = updatedPost;
            })
          );
          // Update single post cache if present
          dispatch(
            apiSlice.util.updateQueryData('getPostById', postId, (draft) => {
              Object.assign(draft, updatedPost);
            })
          );
        } catch (e) {
          // No-op: backend error will be handled by component
        }
      },
    }),
    downvotePost: builder.mutation({
      query: (postId) => ({
        url: `/api/posts/${postId}/downvote`,
        method: 'PUT',
      }),
      async onQueryStarted(postId, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedPost } = await queryFulfilled;
          // Update list cache
          dispatch(
            apiSlice.util.updateQueryData('getAllPosts', undefined, (draft) => {
              const idx = draft.findIndex((p) => p._id === postId);
              if (idx !== -1) draft[idx] = updatedPost;
            })
          );
          // Update single post cache if present
          dispatch(
            apiSlice.util.updateQueryData('getPostById', postId, (draft) => {
              Object.assign(draft, updatedPost);
            })
          );
        } catch (e) {
          // No-op
        }
      },
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useCreatePostCommentMutation,
  useUpvotePostMutation,
  useDownvotePostMutation,
} = postsApiSlice;