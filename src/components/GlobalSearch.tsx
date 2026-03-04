import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Loader2 } from 'lucide-react';
import { isAddress, isHex, createPublicClient, http } from 'viem';
import { useNetworkStore } from '../store/networkStore';

export const GlobalSearch = () => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const { getActiveNetwork } = useNetworkStore();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;

    setIsSearching(true);
    try {
      if (isAddress(q)) {
        navigate(`/address/${q}`);
        setQuery('');
        return;
      }

      if (/^\d+$/.test(q)) {
        navigate(`/block/${q}`);
        setQuery('');
        return;
      }

      if (isHex(q) && q.length === 66) {
        const network = getActiveNetwork();
        // Create a temporary client to check
        const client = createPublicClient({ 
            transport: http(network.rpcUrl) 
        });
        
        try {
            const tx = await client.getTransaction({ hash: q });
            if (tx) {
                navigate(`/tx/${q}`);
                setQuery('');
                return;
            }
        } catch {
            // Ignore error
        }
        
        try {
            const block = await client.getBlock({ blockHash: q });
            if (block) {
                navigate(`/block/${block.number}`);
                setQuery('');
                return;
            }
        } catch {
            // Ignore
        }
        
        // Fallback to tx
        navigate(`/tx/${q}`);
        setQuery('');
      }
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-md hidden lg:block group">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        {isSearching ? (
          <Loader2 className="w-4 h-4 text-primary animate-spin" />
        ) : (
          <Search className="w-4 h-4 text-gray-400 group-focus-within:text-primary transition-colors" />
        )}
      </div>
      <input
        type="text"
        className="block w-full p-2 pl-10 pr-4 text-sm text-gray-900 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm outline-none placeholder:text-gray-400"
        placeholder="Search by Tx Hash, Block, or Address"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <span className="text-xs text-gray-400 border border-gray-200 rounded px-1.5 py-0.5 hidden group-focus-within:block">Enter</span>
      </div>
    </form>
  );
};
