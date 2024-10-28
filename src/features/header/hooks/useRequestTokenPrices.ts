import axios from 'axios'

import type { TokenPricesType, RawPricesType } from '../types'

import mockData from './mock'

const ENDPOINT = 'https://uni-server-artem-glukhanko.vercel.app/api/get-token-prices'

export const useRequestTokenPrices = async (): Promise<TokenPricesType> => {
  // const rawData = mockData as RawPricesType
  const rawData = await axios.get(ENDPOINT)
    .then(res => res.data) as RawPricesType

  const result: TokenPricesType = {
    BTC: undefined,
    ETH: undefined,
    USD: 1,
  }

  if (rawData.status.error_code === 0) {
    const prices = Object.keys(rawData.data).reduce((acc, key) => {
      const data = rawData.data[key]

      return { ...acc, [data.symbol]: Math.round(data.quote.USD.price) }
    }, {} as TokenPricesType)

    result['BTC'] = prices['BTC']
    result['ETH'] = prices['ETH']
  }

  return result
}
