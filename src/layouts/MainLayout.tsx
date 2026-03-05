import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { useBlockStream } from '../hooks/useBlockStream';
import { useNetworkStore } from '../store/networkStore';

export const MainLayout = () => {
  useBlockStream(); // Start the block stream globally
  
  const { getActiveNetwork } = useNetworkStore();
  const activeNetwork = getActiveNetwork();

  useEffect(() => {
    document.title = `Xylem - ${activeNetwork.name}`;
  }, [activeNetwork.name]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans text-gray-900 dark:text-gray-100 selection:bg-green-100 dark:selection:bg-green-900 selection:text-green-900 dark:selection:text-green-100 transition-colors duration-200">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <Outlet />
      </main>
    </div>
  );
};
