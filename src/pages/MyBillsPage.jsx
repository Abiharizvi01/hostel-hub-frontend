import React from 'react';
import { useGetMyBillsQuery } from '../slices/billsApiSlice';

const MyBillsPage = () => {
  const { data: bills, isLoading, error } = useGetMyBillsQuery();
  
  const getStatusColor = (status) => {
    return status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <h1 className='text-2xl font-bold text-gray-800 mb-6'>My AC Bills</h1>
      {isLoading ? (
        <p>Loading bills...</p>
      ) : error ? (
        <p className='text-red-500'>{error?.data?.message || error.error}</p>
      ) : (
        <div className='overflow-x-auto'>
          <table className='min-w-full bg-white'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Month</th>
                <th className='py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Year</th>
                <th className='py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Amount</th>
                <th className='py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Status</th>
                <th className='py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Date Issued</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {bills.map((bill) => (
                <tr key={bill._id}>
                  <td className='py-4 px-6 whitespace-nowrap'>{bill.month}</td>
                  <td className='py-4 px-6 whitespace-nowrap'>{bill.year}</td>
                  <td className='py-4 px-6 whitespace-nowrap font-medium'>₹{bill.amount}</td>
                  <td className='py-4 px-6 whitespace-nowrap'>
                     <span className={`py-1 px-3 rounded-full text-xs font-semibold ${getStatusColor(bill.status)}`}>
                      {bill.status}
                    </span>
                  </td>
                  <td className='py-4 px-6 whitespace-nowrap'>{new Date(bill.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyBillsPage;