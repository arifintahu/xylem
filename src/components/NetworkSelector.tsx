import { useNetworkStore } from '../store/networkStore';

export const NetworkSelector = () => {
  const { networks, activeNetworkId, setActiveNetwork } = useNetworkStore();

  return (
    <select
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5 outline-none transition-colors"
      value={activeNetworkId}
      onChange={(e) => setActiveNetwork(e.target.value)}
    >
      {networks.map((network) => (
        <option key={network.id} value={network.id}>
          {network.name}
        </option>
      ))}
    </select>
  );
};
