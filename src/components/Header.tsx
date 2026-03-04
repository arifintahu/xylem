import { Link } from 'react-router-dom';
import { Activity, Wallet, LogOut } from 'lucide-react';
import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi';
import { formatEther } from 'viem';
import { NetworkSelector } from './NetworkSelector';
import { GasWidget } from './GasWidget';
import { GlobalSearch } from './GlobalSearch';
import { useBlockStore } from '../store/blockStore';
import { useNetworkStore } from '../store/networkStore';

export const Header = () => {
  const { isConnected } = useBlockStore();
  const { getActiveNetwork } = useNetworkStore();
  const activeNetwork = getActiveNetwork();
  
  const { address, isConnected: isWalletConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({ address });

  const handleConnect = () => {
    // Prefer injected connector or first available
    const connector = connectors.find((c) => c.id === 'injected') || connectors[0];
    if (connector) {
      connect({ connector });
    }
  };

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm/50 backdrop-blur-sm bg-white/90 supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center space-x-6 flex-shrink-0">
          <Link to="/" className="text-xl font-bold text-gray-900 flex items-center space-x-2 hover:text-primary transition-colors group">
            <Activity className="text-primary w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="tracking-tight">Xylem</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-2 text-xs font-medium px-3 py-1.5 bg-gray-50 rounded-full border border-gray-200 shadow-sm">
             <div className={`w-2 h-2 rounded-full transition-colors duration-500 ${isConnected ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-red-500'}`} />
             <span className={isConnected ? 'text-green-700' : 'text-red-700'}>{isConnected ? 'Live Stream' : 'Connecting...'}</span>
             <span className="text-gray-300 mx-1">|</span>
             <span className="text-gray-500">{activeNetwork.name}</span>
          </div>
        </div>

        <div className="flex-1 max-w-xl mx-auto hidden lg:block">
           <GlobalSearch />
        </div>
        
        <div className="flex items-center space-x-3 md:space-x-4 flex-shrink-0">
           <GasWidget />
           <div className="h-6 w-px bg-gray-200 hidden md:block"></div>
           <NetworkSelector />
           
           {isWalletConnected ? (
             <div className="hidden md:flex items-center space-x-2 bg-gray-50 pl-3 pr-1 py-1 rounded-full border border-gray-200 hover:border-gray-300 transition-colors">
               <div className="flex flex-col items-end leading-none mr-2">
                 <span className="text-xs font-bold text-gray-900">
                   {balance ? parseFloat(formatEther(balance.value)).toFixed(4) : '0'} {balance?.symbol}
                 </span>
                 <span className="text-[10px] text-gray-500 font-mono">
                   {address?.slice(0, 6)}...{address?.slice(-4)}
                 </span>
               </div>
               <button 
                 onClick={() => disconnect()} 
                 className="p-1.5 bg-white rounded-full text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors shadow-sm"
                 title="Disconnect"
               >
                 <LogOut className="w-4 h-4" />
               </button>
             </div>
           ) : (
             <button 
               onClick={handleConnect} 
               className="hidden md:flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-all hover:shadow-lg active:scale-95"
             >
               <Wallet className="w-4 h-4" />
               <span>Connect Wallet</span>
             </button>
           )}
        </div>
      </div>
    </header>
  );
};
