
const chainName = import.meta.env.VITE_CHAIN_NAME
export const chainConfig = {
  id: chainName.toLowerCase().replace(/\s+/g, '-'),
  chainId: Number(import.meta.env.VITE_CHAIN_ID),
  name: chainName,
  nativeCurrency: {
    decimals: 18,
    name: import.meta.env.VITE_CHAIN_SYMBOL,
    symbol: import.meta.env.VITE_CHAIN_SYMBOL,
  },
  rpcUrl: import.meta.env.VITE_CHAIN_RPC_URL,
  wsUrl: import.meta.env.VITE_CHAIN_WS_URL,
  blockExplorerUrl: import.meta.env.VITE_CHAIN_BLOCK_EXPLORER_URL,
}
