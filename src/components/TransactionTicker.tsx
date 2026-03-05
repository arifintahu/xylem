import { useBlockStore } from '../store/blockStore';
import { formatEther } from 'viem';
import { Link } from 'react-router-dom';
import { useNetworkStore } from '../store/networkStore';

export const TransactionTicker = () => {
  const { transactions } = useBlockStore();
  const { getActiveNetwork } = useNetworkStore();
  const activeNetwork = getActiveNetwork();

  return (
    <div className="divide-y divide-gray-100 dark:divide-gray-800 max-h-[600px] overflow-y-auto">
      {transactions.map((tx) => (
        <div key={tx.hash} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors animate-in fade-in slide-in-from-right-2 duration-300 group">
          <div className="flex justify-between items-center">
             <div className="flex flex-col max-w-[70%]">
               <Link to={`/tx/${tx.hash}`} className="text-sm font-mono text-primary truncate hover:text-primary-dark transition-colors">
                 {tx.hash.slice(0, 20)}...
               </Link>
               <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center space-x-1 truncate font-mono">
                 <span className="text-gray-400 dark:text-gray-500">From</span>
                 <span className="text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded px-1 transition-colors cursor-pointer">{tx.from.slice(0, 10)}...</span>
                 <span className="text-gray-300 dark:text-gray-600">→</span>
                 <span className="text-gray-400 dark:text-gray-500">To</span>
                 <span className="text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded px-1 transition-colors cursor-pointer">{tx.to ? tx.to.slice(0, 10) + '...' : 'Contract Creation'}</span>
               </div>
             </div>
             <div className="flex flex-col items-end">
               <span className="text-xs font-mono font-bold text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                 {parseFloat(formatEther(tx.value)).toFixed(4)} {activeNetwork.currency.symbol}
               </span>
             </div>
          </div>
        </div>
      ))}
      {transactions.length === 0 && (
        <div className="p-12 text-center">
          <div className="animate-pulse w-12 h-1 bg-gray-200 dark:bg-gray-700 rounded mx-auto mb-3"></div>
          <p className="text-gray-400 dark:text-gray-500 text-sm">Waiting for transactions...</p>
        </div>
      )}
    </div>
  );
};
