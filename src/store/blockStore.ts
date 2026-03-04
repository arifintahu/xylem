import { create } from 'zustand';
import type { Block, Transaction } from 'viem';

interface BlockState {
  currentBlock: Block | null;
  blocks: Block[];
  transactions: Transaction[];
  gasPrice: bigint | null;
  maxPriorityFeePerGas: bigint | null;
  baseFee: bigint | null;
  isConnected: boolean;
  addBlock: (block: Block) => void;
  addTransactions: (txs: Transaction[]) => void;
  setGasData: (gasPrice: bigint, maxPriorityFeePerGas: bigint, baseFee: bigint) => void;
  setIsConnected: (connected: boolean) => void;
  reset: () => void;
}

export const useBlockStore = create<BlockState>((set) => ({
  currentBlock: null,
  blocks: [],
  transactions: [],
  gasPrice: null,
  maxPriorityFeePerGas: null,
  baseFee: null,
  isConnected: false,
  addBlock: (block) =>
    set((state) => {
      // Avoid duplicates
      if (state.blocks.find((b) => b.hash === block.hash)) return state;
      const newBlocks = [block, ...state.blocks].slice(0, 50); // Keep last 50 blocks
      return {
        blocks: newBlocks,
        currentBlock: block,
        baseFee: block.baseFeePerGas || state.baseFee,
      };
    }),
  addTransactions: (txs) =>
    set((state) => {
      // Simple deduplication based on hash, though strictly incoming blocks shouldn't overlap much if sequential
      // But re-orgs or initial fetch might overlap
      // New transactions should be at the top
      const newTxs = [...txs, ...state.transactions].slice(0, 100); 
      return { transactions: newTxs };
    }),
  setGasData: (gasPrice, maxPriorityFeePerGas, baseFee) =>
    set({ gasPrice, maxPriorityFeePerGas, baseFee }),
  setIsConnected: (isConnected) => set({ isConnected }),
  reset: () => set({ currentBlock: null, blocks: [], transactions: [], isConnected: false }),
}));
