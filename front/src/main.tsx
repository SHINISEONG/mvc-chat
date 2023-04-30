import React from 'react';
import ReactDOM from 'react-dom/client';

import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme.ts';
import InputName from './pages/InputName/index.tsx';
import Layout from './layouts';
import DirectMessage from './pages/Community/DirectMessage/index.tsx';
import Main from '@pages/Main';

import SignIn from '@/pages/User/SignIn/index.tsx';
import Top from './layouts/Top/index.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Top />
        <Main />
      </>
    ),
  },
  {
    path: '/users',
    element: <Top />,
    children: [
      {
        path: 'signin',
        element: <SignIn />,
      },
    ],
  },

  {
    path: '/inputname',
    element: <InputName />,
  },
  {
    path: '/workspaces',
    element: <Layout />,
    children: [
      {
        path: ':workspace/channels/:channel/senderid/:id',
        element: <DirectMessage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider theme={theme}>
    <CssBaseline>
      <RouterProvider router={router} />
    </CssBaseline>
  </ThemeProvider>
);
