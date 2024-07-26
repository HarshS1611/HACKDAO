'use client'

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = '5623bd8168bfc38eb8524655b6647f7c'

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com'
}
const arbitrumTestnet = {
  chainId: 421614,
  name: 'Arbitrum Sepolia',
  currency: 'ETH',
  explorerUrl: 'https://sepolia-explorer.arbitrum.io',
  rpcUrl: 'https://arbitrum-sepolia.blockpi.network/v1/rpc/public '
};

const gnosisTestnet = {
  chainId: 10200,
  name: 'Gnosis Chiado Testnet',
  currency: 'XDAI',
  explorerUrl: 'https://rpc.chiadochain.net',
  rpcUrl: 'https://blockscout.chiadochain.net'
};

const coreTestnet = {
  chainId: 1115,
  name: 'Core testnet',
  currency: 'tCORE',
  explorerUrl: 'https://cchain.explorer.avax-test.network',
  rpcUrl: 'https://rpc.test.btcs.network'
};

const morphTestnet = {
  chainId: 2710,
  name: 'Morph testnet',
  currency: 'ETH',
  explorerUrl: 'https://explorer-testnet.morphl2.io',
  rpcUrl: 'https://rpc-testnet.morphl2.io'
}

const availTestnet = {
  chainId: 202402021700,
  name: 'Avail testnet',
  currency: 'ETH',
  explorerUrl: 'https://op-avail-sepolia-explorer.alt.technology:443',
  rpcUrl: 'https://op-avail-sepolia.alt.technology'
};

const filcoinTestnet = {
  chainId: 314159,
  name: 'Filcoin testnet',
  currency: 'tFIL',
  explorerUrl: 'https://calibration.filscan.io',
  rpcUrl: 'https://calibration.filfox.info/rpc/v1'
}

// 3. Create a metadata object
const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'https://mywebsite.com', // origin must match your domain & subdomain
  icons: ['https://avatars.mywebsite.com/']
}
// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl: '...', // used for the Coinbase SDK
  defaultChainId: 1, // used for the Coinbase SDK
})

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains: [mainnet,arbitrumTestnet,gnosisTestnet,availTestnet,morphTestnet,filcoinTestnet,coreTestnet],
  projectId,
  allowUnsupportedChain: true,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true // Optional - false as default
})
//@ts-ignore
export function Web3Modal({ children }) {
  return children
}