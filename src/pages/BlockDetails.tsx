import { useParams, Link } from 'react-router-dom';
import { useBlockDetails } from '../hooks/useBlockDetails';
import { formatEther, formatGwei } from 'viem';
import { ArrowLeft, Box, Clock, Hash, Layers, Database, User, Activity } from 'lucide-react';
import { useNetworkStore } from '../store/networkStore';

export const BlockDetails = () => {
  const { blockNumber } = useParams();
  const { data: block, isLoading, error } = useBlockDetails(blockNumber);
  const { getActiveNetwork } = useNetworkStore();
  const activeNetwork = getActiveNetwork();

  if (isLoading) return <div className="p-8 flex justify-center"><div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full"></div></div>;
  if (error) return <div className="p-8 text-red-500">Error loading block details</div>;
  if (!block) return <div className="p-8 text-gray-500">Block not found</div>;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center space-x-4 mb-6">
        <Link to="/" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-500" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Box className="w-6 h-6 text-primary" />
          Block #{block.number?.toString()}
        </h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <DetailItem icon={<Hash />} label="Block Hash" value={block.hash} />
          <DetailItem icon={<Clock />} label="Timestamp" value={new Date(Number(block.timestamp) * 1000).toLocaleString()} />
          <DetailItem icon={<Layers />} label="Parent Hash" value={block.parentHash} />
          <DetailItem icon={<User />} label="Miner / Fee Recipient" value={block.miner} link={`/address/${block.miner}`} />
          
          <DetailItem 
            icon={<Activity />} 
            label="Gas Used" 
            value={`${block.gasUsed.toString()} / ${block.gasLimit.toString()} (${((Number(block.gasUsed) / Number(block.gasLimit)) * 100).toFixed(2)}%)`} 
          />
          
          <DetailItem 
            icon={<Database />} 
            label="Base Fee Per Gas" 
            value={block.baseFeePerGas ? `${formatGwei(block.baseFeePerGas)} Gwei` : 'N/A'} 
          />

          <DetailItem 
             icon={<Box />}
             label="Blob Gas Used"
             value={block.blobGasUsed ? block.blobGasUsed.toString() : '0'}
          />

          <DetailItem
             icon={<Box />}
             label="Transactions"
             value={block.transactions.length.toString()}
          />
        </div>
      </div>
      
      {/* Transactions List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-lg font-bold text-gray-800">Transactions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
             <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
               <tr>
                 <th className="px-6 py-3 font-medium">Tx Hash</th>
                 <th className="px-6 py-3 font-medium">From</th>
                 <th className="px-6 py-3 font-medium">To</th>
                 <th className="px-6 py-3 font-medium text-right">Value</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-100">
               {block.transactions.slice(0, 50).map((tx: any) => (
                 <tr key={tx.hash} className="hover:bg-gray-50 transition-colors">
                   <td className="px-6 py-4 font-mono text-primary">
                     <Link to={`/tx/${tx.hash}`}>{tx.hash.slice(0, 14)}...</Link>
                   </td>
                   <td className="px-6 py-4 font-mono text-gray-600">
                     <Link to={`/address/${tx.from}`} className="hover:text-primary transition-colors">{tx.from.slice(0, 8)}...</Link>
                   </td>
                   <td className="px-6 py-4 font-mono text-gray-600">
                     {tx.to ? (
                        <Link to={`/address/${tx.to}`} className="hover:text-primary transition-colors">{tx.to.slice(0, 8)}...</Link>
                     ) : (
                        <span className="text-gray-400">Contract Creation</span>
                     )}
                   </td>
                   <td className="px-6 py-4 font-mono text-gray-900 text-right">
                     {parseFloat(formatEther(tx.value)).toFixed(5)} {activeNetwork.currency.symbol}
                   </td>
                 </tr>
               ))}
               {block.transactions.length > 50 && (
                 <tr>
                   <td colSpan={4} className="px-6 py-4 text-center text-gray-500 text-xs">
                     Showing first 50 transactions...
                   </td>
                 </tr>
               )}
             </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ icon, label, value, link }: any) => (
  <div className="flex flex-col space-y-1">
    <div className="flex items-center space-x-2 text-gray-500 text-xs font-medium uppercase tracking-wider h-5">
      {icon && <div className="flex items-center justify-center w-4 h-4">{icon}</div>}
      <span className="leading-none pt-0.5">{label}</span>
    </div>
    <div className="font-mono text-sm text-gray-900 break-all bg-gray-50 p-2 rounded border border-gray-100">
      {link ? (
        <Link to={link} className="text-primary hover:underline">{value}</Link>
      ) : (
        value
      )}
    </div>
  </div>
);
