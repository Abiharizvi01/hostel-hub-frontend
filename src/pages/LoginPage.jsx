import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate('/');
    } catch (err) {
      console.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className='flex justify-center items-center py-10'>
      <div className='w-full max-w-md bg-white p-8 rounded-lg shadow-md'>
        <h1 className='text-2xl font-bold mb-6 text-center text-gray-800'>
          Sign In
        </h1>
        
        {/* --- DEMO CREDENTIALS BOX --- */}
        <div className='mb-6 text-center bg-gray-100 p-4 rounded-lg'>
          <p className='text-sm text-gray-800 font-semibold'>
            Demo Credentials
          </p>
          <p className='text-xs text-gray-600 mt-2'>
            <strong>Warden Email:</strong> warden.demo@email.com
            <br />
            <strong>Student Email:</strong> student.demo@email.com
            <br />
            <strong>Password:</strong> demopassword123
          </p>
        </div>
        {/* ----------------------------- */}
        
        <form onSubmit={submitHandler} className='space-y-6'>
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700'
            >
              Email Address
            </label>
            <input
              id='email'
              type='email'
              placeholder='Enter email'
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-700'
            >
              Password
            </label>
            <input
              id='password'
              type='password'
              placeholder='Enter password'
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type='submit'
            disabled={isLoading}
            className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400'
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        <div className='mt-6 text-center'>
          <p className='text-sm text-gray-600'>
            New Customer?{' '}
            <Link to='/register' className='font-medium text-blue-600 hover:text-blue-500'>
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;