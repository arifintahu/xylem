import { useBlockStore } from '../store/blockStore';
import { formatGwei } from 'viem';

export const GasWidget = () => {
  const { gasPrice, baseFee } = useBlockStore();

  if (!gasPrice) return null;

  return (
    <div className="hidden md:flex items-center space-x-2 text-sm bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
      <span className="text-gray-500 font-medium">Gas:</span>
      <span className="font-mono font-bold text-primary">
        {parseFloat(formatGwei(gasPrice)).toFixed(2)}
      </span>
      <span className="text-gray-500">Gwei</span>
      {baseFee && (
        <span className="text-xs text-gray-400 ml-1 border-l border-gray-300 pl-2">
          Base: {parseFloat(formatGwei(baseFee)).toFixed(2)}
        </span>
      )}
    </div>
  );
};
