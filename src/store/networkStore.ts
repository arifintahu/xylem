import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { chainConfig } from '../config/chain';

export interface Network {
  id: string;
  chainId: number;
  name: string;
  rpcUrl: string;
  wsUrl: string;
  currency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  blockExplorerBaseUrl: string;
}

export const defaultNetworks: Network[] = [
  {
    id: "base-mainnet",
    chainId: 8453,
    name: "Base",
    rpcUrl: "https://mainnet.base.org",
    wsUrl: "wss://base-rpc.publicnode.com",
    currency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    blockExplorerBaseUrl: "https://basescan.org",
  },
  {
    id: "ethereum-mainnet",
    chainId: 1,
    name: "Ethereum",
    rpcUrl: "https://eth.merkle.io",
    wsUrl: "wss://eth.merkle.io",
    currency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    blockExplorerBaseUrl: "https://etherscan.io",
  },
  {
    id: chainConfig.id,
    chainId: chainConfig.chainId,
    name: chainConfig.name,
    rpcUrl: chainConfig.rpcUrl,
    wsUrl: chainConfig.wsUrl,
    currency: {
      name: chainConfig.nativeCurrency.name,
      symbol: chainConfig.nativeCurrency.symbol,
      decimals: chainConfig.nativeCurrency.decimals,
    },
    blockExplorerBaseUrl: chainConfig.blockExplorerUrl,
  },
];

interface NetworkState {
  networks: Network[];
  activeNetworkId: string;
  addNetwork: (network: Network) => void;
  setActiveNetwork: (id: string) => void;
  getActiveNetwork: () => Network;
}

export const useNetworkStore = create<NetworkState>()(
  persist(
    (set, get) => ({
      networks: defaultNetworks,
      activeNetworkId: defaultNetworks[0].id,
      addNetwork: (network) =>
        set((state) => ({ networks: [...state.networks, network] })),
      setActiveNetwork: (id) => set({ activeNetworkId: id }),
      getActiveNetwork: () => {
        const { networks, activeNetworkId } = get();
        return networks.find((n) => n.id === activeNetworkId) || networks[0];
      },
    }),
    {
      name: 'network-storage',
    }
  )
);
