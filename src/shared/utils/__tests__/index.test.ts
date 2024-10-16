import { getTokenSymbol } from '../index'

test('shared - getTokenSymbol', () => {
  expect(getTokenSymbol('Arbitrum', '0xaf88d065e77c8cC2239327C5EDb3A432268e5831')).toBe('USDC')
})
