import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAddressDetails } from '../hooks/useAddressDetails';
import { formatEther } from 'viem';
import { User, Code } from 'lucide-react';
import { useNetworkStore } from '../store/networkStore';
import { CopyToClipboard } from '../components/CopyToClipboard';

export const AddressDetails = () => {
  const { address } = useParams();
  const { data, isLoading, error } = useAddressDetails(address);
  const [activeTab, setActiveTab] = useState('overview');
  const { getActiveNetwork } = useNetworkStore();
  const activeNetwork = getActiveNetwork();

  if (isLoading) return <div className="p-8 flex justify-center"><div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full"></div></div>;
  if (error) return <div className="p-8 text-red-500">Error loading address details</div>;
  if (!data) return <div className="p-8 text-gray-500">Address not found</div>;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center space-x-4 mb-6">
        <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full transition-colors">
           {data.isContract ? <Code className="w-6 h-6 text-primary" /> : <User className="w-6 h-6 text-gray-500 dark:text-gray-400" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white break-all font-mono tracking-tight">{data.address}</h1>
            <CopyToClipboard text={data.address} />
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400 font-medium bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full inline-block mt-1 transition-colors">
            {data.isContract ? 'Contract Account' : 'Externally Owned Account'}
          </span>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden p-6 transition-colors">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-primary/20 dark:hover:border-primary/40 transition-colors group">
             <span className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider group-hover:text-primary transition-colors">Balance</span>
             <div className="text-3xl font-bold text-gray-900 dark:text-white mt-2 tracking-tight">{parseFloat(formatEther(data.balance)).toFixed(6)} <span className="text-lg text-gray-500 dark:text-gray-400 font-normal">{activeNetwork.currency.symbol}</span></div>
           </div>
           <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-primary/20 dark:hover:border-primary/40 transition-colors group">
             <span className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider group-hover:text-primary transition-colors">Transaction Count</span>
             <div className="text-3xl font-bold text-gray-900 dark:text-white mt-2 tracking-tight">{data.transactionCount.toString()}</div>
           </div>
        </div>
      </div>

      {data.isContract && (
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden transition-colors">
           <div className="border-b border-gray-100 dark:border-gray-800 flex bg-gray-50/50 dark:bg-gray-900/50 transition-colors">
             <button 
               className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'overview' ? 'border-primary text-primary bg-white dark:bg-gray-900' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
               onClick={() => setActiveTab('overview')}
             >
               Contract Bytecode
             </button>
           </div>
           
           <div className="p-6">
             {activeTab === 'overview' && (
               <div className="relative">
                 <div className="absolute top-2 right-2 text-xs text-gray-500 dark:text-gray-400 font-mono">Hex</div>
                 <div className="bg-gray-900 dark:bg-black text-gray-300 p-4 rounded-lg font-mono text-xs break-all max-h-96 overflow-y-auto leading-relaxed border border-gray-800">
                   {data.code}
                 </div>
               </div>
             )}
           </div>
        </div>
      )}
    </div>
  );
};
