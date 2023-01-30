import React from 'react';

import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import BaseLayout from './views/BaseLayout';
import AdminLayout from './views/admin/AdminLayout';
import BeerListView from './views/admin/BeerListView';
import AuthenticationLayout from './views/auth/AuthenticationLayout';
import LoginView from './views/auth/LoginView';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      {
        path: 'auth',
        element: <AuthenticationLayout />,
        children: [
          {
            path: 'login',
            element: <LoginView />,
          },
        ],
      },
      {
        path: 'admin',
        element: <AdminLayout />,
        children: [{ index: true, element: <BeerListView /> }],
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
