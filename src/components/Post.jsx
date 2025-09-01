import React from 'react';
import { Link } from 'react-router-dom';

const Post = ({ post }) => {
  return (
    <Link
      to={`/post/${post._id}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div className='border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200'>
        <div className='flex justify-between items-start'>
          <h3 className='text-xl font-semibold text-gray-800'>{post.title}</h3>
          <span className='bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full'>
            {post.flair}
          </span>
        </div>
        <p className='text-sm text-gray-500 mt-1'>
          Posted by {post.user.name} on{' '}
          {new Date(post.createdAt).toLocaleDateString()}
        </p>
        <p className='text-gray-600 mt-3 truncate'>
          {post.text}
        </p>
        <div className='flex items-center text-sm text-gray-500 mt-4'>
          <span>{post.comments.length} Comments</span>
        </div>
      </div>
    </Link>
  );
};

export default Post;