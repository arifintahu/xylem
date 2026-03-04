import { useParams, Link } from 'react-router-dom';
import { useTransactionDetails } from '../hooks/useTransactionDetails';
import { formatEther, formatGwei } from 'viem';
import { ArrowLeft, CheckCircle, XCircle, Code, Terminal, FileText } from 'lucide-react';
import { useNetworkStore } from '../store/networkStore';

export const TransactionDetails = () => {
  const { txHash } = useParams();
  const { data: tx, isLoading, error } = useTransactionDetails(txHash);

  const { getActiveNetwork } = useNetworkStore();
  const activeNetwork = getActiveNetwork();

  if (isLoading) return <div className="p-8 flex justify-center"><div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full"></div></div>;
  if (error) return <div className="p-8 text-red-500">Error loading transaction details</div>;
  if (!tx) return <div className="p-8 text-gray-500">Transaction not found</div>;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center space-x-4 mb-6">
        <Link to="/" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-500" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <FileText className="w-6 h-6 text-primary" />
          Transaction Details
        </h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 grid grid-cols-1 gap-6">
           <div className="flex items-center space-x-2">
              <span className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${tx.status === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {tx.status === 'success' ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                <span className="capitalize">{tx.status}</span>
              </span>
              <span className="text-gray-400 text-sm font-mono">{tx.transactionHash}</span>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <DetailItem label="Block" value={tx.blockNumber.toString()} link={`/block/${tx.blockNumber}`} />
             <DetailItem label="Timestamp" value="N/A (Need Block)" /> {/* Typically need to fetch block for timestamp, or just omit */}
             <DetailItem label="From" value={tx.from} link={`/address/${tx.from}`} />
             <DetailItem label="To" value={tx.to} link={`/address/${tx.to}`} />
             <DetailItem label="Value" value={`${formatEther(tx.value)} ${activeNetwork.currency.symbol}`} />
             <DetailItem label="Gas Price" value={`${formatGwei(tx.effectiveGasPrice)} Gwei`} />
             <DetailItem label="Gas Used" value={`${tx.gasUsed.toString()} (${((Number(tx.gasUsed) / Number(tx.gas)) * 100).toFixed(2)}%)`} />
             <DetailItem label="Nonce" value={tx.nonce.toString()} />
           </div>
        </div>
      </div>

      {/* Input Data */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
          <Code className="w-4 h-4 text-gray-500" />
          <h2 className="text-lg font-bold text-gray-800">Input Data</h2>
        </div>
        <div className="p-4 bg-gray-50 font-mono text-xs text-gray-600 break-all max-h-60 overflow-y-auto">
          {tx.input}
        </div>
      </div>

      {/* Logs */}
      {tx.logs && tx.logs.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-gray-500" />
            <h2 className="text-lg font-bold text-gray-800">Event Logs ({tx.logs.length})</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {tx.logs.map((log: any, index: number) => (
              <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded text-xs font-bold">{index}</span>
                  <span className="text-sm font-mono text-primary">{log.address}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <span className="text-xs text-gray-400 w-12 uppercase">Topics</span>
                    <div className="flex flex-col space-y-1">
                      {log.topics.map((topic: string, i: number) => (
                        <span key={i} className="text-xs font-mono text-gray-600 bg-gray-100 px-1 rounded">{topic}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <span className="text-xs text-gray-400 w-12 uppercase">Data</span>
                    <span className="text-xs font-mono text-gray-600 bg-gray-100 px-1 rounded break-all">{log.data}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const DetailItem = ({ label, value, link }: any) => (
  <div className="flex flex-col space-y-1">
    <span className="text-gray-500 text-xs font-medium uppercase tracking-wider">{label}</span>
    <div className="font-mono text-sm text-gray-900 break-all bg-gray-50 p-2 rounded border border-gray-100">
      {link ? (
        <Link to={link} className="text-primary hover:underline">{value}</Link>
      ) : (
        value
      )}
    </div>
  </div>
);
