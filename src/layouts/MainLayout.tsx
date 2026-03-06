import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useBlockStream } from '../hooks/useBlockStream';
import { useNetworkStore } from '../store/networkStore';
import { useThemeStore } from '../store/themeStore';

export const MainLayout = () => {
  useBlockStream(); // Start the block stream globally
  
  const { getActiveNetwork } = useNetworkStore();
  const activeNetwork = getActiveNetwork();
  const { theme } = useThemeStore();

  useEffect(() => {
    document.title = `Xylem - ${activeNetwork.name}`;
  }, [activeNetwork.name]);

  useEffect(() => {
    // Force sync DOM with state on mount and update
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 font-sans text-gray-900 dark:text-gray-100 selection:bg-green-100 dark:selection:bg-green-900 selection:text-green-900 dark:selection:text-green-100 transition-colors duration-200">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-7xl flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
