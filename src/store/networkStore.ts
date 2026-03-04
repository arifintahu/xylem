import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getNetworks, type Network } from '../config/network';

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
      networks: getNetworks(),
      activeNetworkId: getNetworks()[0].id,
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
