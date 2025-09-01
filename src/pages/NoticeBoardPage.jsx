import React from 'react';
import { useGetAllNoticesQuery } from '../slices/noticesApiSlice';

const NoticeBoardPage = () => {
  const { data: notices, isLoading, error } = useGetAllNoticesQuery();

  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <h1 className='text-2xl font-bold text-gray-800 mb-6'>Official Notice Board</h1>
      {isLoading ? (
        <p>Loading notices...</p>
      ) : error ? (
        <p className='text-red-500'>{error?.data?.message || error.error}</p>
      ) : (
        <div className='space-y-4'>
          {notices.map((notice) => (
            <div key={notice._id} className='border border-gray-200 rounded-lg p-4'>
              <h3 className='text-xl font-semibold text-gray-800'>{notice.title}</h3>
              <p className='text-gray-600 mt-2'>{notice.content}</p>
              <small className='text-gray-500 mt-4 block'>
                Posted on: {new Date(notice.createdAt).toLocaleDateString()}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NoticeBoardPage;