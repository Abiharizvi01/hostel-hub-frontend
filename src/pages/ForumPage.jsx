import React from 'react';
import { Link } from 'react-router-dom';
import { useGetAllPostsQuery } from '../slices/postsApiSlice';
import Post from '../components/Post.jsx';

const ForumPage = () => {
  const { data: posts, isLoading, error } = useGetAllPostsQuery();

  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold text-gray-800'>Hostel Forum</h1>
        <Link to='/forum/new'>
          <button className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            Create New Post
          </button>
        </Link>
      </div>

      {isLoading ? (
        <p>Loading posts...</p>
      ) : error ? (
        <p className='text-red-500'>{error?.data?.message || error.error}</p>
      ) : (
        <div className='space-y-4'>
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ForumPage;