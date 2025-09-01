import React from 'react';
import { useSelector } from 'react-redux';
import {
  useGetCanteenStatusQuery,
  useReportCanteenStatusMutation,
} from '../slices/canteenApiSlice';

const HomePage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data: canteenStatuses, isLoading } = useGetCanteenStatusQuery();
  const [reportStatus] = useReportCanteenStatusMutation();

  const handleReport = async (canteenName, status) => {
    if (!userInfo) {
      alert('Please log in to report status.');
      return;
    }
    try {
      await reportStatus({ canteenName, status }).unwrap();
    } catch (err) {
      console.error('Failed to report status:', err);
    }
  };

  const getStatusColor = (status) => {
    if (status === 'Open') return 'bg-green-500';
    if (status === 'Closed') return 'bg-red-500';
    return 'bg-gray-400';
  };

  const facilities = [
    {
      name: 'Study Room',
      timing: 'Open 24/7 (Silent Hours: 10 PM - 6 AM)',
      description: 'A quiet space for focused study and collaboration.',
      imageUrl: 'https://images.pexels.com/photos/256517/pexels-photo-256517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      name: 'Gym Hall',
      timing: '6 AM - 9 AM & 5 PM - 9 PM',
      description: 'Equipped with basic cardio and weight training machines.',
      imageUrl: 'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      name: 'TV & Common Room',
      timing: '8 AM - 11 PM',
      description: 'A place to relax, watch TV, and socialize with fellow residents.',
      imageUrl: 'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
  ];

  return (
    <div>
      <div className='bg-white p-10 rounded-lg shadow-md text-center mb-8'>
        <h1 className='text-4xl font-bold text-gray-800'>
          Welcome to the Hostel Community Hub!
        </h1>
        {userInfo ? (
          <p className='mt-4 text-lg text-gray-600'>
            You are logged in as {userInfo.name}. Use the navigation bar to access all features.
          </p>
        ) : (
          <p className='mt-4 text-lg text-gray-600'>
            Please sign in or register to access all features.
          </p>
        )}
      </div>

      <div className='mb-8'>
        <h2 className='text-3xl font-bold text-gray-700 mb-6'>Live Canteen Status</h2>
        <div className='space-y-4'>
          {isLoading ? (
            <p>Loading statuses...</p>
          ) : (
            canteenStatuses &&
            Object.entries(canteenStatuses).map(([name, status]) => (
              <div
                key={name}
                className='bg-white rounded-lg shadow-md p-4 flex items-center justify-between'
              >
                <div className='flex items-center'>
                  <span
                    className={`h-4 w-4 rounded-full mr-3 ${getStatusColor(
                      status
                    )}`}
                  ></span>
                  <h3 className='text-xl font-semibold'>{name}</h3>
                </div>
                <div className='flex items-center space-x-2'>
                  <span className='font-semibold text-lg mr-4'>{status}</span>
                  <button
                    onClick={() => handleReport(name, 'Open')}
                    className='bg-green-100 text-green-800 font-bold py-1 px-3 rounded-md hover:bg-green-200'
                  >
                    Report Open
                  </button>
                  <button
                    onClick={() => handleReport(name, 'Closed')}
                    className='bg-red-100 text-red-800 font-bold py-1 px-3 rounded-md hover:bg-red-200'
                  >
                    Report Closed
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <h2 className='text-3xl font-bold text-gray-700 mb-6'>Hostel Facilities</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {facilities.map((facility) => (
          <div key={facility.name} className='bg-white rounded-lg shadow-md overflow-hidden'>
            <img src={facility.imageUrl} alt={facility.name} className='w-full h-48 object-cover' />
            <div className='p-6'>
              <h3 className='text-xl font-semibold mb-2'>{facility.name}</h3>
              <p className='text-gray-600 mb-4'>{facility.description}</p>
              <div className='bg-gray-100 p-3 rounded-lg'>
                <p className='text-sm font-semibold text-gray-800'>Timings: {facility.timing}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;