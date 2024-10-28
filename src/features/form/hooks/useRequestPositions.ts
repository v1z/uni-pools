
const {abi} = require('@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json');
import {ethers} from 'ethers'

import type { HexValueType, RawPositionType, SupportedChainsType } from '../types'

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
  // return mockData
  const positions: RawPositionType[] = []

  for (const chain of SUPPORTED_CHAINS) {
    const infuraURL = `${ENDPOINTS[chain]['infura']}${process.env.INFURA_KEY}`
    const provider = new ethers.providers.JsonRpcProvider(infuraURL)
    const contract = new ethers.Contract(ENDPOINTS[chain]['uniNFTObserver'], abi, provider)

    const balance = await contract.balanceOf(userAddress)

    const tokenIdPromises: Promise<RawPositionType['tokenId']>[] = []

    for (let i = 0; i < balance; i++) {
      tokenIdPromises.push(contract.tokenOfOwnerByIndex(userAddress, i))
    }

    const tokenIds = await Promise.all(tokenIdPromises)

    const positionPromises: Promise<Omit<RawPositionType, 'tokenId'>>[] = tokenIds.map((tokenId) => contract.positions(tokenId))
    const positionsData = await Promise.all(positionPromises)

    const chainPostions: RawPositionType[] = positionsData.map((position, index) => ({ tokenId: tokenIds[index], ...position, chain }))

    const nonEmptyPositions = chainPostions.filter(({liquidity}) => liquidity._hex !== '0x00')
    const emptyPositions = chainPostions.filter(({liquidity}) => liquidity._hex === '0x00')

    // request fees only for nonEmptyPositons
    const feePromises = nonEmptyPositions
      .map(({tokenId}) => contract.callStatic.collect({
        tokenId,
        recipient: userAddress,
        amount0Max: MAX,
        amount1Max: MAX
      }))

    const feeData = await Promise.all(feePromises)

    const positionsWithFees = nonEmptyPositions
      .map((pos, index) => ({
        ...pos,
        uncollectedFees: feeData[index]
      }))

    positions.push(...positionsWithFees, ...emptyPositions)
  }

  return positions
}
