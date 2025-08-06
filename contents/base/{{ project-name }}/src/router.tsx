import { RouteObject } from '@modern-js/runtime/router';
import Layout from './pages/layout';
import HomePage from './pages/home';
// Define route configuration with explicit control
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    //   {
    //     path: 'app1',
    //     element: <App1Page />,
    //   },
    //   {
    //     path: 'app2',
    //     element: <App2Page />,
    //   },
    ],
  },
];

// Route metadata for navigation and other purposes
export const routeMetadata = {
  home: {
    path: '/',
    name: 'Shell',
    description: 'Shell application',
  },
//   app1: {
//     path: '/app1',
//     name: 'App1',
//     description: 'Detailed guidance and federated component demo',
//   },
//   app2: {
//     path: '/app2',
//     name: 'App2',
//     description: 'Interactive counter components',
//   },
} as const;

// // Navigation items derived from route metadata
// export const navigationItems = [
//   {
//     name: routeMetadata.app1.name,
//     href: routeMetadata.app1.path,
//   },
//   {
//     name: routeMetadata.app2.name,
//     href: routeMetadata.app2.path,
//   },
// ];