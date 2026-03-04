import { useQuery } from '@tanstack/react-query';
import { createPublicClient, http } from 'viem';
import { useNetworkStore } from '../store/networkStore';

export const useAddressDetails = (address: string | undefined) => {
  const { getActiveNetwork } = useNetworkStore();
  const activeNetwork = getActiveNetwork();

  return useQuery({
    queryKey: ['address', activeNetwork.id, address],
    queryFn: async () => {
      if (!address) throw new Error('Address required');
      const client = createPublicClient({ 
          transport: http(activeNetwork.rpcUrl) 
      });
      
      const balance = await client.getBalance({ address: address as `0x${string}` });
      const code = await client.getBytecode({ address: address as `0x${string}` });
      const transactionCount = await client.getTransactionCount({ address: address as `0x${string}` });
      
      return {
        address,
        balance,
        code,
        isContract: code && code !== '0x',
        transactionCount
      };
    },
    enabled: !!address,
  });
};
