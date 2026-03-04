import { useQuery } from '@tanstack/react-query';
import { createPublicClient, http } from 'viem';
import { useNetworkStore } from '../store/networkStore';

export const useBlockDetails = (blockNumberOrHash: string | undefined) => {
  const { getActiveNetwork } = useNetworkStore();
  const activeNetwork = getActiveNetwork();

  return useQuery({
    queryKey: ['block', activeNetwork.id, blockNumberOrHash],
    queryFn: async () => {
      if (!blockNumberOrHash) throw new Error('Block number or hash required');
      
      const client = createPublicClient({ 
          transport: http(activeNetwork.rpcUrl) 
      });
      
      const isHash = blockNumberOrHash.length === 66;
      
      if (isHash) {
        return await client.getBlock({
          blockHash: blockNumberOrHash as `0x${string}`,
          includeTransactions: true 
        });
      } else {
        return await client.getBlock({
          blockNumber: BigInt(blockNumberOrHash),
          includeTransactions: true 
        });
      }
    },
    enabled: !!blockNumberOrHash,
  });
};
