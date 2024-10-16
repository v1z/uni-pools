import { PricesPayloadType } from '../../store/slices/pricesSlice'

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

export { PricesPayloadType }
