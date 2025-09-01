import React from 'react';
import {
  useGetAllComplaintsQuery,
  useUpdateComplaintStatusMutation,
} from '../slices/complaintsApiSlice';

const WardenDashboardPage = () => {
  const { data: complaints, isLoading, error, refetch } = useGetAllComplaintsQuery();
  const [updateStatus, { isLoading: isUpdating }] = useUpdateComplaintStatusMutation();

  const handleStatusChange = async (complaintId, newStatus) => {
    try {
      await updateStatus({ complaintId, status: newStatus }).unwrap();
      refetch();
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <h1 className='text-2xl font-bold text-gray-800 mb-6'>
        Warden Dashboard: All Complaints
      </h1>

      {isLoading ? (
        <p>Loading complaints...</p>
      ) : error ? (
        <p className='text-red-500'>{error?.data?.message || error.error}</p>
      ) : (
        <div className='overflow-x-auto'>
          <table className='min-w-full bg-white'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Student</th>
                <th className='py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Category</th>
                <th className='py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Description</th>
                <th className='py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Status</th>
                <th className='py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Action</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {complaints.map((complaint) => (
                <tr key={complaint._id}>
                  <td className='py-4 px-6 whitespace-nowrap font-medium text-gray-900'>{complaint.student.name}</td>
                  <td className='py-4 px-6 whitespace-nowrap'>{complaint.category}</td>
                  <td className='py-4 px-6'>{complaint.description}</td>
                  <td className='py-4 px-6 whitespace-nowrap'>
                    <span className={`py-1 px-3 rounded-full text-xs font-semibold ${getStatusColor(complaint.status)}`}>
                      {complaint.status}
                    </span>
                  </td>
                  <td className='py-4 px-6 whitespace-nowrap'>
                    <select
                      value={complaint.status}
                      onChange={(e) => handleStatusChange(complaint._id, e.target.value)}
                      disabled={isUpdating}
                      className='block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md'
                    >
                      <option>Pending</option>
                      <option>In Progress</option>
                      <option>Resolved</option>
                    </select>
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

export default WardenDashboardPage;