import React from 'react';

import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import BaseLayout from './views/BaseLayout';
import AddView from './views/admin/AddView';
import AdminLayout from './views/admin/AdminLayout';
import BeerListView from './views/admin/BeerListView';
import EditView from './views/admin/EditView';
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
        children: [
          { index: true, element: <BeerListView /> },
          { path: 'add', element: <AddView /> },
          { path: ':id', element: <EditView /> },
        ],
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
