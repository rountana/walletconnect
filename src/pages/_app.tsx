import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, polygon } from 'wagmi/chains'
import HomePage from "./HomePage"
import { Web3Button } from '@web3modal/react'


const chains = [arbitrum, mainnet, polygon]
const projectId = 'ff77176108081bc0d4a96df0ad16b404'

const { provider } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider
})
const ethereumClient = new EthereumClient(wagmiClient, chains)

export default function App({ Component, pageProps }: AppProps) {
  return (
  <>
    <Component {...pageProps} />
    <WagmiConfig client={wagmiClient}>
        <HomePage />
      </WagmiConfig>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />

      <Web3Button />

  </>
  
)}
