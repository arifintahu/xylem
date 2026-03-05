import { BlockList } from '../components/BlockList';
import { TransactionTicker } from '../components/TransactionTicker';
import { Box, Activity } from 'lucide-react';

export const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col h-[700px] transition-colors">
        <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10 transition-colors">
          <div className="flex items-center space-x-2">
            <Box className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 tracking-tight">Latest Blocks</h2>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full border border-green-100 dark:border-green-900/30 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            Live Feed
          </span>
        </div>
        <div className="flex-1 overflow-hidden">
          <BlockList />
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col h-[700px] transition-colors">
        <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10 transition-colors">
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 tracking-tight">Latest Transactions</h2>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full border border-green-100 dark:border-green-900/30 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            Live Feed
          </span>
        </div>
        <div className="flex-1 overflow-hidden">
          <TransactionTicker />
        </div>
      </div>
    </div>
  );
};
