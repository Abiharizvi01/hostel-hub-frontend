import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  useGetPostByIdQuery,
  useCreatePostCommentMutation,
} from '../slices/postsApiSlice';

const SinglePostPage = () => {
  const { id: postId } = useParams();
  const [commentText, setCommentText] = useState('');

  const { data: post, isLoading, error } = useGetPostByIdQuery(postId);
  const [createComment, { isLoading: isCommenting }] = useCreatePostComment-mutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createComment({ postId, text: commentText }).unwrap();
      setCommentText('');
    } catch (err) {
      console.error(err?.data?.message || err.error);
    }
  };

  if (isLoading) return <p>Loading post...</p>;
  if (error) return <p>{error?.data?.message || error.error}</p>;

  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <Link to='/forum' className='text-blue-600 hover:underline mb-4 inline-block'>
        &larr; Back to Forum
      </Link>

      <div className='border-b pb-4 mb-4'>
        <div className='flex justify-between items-start'>
          <h2 className='text-3xl font-bold text-gray-800'>{post.title}</h2>
          <span className='bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full'>
            {post.flair}
          </span>
        </div>
        <p className='text-md text-gray-500 mt-2'>
          Posted by {post.user.name} on{' '}
          {new Date(post.createdAt).toLocaleDateString()}
        </p>
        <p className='text-gray-700 mt-4'>{post.text}</p>
      </div>

      <div className='mt-6'>
        <h3 className='text-xl font-semibold mb-4'>Comments ({post.comments.length})</h3>
        <form onSubmit={submitHandler} className='mb-6'>
          <div>
            <label htmlFor='comment' className='sr-only'>Add a comment</label>
            <textarea
              id='comment'
              rows='3'
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder='Write a comment...'
              required
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={isCommenting}
            className='mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400'
          >
            {isCommenting ? 'Submitting...' : 'Submit Comment'}
          </button>
        </form>

        <div className='space-y-4'>
          {post.comments.length === 0 && <p className='text-gray-500'>No comments yet.</p>}
          {post.comments.map((comment) => (
            <div key={comment._id} className='bg-gray-50 p-4 rounded-lg'>
              <p className='font-semibold text-gray-800'>{comment.user.name}</p>
              <p className='text-gray-600'>{comment.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SinglePostPage;