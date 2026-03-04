import { http, createConfig } from 'wagmi'
import { mainnet, base } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'
import { defineChain } from 'viem'
import { chainConfig } from './chain'

export const customChain = defineChain({
  id: chainConfig.chainId,
  name: chainConfig.name,
  nativeCurrency: chainConfig.nativeCurrency,
  rpcUrls: {
    default: { http: [chainConfig.rpcUrl] },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: chainConfig.blockExplorerUrl },
  },
})

export const config = createConfig({
  chains: [mainnet, base, customChain],
  connectors: [
    injected(),
  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
    [customChain.id]: http(),
  },
})
