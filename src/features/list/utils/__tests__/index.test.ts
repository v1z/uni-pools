import { sortByPool, sortPositions } from '../index'

const testPositions = [
  {
    chain: 'Arbitrum',
    token0: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
    token1: '0x4200000000000000000000000000000000000006',
    fee: 0.05,
  },
  {
    chain: 'Arbitrum',
    token0: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
    token1: '0x4200000000000000000000000000000000000006',
    fee: 0.05,
  },
  {
    chain: 'Base',
    token0: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    token1: '0x4200000000000000000000000000000000000006',
    fee: 0.15,
  },
]

const expectedSortByPool = {
  'USDC / ETH - 0.05%': [
    {
      chain: 'Arbitrum',
      token0: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
      token1: '0x4200000000000000000000000000000000000006',
      fee: 0.05,
    },
    {
      chain: 'Arbitrum',
      token0: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
      token1: '0x4200000000000000000000000000000000000006',
      fee: 0.05,
    },
  ],
  'USDC / ETH - 0.15%': [
    {
      chain: 'Base',
      token0: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
      token1: '0x4200000000000000000000000000000000000006',
      fee: 0.15,
    },
  ],
}

test('list - sortByPool', () => {
  expect(sortByPool(testPositions)).toEqual(expectedSortByPool)
})

const expectedSortedPositions = {
  Arbitrum: {
    'USDC / ETH - 0.05%': [
      {
        chain: 'Arbitrum',
        token0: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
        token1: '0x4200000000000000000000000000000000000006',
        fee: 0.05,
      },
      {
        chain: 'Arbitrum',
        token0: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
        token1: '0x4200000000000000000000000000000000000006',
        fee: 0.05,
      },
    ],
  },
  Base: {
    'USDC / ETH - 0.15%': [
      {
        chain: 'Base',
        token0: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
        token1: '0x4200000000000000000000000000000000000006',
        fee: 0.15,
      },
    ],
  },
}

test('list - sortPositions', () => {
  expect(sortPositions(testPositions)).toEqual(expectedSortByPool)
})
