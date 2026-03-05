import { useNetworkStore } from '../store/networkStore';

export const NetworkSelector = () => {
  const { networks, activeNetworkId, setActiveNetwork } = useNetworkStore();

  return (
    <select
      className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5 outline-none transition-colors"
      value={activeNetworkId}
      onChange={(e) => setActiveNetwork(e.target.value)}
    >
      {networks.map((network) => (
        <option key={network.id} value={network.id} className="bg-white dark:bg-gray-800">
          {network.name}
        </option>
      ))}
    </select>
  );
};
