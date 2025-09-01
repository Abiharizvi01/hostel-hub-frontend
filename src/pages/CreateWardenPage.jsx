import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateWardenMutation } from '../slices/wardenApiSlice';

const CreateWardenPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();
  const [createWarden, { isLoading }] = useCreateWardenMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createWarden({ name, email, password }).unwrap();
      navigate('/warden/dashboard'); // Or to another admin page
    } catch (err) {
      console.error('Failed to create warden:', err);
    }
  };

  return (
    <div className='flex justify-center items-center py-10'>
      <div className='w-full max-w-md bg-white p-8 rounded-lg shadow-md'>
        <h1 className='text-2xl font-bold mb-6 text-center'>Create New Warden Account</h1>
        <form onSubmit={submitHandler} className='space-y-4'>
          <div>
            <label htmlFor='name' className='block text-sm font-medium text-gray-700'>Name</label>
            <input
              id='name'
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm'
              required
            />
          </div>
          <div>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email Address</label>
            <input
              id='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm'
              required
            />
          </div>
          <div>
            <label htmlFor='password' className='block text-sm font-medium text-gray-700'>Temporary Password</label>
            <input
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm'
              required
            />
          </div>
          <button
            type='submit'
            disabled={isLoading}
            className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400'
          >
            {isLoading ? 'Creating...' : 'Create Warden'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateWardenPage;