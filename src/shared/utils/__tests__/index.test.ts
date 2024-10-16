import { getTokenSymbol } from '../index'

describe('shared - getTokenSymbol', () => {
  test('USDC', () => {
    expect(getTokenSymbol('Arbitrum', '0xaf88d065e77c8cc2239327c5edb3a432268e5831')).toBe('USDC')
  })

  test('WBTC', () => {
    expect(getTokenSymbol('Arbitrum', '0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f')).toBe('WBTC')
  })
})
