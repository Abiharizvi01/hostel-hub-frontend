import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateComplaintMutation } from '../slices/complaintsApiSlice';

const CreateComplaintPage = () => {
  const [category, setCategory] = useState('Electrical');
  const [description, setDescription] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [image, setImage] = useState(null);

  const navigate = useNavigate();
  const [createComplaint, { isLoading }] = useCreateComplaintMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('category', category);
    formData.append('description', description);
    formData.append('roomNumber', roomNumber);
    if (image) {
      formData.append('image', image);
    }

    try {
      await createComplaint(formData).unwrap();
      navigate('/mycomplaints');
    } catch (err) {
      console.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className='flex justify-center items-center py-10'>
      <div className='w-full max-w-lg bg-white p-8 rounded-lg shadow-md'>
        <h1 className='text-2xl font-bold mb-6 text-center text-gray-800'>
          Submit a New Complaint
        </h1>
        <form onSubmit={submitHandler} className='space-y-4'>
          <div>
            <label htmlFor='category' className='block text-sm font-medium text-gray-700'>
              Category
            </label>
            <select
              id='category'
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value='Electrical'>Electrical</option>
              <option value='Water Issue'>Water Issue</option>
              <option value='Washing Machine'>Washing Machine</option>
              <option value='Mess Food'>Mess Food</option>
              <option value='Other'>Other</option>
            </select>
          </div>

          <div>
            <label htmlFor='description' className='block text-sm font-medium text-gray-700'>
              Description
            </label>
            <textarea
              id='description'
              rows='4'
              required
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div>
            <label htmlFor='roomNumber' className='block text-sm font-medium text-gray-700'>
              Room Number (if applicable)
            </label>
            <input
              id='roomNumber'
              type='text'
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor='image' className='block text-sm font-medium text-gray-700'>
              Upload Image (Optional)
            </label>
            <input
              id='image'
              type='file'
              className='mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <button
            type='submit'
            disabled={isLoading}
            className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400'
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateComplaintPage;