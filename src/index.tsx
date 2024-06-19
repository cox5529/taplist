import React from 'react';

import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import BeerList from './features/beer/views/BeerList';
import EditBeerView from './features/beer/views/admin/EditView';
import CocktailList from './features/cocktails/views/CocktailList';
import BaseLayout from './shared/views/BaseLayout';
import AdminLayout from './shared/views/admin/AdminLayout';
import AuthenticationLayout from './shared/views/auth/AuthenticationLayout';
import LoginView from './shared/views/auth/LoginView';
import KioskView from './shared/views/kiosk/KioskView';

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
        children: [{ path: ':id', element: <EditBeerView /> }],
      },
      {
        path: 'beer',
        children: [{ index: true, element: <BeerList /> }],
      },
      {
        path: 'cocktails',
        children: [{ index: true, element: <CocktailList /> }],
      },
      {
        index: true,
        element: <KioskView />,
      },
    ],
  },
]);

// Refresh every hour to pickup any site updates
setInterval(() => {
  window.location.reload();
}, 60 * 60 * 1000);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
