import { Outlet } from 'react-router-dom';
import Navigation from '@/components/Navigation';

function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
