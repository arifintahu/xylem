import { useQuery } from '@tanstack/react-query';
import { createPublicClient, http } from 'viem';
import { useNetworkStore } from '../store/networkStore';

export const useTransactionDetails = (hash: string | undefined) => {
  const { getActiveNetwork } = useNetworkStore();
  const activeNetwork = getActiveNetwork();

  return useQuery({
    queryKey: ['transaction', activeNetwork.id, hash],
    queryFn: async () => {
      if (!hash) throw new Error('Hash required');
      const client = createPublicClient({ 
          transport: http(activeNetwork.rpcUrl) 
      });
      
      const txPromise = client.getTransaction({ hash: hash as `0x${string}` });
      const receiptPromise = client.getTransactionReceipt({ hash: hash as `0x${string}` });
      
      const [tx, receipt] = await Promise.all([txPromise, receiptPromise]);

      let timestamp = null;
      if (tx.blockNumber) {
        const block = await client.getBlock({ blockNumber: tx.blockNumber });
        timestamp = block.timestamp;
      }
      
      return { ...tx, ...receipt, timestamp }; // Merge tx and receipt
    },
    enabled: !!hash,
  });
};
