import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className='bg-gray-800 text-white shadow-md'>
      <nav className='container mx-auto flex items-center justify-between p-4 flex-wrap'>
        <div className='flex items-center space-x-6'>
          <Link to='/' className='text-xl font-bold hover:text-gray-300'>
            HostelHub
          </Link>
        </div>

        <div className='flex items-center space-x-4 mt-2 md:mt-0'>
          {userInfo ? (
            <>
              {/* --- LOGGED-IN USER LINKS --- */}
              <Link to='/notices' className='hover:text-gray-300'>
                Notice Board
              </Link>
              <Link to='/menu' className='hover:text-gray-300'>
                Mess Menu
              </Link>
              <Link to='/mycomplaints' className='hover:text-gray-300'>
                My Complaints
              </Link>
              <Link to='/mybills' className='hover:text-gray-300'>
                My Bills
              </Link>
              <Link to='/forum' className='hover:text-gray-300'>
                Forum
              </Link>
              
              {userInfo.role === 'Warden' && (
                <>
                  <Link to='/warden/dashboard' className='font-semibold text-yellow-400 hover:text-yellow-300'>
                    Manage Complaints
                  </Link>
                  <Link to='/warden/whitelist' className='font-semibold text-yellow-400 hover:text-yellow-300'>
                    Manage Students
                  </Link>
                  <Link to='/warden/create-warden' className='font-semibold text-yellow-400 hover:text-yellow-300'>
                    Create Warden
                  </Link>
                </>
              )}
              
              <span className='font-semibold'>Welcome, {userInfo.name}</span>
              <button
                onClick={logoutHandler}
                className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded'
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* --- LOGGED-OUT USER LINKS --- */}
              <Link
                to='/login'
                className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'
              >
                Sign In
              </Link>
              <Link to='/register' className='hover:text-gray-300'>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;