import { http, createConfig } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { defineChain } from 'viem'
import { getNetworks } from './network'
import type { Chain } from 'viem'

export const getWagmiChains = (): readonly [Chain, ...Chain[]] => {
  const networks = getNetworks()
  const wagmiChains: Chain[] = []
  
  for (const network of networks) {
    const wagmiChain = defineChain({
      id: network.chainId,
      name: network.name,
      nativeCurrency: network.currency,
      rpcUrls: {
        default: { http: [network.rpcUrl] },
      },
      blockExplorers: {
        default: { name: 'Explorer', url: network.blockExplorerBaseUrl || '' },
      },
    })
    wagmiChains.push(wagmiChain)
  }
  return wagmiChains as unknown as readonly [Chain, ...Chain[]]
}

export const config = createConfig({
  chains: getWagmiChains(),
  connectors: [
    injected(),
  ],
  transports: getWagmiChains().reduce((transports, chain) => ({
    ...transports,
    [chain.id]: http(),
  }), {}),
})
