import React from 'react';
import { Link } from 'react-router-dom';
import { useGetMyComplaintsQuery } from '../slices/complaintsApiSlice';

const MyComplaintsPage = () => {
  const { data: complaints, isLoading, error } = useGetMyComplaintsQuery();

  // Helper to get color based on status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'In Progress':
        return 'text-blue-600 bg-blue-100';
      case 'Resolved':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold text-gray-800'>My Complaints</h1>
        <Link to='/createcomplaint'>
          <button className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            Submit New Complaint
          </button>
        </Link>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className='text-red-500'>{error?.data?.message || error.error}</p>
      ) : (
        <div className='overflow-x-auto'>
          <table className='min-w-full bg-white'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Date</th>
                <th className='py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Category</th>
                <th className='py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Description</th>
                <th className='py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Status</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {complaints.map((complaint) => (
                <tr key={complaint._id}>
                  <td className='py-4 px-6 whitespace-nowrap'>{new Date(complaint.createdAt).toLocaleDateString()}</td>
                  <td className='py-4 px-6 whitespace-nowrap'>{complaint.category}</td>
                  <td className='py-4 px-6'>{complaint.description}</td>
                  <td className='py-4 px-6 whitespace-nowrap'>
                    <span className={`py-1 px-3 rounded-full text-xs font-semibold ${getStatusColor(complaint.status)}`}>
                      {complaint.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyComplaintsPage;