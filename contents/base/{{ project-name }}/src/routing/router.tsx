import HomePage from '@/pages/home';
import MainLayout from '@/pages/main-layout';
import { createBrowserRouter } from '@modern-js/runtime/router';

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
      //   "name": "App1",
      //   "title": "Sample App 1",
      //   "path": "/app1",
      //   "componentPath": "app1/app1-content"
      // }
    ],
  },
]);
