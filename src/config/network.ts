const configGlob = import.meta.glob('../../config/config.json', { eager: true });
const config = (configGlob['../../config/config.json'] as any)?.default;

const chainName = import.meta.env.VITE_CHAIN_NAME

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

const envConfig: Network = {
  id: import.meta.env.VITE_CHAIN_ID ? chainName.toLowerCase().replace(/\s+/g, '-') : undefined,
  chainId: Number(import.meta.env.VITE_CHAIN_ID || '0'),
  name: chainName || '',
  currency: {
    decimals: Number(import.meta.env.VITE_CHAIN_CURRENCY_DECIMALS || '18'),
    name: import.meta.env.VITE_CHAIN_CURRENCY_NAME || 'Ether',
    symbol: import.meta.env.VITE_CHAIN_CURRENCY_SYMBOL || 'ETH',
  },
  rpcUrl: import.meta.env.VITE_CHAIN_RPC_URL || '',
  wsUrl: import.meta.env.VITE_CHAIN_WS_URL || '',
  blockExplorerBaseUrl: import.meta.env.VITE_CHAIN_BLOCK_EXPLORER_BASE_URL || undefined,
}

export const getNetworks = (): Network[] => {
  const networks: Network[] = []
  if (envConfig.chainId) {
    networks.push(envConfig)
  }

  if (!config) {
    return networks
  }

  config.networks.forEach((network: any) => {
    const networkConfig: Network = {
      id: network.name.toLowerCase().replace(/\s+/g, '-'),
      chainId: network.id,
      name: network.name,
      currency: {
        decimals: network.currency.decimals,
        name: network.currency.name,
        symbol: network.currency.symbol,
      },
      rpcUrl: network.rpcUrl,
      wsUrl: network.wsUrl,
      blockExplorerBaseUrl: network.blockExplorerBaseUrl,
    }
    networks.push(networkConfig)
  })

  return networks
}