import { BlockList } from '../components/BlockList';
import { TransactionTicker } from '../components/TransactionTicker';
import { Box, Activity } from 'lucide-react';

export const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-[700px]">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center space-x-2">
            <Box className="w-5 h-5 text-gray-500" />
            <h2 className="text-lg font-bold text-gray-800 tracking-tight">Latest Blocks</h2>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            Live Feed
          </span>
        </div>
        <div className="flex-1 overflow-hidden">
          <BlockList />
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-[700px]">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-gray-500" />
            <h2 className="text-lg font-bold text-gray-800 tracking-tight">Latest Transactions</h2>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100 flex items-center gap-1">
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
