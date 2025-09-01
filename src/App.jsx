import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header.jsx';

const App = () => {
  return (
    <>
      <Header />
      <main className='py-8'>
        <div className='container mx-auto px-4'>
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default App;