import { useBlockStore } from '../store/blockStore';
import { Link } from 'react-router-dom';

export const BlockList = () => {
  const { blocks } = useBlockStore();

  return (
    <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
      {blocks.map((block) => (
        <div key={block.hash} className="p-4 hover:bg-gray-50 transition-colors animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <Link to={`/block/${block.number}`} className="text-sm font-bold text-primary hover:text-primary-dark transition-colors font-mono">
                #{block.number?.toString()}
              </Link>
              <span className="text-xs text-gray-400 mt-1 font-medium">{new Date(Number(block.timestamp) * 1000).toLocaleTimeString()}</span>
            </div>
            <div className="flex flex-col items-end">
               <span className="text-xs text-gray-500 font-medium">
                 Txns: <span className="font-mono text-gray-900 ml-1">{block.transactions.length}</span>
               </span>
               <span className="text-xs text-gray-400 mt-1 font-mono hover:text-gray-600 transition-colors cursor-pointer" title={block.miner}>
                 {block.miner.slice(0, 8)}...{block.miner.slice(-6)}
               </span>
            </div>
          </div>
        </div>
      ))}
      {blocks.length === 0 && (
        <div className="p-12 text-center">
          <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-3"></div>
          <p className="text-gray-400 text-sm">Waiting for blocks...</p>
        </div>
      )}
    </div>
  );
};
