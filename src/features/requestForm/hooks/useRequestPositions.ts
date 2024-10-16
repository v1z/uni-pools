import type { RawPositionType, SupportedChainsType } from '../types'

import mockData from './mock'
const ethers = require('ethers')

type EndpoinType = {
  infura: string
  uniNFTObserver: string
}

const ENDPOINTS: Record<SupportedChainsType, EndpoinType> = {
  Base: {
    infura: 'https://base-mainnet.infura.io/v3/',
    uniNFTObserver: '0x03a520b32C04BF3bEEf7BEb72E919cf822Ed34f1',
  },
  Arbitrum: {
    infura: 'https://arbitrum-mainnet.infura.io/v3/',
    uniNFTObserver: '0xc36442b4a4522e871399cd717abdd847ab11fe88',
  },
}

const CONTRACT_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)',
  'function positions(uint256 tokenId) view returns (uint96 nonce, address operator, address token0, address token1, uint24 fee, int24 tickLower, int24 tickUpper, uint128 liquidity, uint256 feeGrowthInside0LastX128, uint256 feeGrowthInside1LastX128, uint128 tokensOwed0, uint128 tokensOwed1)',
]

const SUPPORTED_CHAINS: SupportedChainsType[] = ['Arbitrum', 'Base']

export const useRequestPositions = async (userAddress: string): Promise<RawPositionType[]> => {
  return mockData
  const positions: RawPositionType[] = []

  for (const chain of SUPPORTED_CHAINS) {
    const infuraURL = `${ENDPOINTS[chain]['infura']}${process.env.INFURA_KEY}`
    const provider = new ethers.providers.JsonRpcProvider(infuraURL)
    const contract = new ethers.Contract(ENDPOINTS[chain]['uniNFTObserver'], CONTRACT_ABI, provider)

    const balance = await contract.balanceOf(userAddress)

    const tokenPromises = []

    for (let i = 0; i < balance; i++) {
      tokenPromises.push(contract.tokenOfOwnerByIndex(userAddress, i))
    }

    const tokenIds = await Promise.all(tokenPromises)

    const positionPromises = tokenIds.map((tokenId) => contract.positions(tokenId))

    const positionsData = await Promise.all(positionPromises)

    positionsData.forEach((position, index) => {
      positions.push({ tokenId: tokenIds[index], ...position, chain })
    })
  }

  return positions
}
