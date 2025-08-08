import HomePage from '@/pages/home';
import MainLayout from '@/pages/main-layout';
import { createBrowserRouter } from '@modern-js/runtime/router';
//import ContentHandler from '@/pages/content-handler';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      // {
      //   path: '/app1',
      //   element: <ContentHandler name="App1" title="Sample App 1" componentPath="app1/app1-content" />,
      // }
    ],
  },
]);
