import { Outlet } from '@modern-js/runtime/router';
import '../styles/globals.css';

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="flex-1">
        <div className="mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}