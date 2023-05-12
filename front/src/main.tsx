import ReactDOM from 'react-dom/client';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme.ts';

import DirectMessage from './pages/Community/DirectMessage/index.tsx';
import Main from '@pages/Main';
import SignIn from '@/pages/User/SignIn';
import Top from './layouts/Top';
import ChatButton from './layouts/ChatButton';

import ChatTop from '@layouts/ChatTop';
import DirectMessageList from '@pages/Community/DirectMessageList';
import ManageProducts from '@pages/Product/ManageProductList/index.tsx';
import Products from '@pages/Product/ProductList/index.tsx';
import ErrorPage from '@pages/Common/ErrorPage';
import ManageUsers from '@pages/User/ManageUsers';
import ProductDetail from '@pages/Product/ProductDetail/index.tsx';
import Community from './pages/Community/Community/index.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Top />
        <ChatButton />
      </>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Main />,
      },
      {
        path: 'manage',
        children: [
          {
            path: 'user',
            children: [
              {
                path: 'list',
                element: <ManageUsers />,
              },
              {
                path: 'detail',
              },
            ],
          },
          {
            path: 'product',
            children: [
              {
                path: 'list',
                element: <ManageProducts />,
              },
              {
                path: 'detail',
              },
            ],
          },
        ],
      },
      {
        path: 'user',
        children: [
          {
            path: 'signin',
            element: <SignIn />,
          },
        ],
      },
      {
        path: 'product',
        children: [
          {
            path: 'list',
            element: <Products />,
          },
          {
            path: 'detail/productno',
            children: [
              {
                path: ':productNo',
                element: <ProductDetail />,
              },
            ],
          },
        ],
      },
      {
        path: 'community',
        children: [
          {
            path: '',
            element: <Community />,
          },
          {
            path: 'detail/productno',
            children: [
              {
                path: ':productNo',
                element: <ProductDetail />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '/chattypes',
    element: <ChatTop />,
    children: [
      { path: ':chattype/channels', element: <DirectMessageList /> },
      {
        path: ':chattype/channels/:channel',
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
