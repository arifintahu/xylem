import { useEffect } from 'react';
import { createPublicClient, defineChain, webSocket, http } from 'viem';
import type { Block, Transaction } from 'viem';
import { useNetworkStore } from '../store/networkStore';
import { useBlockStore } from '../store/blockStore';

export const useBlockStream = () => {
  const { activeNetworkId, getActiveNetwork } = useNetworkStore();
  const { addBlock, addTransactions, setIsConnected, setGasData, reset } = useBlockStore();

  useEffect(() => {
    const activeNetwork = getActiveNetwork();
    if (!activeNetwork) return;

    reset();

    const chain = defineChain({
      id: activeNetwork.chainId,
      name: activeNetwork.name,
      nativeCurrency: activeNetwork.currency,
      rpcUrls: {
        default: { 
           http: [activeNetwork.rpcUrl], 
           webSocket: activeNetwork.wsUrl ? [activeNetwork.wsUrl] : undefined 
        },
      },
      blockExplorers: {
        default: { name: 'Explorer', url: activeNetwork.blockExplorerBaseUrl },
      },
    });

    // Use WebSocket for subscription if available, else fallback to HTTP polling
    const client = createPublicClient({
      chain,
      transport: activeNetwork.wsUrl && activeNetwork.wsUrl.startsWith('ws') 
        ? webSocket(activeNetwork.wsUrl) 
        : http(activeNetwork.rpcUrl),
    });

    // Use HTTP for initial fetch (more reliable for batch requests sometimes)
    const httpClient = createPublicClient({
      chain,
      transport: http(activeNetwork.rpcUrl),
    });

    const fetchInitialBlocks = async () => {
      try {
        const blockNumber = await httpClient.getBlockNumber();
        const promises = [];
        for (let i = 0; i < 10; i++) {
          promises.push(httpClient.getBlock({ blockNumber: blockNumber - BigInt(i), includeTransactions: true }));
        }
        
        // Fetch gas price
        const gasPricePromise = httpClient.getGasPrice();

        const [blocks, gasPrice] = await Promise.all([
            Promise.all(promises),
            gasPricePromise
        ]);

        // Add blocks
        for (const block of blocks) {
           addBlock(block as unknown as Block); // Viem types can be tricky with defineChain
           if (block.transactions.length > 0) {
             addTransactions((block.transactions as unknown as Transaction[]).slice(0, 20));
           }
        }
        
        // Set initial gas data
        if (blocks[0] && blocks[0].baseFeePerGas) {
             setGasData(gasPrice, 0n, blocks[0].baseFeePerGas);
        }

        setIsConnected(true);

      } catch (error) {
        console.error("Failed to fetch initial blocks", error);
      }
    };

    fetchInitialBlocks();

    const unwatch = client.watchBlocks({
      includeTransactions: true,
      onBlock: (block) => {
        setIsConnected(true);
        addBlock(block as unknown as Block);
        if (block.transactions.length > 0) {
           addTransactions((block.transactions as unknown as Transaction[]).slice(0, 50));
        }
        
        // Update gas price periodically or on every block?
        // client.getGasPrice is async.
        client.getGasPrice().then(price => {
             setGasData(price, 0n, block.baseFeePerGas || 0n);
        });
      },
      onError: (error) => {
        console.error("Block stream error", error);
        setIsConnected(false);
      }
    });

    return () => {
      unwatch();
    };
  }, [activeNetworkId, addBlock, addTransactions, setIsConnected, setGasData, reset, getActiveNetwork]);
};
