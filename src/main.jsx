import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store.js';

// Import all our components
import App from './App.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import MyComplaintsPage from './pages/MyComplaintsPage.jsx';
import CreateComplaintPage from './pages/CreateComplaintPage.jsx';
import ForumPage from './pages/ForumPage.jsx';
import CreatePostPage from './pages/CreatePostPage.jsx';
import SinglePostPage from './pages/SinglePostPage.jsx';
import WardenDashboardPage from './pages/WardenDashboardPage.jsx'; // Corrected path
import WardenPrivateRoute from './components/WardenPrivateRoute.jsx';
import NoticeBoardPage from './pages/NoticeBoardPage.jsx';
import MenuPage from './pages/MenuPage.jsx';
import MyBillsPage from './pages/MyBillsPage.jsx';
import WhitelistPage from './pages/WhitelistPage.jsx';
import CreateWardenPage from './pages/CreateWardenPage.jsx';

import PrivateRoute from './components/PrivateRoute.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      {/* Public Routes */}
      <Route index={true} path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      
      {/* --- PRIVATE ROUTES --- */}
      <Route path='' element={<PrivateRoute />}>
        <Route path='/notices' element={<NoticeBoardPage />} />
        <Route path='/menu' element={<MenuPage />} />
        <Route path='/mycomplaints' element={<MyComplaintsPage />} />
        <Route path='/createcomplaint' element={<CreateComplaintPage />} />
        <Route path='/forum' element={<ForumPage />} />
        <Route path='/forum/new' element={<CreatePostPage />} />
        <Route path='/post/:id' element={<SinglePostPage />} />
        <Route path='/mybills' element={<MyBillsPage />} />

        {/* Warden Only Routes (nested inside PrivateRoute) */}
        <Route path='' element={<WardenPrivateRoute />}>
          <Route path='/warden/dashboard' element={<WardenDashboardPage />} />
          <Route path='/warden/whitelist' element={<WhitelistPage />} />
          <Route path='/warden/create-warden' element={<CreateWardenPage />} />
        </Route>
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);

