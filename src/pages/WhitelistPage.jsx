import React, { useState } from 'react';
import {
  useGetWhitelistQuery,
  useAddToWhitelistMutation,
} from '../slices/wardenApiSlice';

const WhitelistPage = () => {
  const [name, setName] = useState('');
  const [collegeId, setCollegeId] = useState('');

  const { data: whitelist, isLoading, error } = useGetWhitelistQuery();
  const [addToWhitelist, { isLoading: isAdding }] = useAddToWhitelistMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await addToWhitelist({ name, collegeId }).unwrap();
      setName('');
      setCollegeId('');
    } catch (err) {
      console.error('Failed to add to whitelist:', err);
    }
  };

  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
      {/* Form Section */}
      <div className='lg:col-span-1'>
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h2 className='text-xl font-bold mb-4'>Add Student to Whitelist</h2>
          <form onSubmit={submitHandler} className='space-y-4'>
            <div>
              <label htmlFor='name' className='block text-sm font-medium text-gray-700'>Student Name</label>
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
              <label htmlFor='collegeId' className='block text-sm font-medium text-gray-700'>College ID</label>
              <input
                id='collegeId'
                type='text'
                value={collegeId}
                onChange={(e) => setCollegeId(e.target.value)}
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm'
                required
              />
            </div>
            <button
              type='submit'
              disabled={isAdding}
              className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400'
            >
              {isAdding ? 'Adding...' : 'Add Student'}
            </button>
          </form>
        </div>
      </div>

      {/* List Section */}
      <div className='lg:col-span-2'>
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h2 className='text-xl font-bold mb-4'>Approved Student List</h2>
          {isLoading ? (
            <p>Loading list...</p>
          ) : error ? (
            <p className='text-red-500'>Failed to load list</p>
          ) : (
            <ul className='space-y-2'>
              {whitelist.map((student) => (
                <li key={student.collegeId} className='p-2 bg-gray-50 rounded flex justify-between'>
                  <span>{student.name}</span>
                  <span className='font-mono text-gray-600'>{student.collegeId}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default WhitelistPage;