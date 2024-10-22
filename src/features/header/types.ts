import { TokenPricesType } from '../../types'

export type RawPricesType = {
  status: {
    error_code: number
  }
  data: Record<
  string,
  {
    symbol: string
    quote: {
      USD: {
        price: number
      }
    }
  }
  >
}

export { TokenPricesType }
