import React from 'react';
import { useGetMenuQuery } from '../slices/menuApiSlice';

const MenuPage = () => {
  const { data: menu, isLoading, error } = useGetMenuQuery();

  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <h1 className='text-2xl font-bold text-gray-800 mb-6'>Weekly Mess Menu</h1>
      {isLoading ? (
        <p>Loading menu...</p>
      ) : error ? (
        <p className='text-red-500'>{error?.data?.message || error.error}</p>
      ) : (
        <div className='overflow-x-auto'>
          <table className='min-w-full bg-white'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Day</th>
                <th className='py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Breakfast</th>
                <th className='py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Lunch</th>
                <th className='py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Dinner</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {menu.map((item) => (
                <tr key={item._id}>
                  <td className='py-4 px-6 whitespace-nowrap font-medium text-gray-900'>{item.day}</td>
                  <td className='py-4 px-6 whitespace-nowrap'>{item.breakfast}</td>
                  <td className='py-4 px-6 whitespace-nowrap'>{item.lunch}</td>
                  <td className='py-4 px-6 whitespace-nowrap'>{item.dinner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MenuPage;