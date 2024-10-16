import axios from 'axios'

import type { PricesPayloadType, RawPricesType } from '../types'

import mockData from './mock'

const ENDPOINT = 'https://uni-server-artem-glukhanko.vercel.app/api/get-token-prices'

export const useRequestTokenPrices = async (): Promise<PricesPayloadType> => {
  const rawData = mockData as RawPricesType
  // const rawData = await axios.get(ENDPOINT)
  //   .then(res => res.data) as RawPricesType

  const result: PricesPayloadType = {
    BTC: undefined,
    ETH: undefined,
  }

  if (rawData.status.error_code === 0) {
    const prices = Object.keys(rawData.data).reduce((acc, key) => {
      const data = rawData.data[key]

      return { ...acc, [data.symbol]: Math.round(data.quote.USD.price) }
    }, {} as PricesPayloadType)

    result['BTC'] = prices['BTC']
    result['ETH'] = prices['ETH']
  }

  return result
}
