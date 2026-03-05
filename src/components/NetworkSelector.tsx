import { useNetworkStore } from '../store/networkStore';

export const NetworkSelector = () => {
  const { networks, activeNetworkId, setActiveNetwork } = useNetworkStore();

  if (networks.length <= 1) {
    return null;
  }

  return (
    <div className="relative">
      <select
        className="appearance-none bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 pr-8 outline-none transition-colors cursor-pointer"
        value={activeNetworkId}
        onChange={(e) => setActiveNetwork(e.target.value)}
      >
        {networks.map((network) => (
          <option key={network.id} value={network.id} className="bg-white dark:bg-gray-800">
            {network.name}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 dark:text-gray-400">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
    </div>
  );
};
