import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCreatePostMutation } from '../slices/postsApiSlice';

const CreatePostPage = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [flair, setFlair] = useState('Query');

  const navigate = useNavigate();
  const [createPost, { isLoading }] = useCreatePostMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createPost({ title, text, flair }).unwrap();
      navigate('/forum');
    } catch (err) {
      console.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className='flex justify-center items-center py-10'>
      <div className='w-full max-w-2xl bg-white p-8 rounded-lg shadow-md'>
        <h1 className='text-2xl font-bold mb-6 text-center text-gray-800'>
          Create a New Post
        </h1>
        <form onSubmit={submitHandler} className='space-y-4'>
          <div>
            <label htmlFor='title' className='block text-sm font-medium text-gray-700'>
              Title
            </label>
            <input
              id='title'
              type='text'
              required
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='text' className='block text-sm font-medium text-gray-700'>
              Text
            </label>
            <textarea
              id='text'
              rows='6'
              required
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label htmlFor='flair' className='block text-sm font-medium text-gray-700'>
              Flair
            </label>
            <select
              id='flair'
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
              value={flair}
              onChange={(e) => setFlair(e.target.value)}
            >
              <option>Query</option>
              <option>Lost & Found</option>
              <option>Hack / Tip</option>
              <option>Experience</option>
              <option>Event Info</option>
            </select>
          </div>
          <div className='flex items-center justify-end space-x-4'>
            <Link to='/forum' className='text-gray-600 hover:text-gray-900'>
              Cancel
            </Link>
            <button
              type='submit'
              disabled={isLoading}
              className='inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400'
            >
              {isLoading ? 'Creating...' : 'Create Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostPage;