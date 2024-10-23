
const {abi} = require('@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json');
import {ethers} from 'ethers'

import type { RawPositionType, SupportedChainsType } from '../types'

import mockData from './mock'

type EndpoinType = {
  infura: string
  uniNFTObserver: string
}

// TODO: move to backend server
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

const SUPPORTED_CHAINS: SupportedChainsType[] = ['Arbitrum', 'Base']

const MAX = "340282366920938463463374607431768211455"

export const useRequestPositions = async (userAddress: string): Promise<RawPositionType[]> => {
  return mockData
  const positions: RawPositionType[] = []

  for (const chain of SUPPORTED_CHAINS) {
    const infuraURL = `${ENDPOINTS[chain]['infura']}${process.env.INFURA_KEY}`
    const provider = new ethers.providers.JsonRpcProvider(infuraURL)
    const contract = new ethers.Contract(ENDPOINTS[chain]['uniNFTObserver'], abi, provider)

    const balance = await contract.balanceOf(userAddress)

    const tokenPromises = []

    for (let i = 0; i < balance; i++) {
      tokenPromises.push(contract.tokenOfOwnerByIndex(userAddress, i))
    }

    const tokenIds = await Promise.all(tokenPromises)

    const positionPromises = tokenIds.map((tokenId) => contract.positions(tokenId))
    const positionsData = await Promise.all(positionPromises)

    const feePromises = tokenIds.map((tokenId) => contract.callStatic.collect({
      tokenId,
      recipient: userAddress,
      amount0Max: MAX,
      amount1Max: MAX
    }))
    const feeData = await Promise.all(feePromises)

    positionsData.forEach((position, index) => {
      positions.push({ tokenId: tokenIds[index], ...position, chain, uncollectedFees: feeData[index] })
    })
  }

  return positions
}
