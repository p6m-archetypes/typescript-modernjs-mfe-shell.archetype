import { router } from '@/routing/router';
import { RouterProvider } from '@modern-js/runtime/router';
import { StrictMode } from 'react';

export default function App() {
  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
