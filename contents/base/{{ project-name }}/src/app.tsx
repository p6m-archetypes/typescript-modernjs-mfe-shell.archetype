import { createBrowserRouter, RouterProvider } from '@modern-js/runtime/router';
import { routes } from './router';

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;