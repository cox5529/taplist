import React from 'react';

import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import BeerList from './features/beer/views/BeerList';
import EditBeerView from './features/beer/views/admin/EditView';
import CocktailList from './features/cocktails/views/CocktailList';
import CocktailAddView from './features/cocktails/views/CocktailAddView';
import CocktailDetailsView from './features/cocktails/views/CocktailDetailsView';
import CocktailEditView from './features/cocktails/views/CocktailEditView';
import CocktailLayout from './features/cocktails/views/CocktailLayout';
import BaseLayout from './shared/views/BaseLayout';
import HomeView from './shared/views/HomeView';
import AdminLayout from './shared/views/admin/AdminLayout';
import AuthenticationLayout from './shared/views/auth/AuthenticationLayout';
import LoginView from './shared/views/auth/LoginView';

import './index.css';
import CocktailSearchResultsView from './features/cocktails/views/CocktailSearchResultsView';

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
        element: <CocktailLayout />,
        children: [
          { path: 'search', element: <CocktailSearchResultsView /> },
          { path: 'create', element: <CocktailAddView /> },
          { path: ':id', element: <CocktailDetailsView /> },
          { path: ':id/edit', element: <CocktailEditView /> },
          { index: true, element: <CocktailList /> },
        ],
      },
      {
        index: true,
        element: <HomeView />,
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
