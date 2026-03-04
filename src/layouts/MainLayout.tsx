import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { useBlockStream } from '../hooks/useBlockStream';

export const MainLayout = () => {
  useBlockStream(); // Start the block stream globally

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-green-100 selection:text-green-900">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <Outlet />
      </main>
    </div>
  );
};
