import { getTokenSymbol, getFormattedPrice } from '../index'

describe('shared - getTokenSymbol', () => {
  test('USDC', () => {
    expect(getTokenSymbol('Arbitrum', '0xaf88d065e77c8cc2239327c5edb3a432268e5831')).toBe('USDC')
  })

  test('WBTC', () => {
    expect(getTokenSymbol('Arbitrum', '0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f')).toBe('WBTC')
  })
})


describe('shared - getFormattedPrice', () => {
  test('3 digits', () => {
    expect(getFormattedPrice(100)).toBe('100')
  })

  test('4 digits', () => {
    expect(getFormattedPrice(1000)).toBe('1,000')
  })

  test('5 digits', () => {
    expect(getFormattedPrice(10000)).toBe('10,000')
  })

})
