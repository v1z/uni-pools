
import axios from 'axios'

import type { RawPositionType } from '../types'

import mockData from './mock'

const API_ENDPOINT = `${process.env.ENDPOINT}/get-positions`

export const useRequestPositions = async (userAddress: string): Promise<RawPositionType[]> => {
  // return new Promise((res) => setTimeout(() => {
  //   return res(mockData)
  // }, 2500))

  const response = await axios.post(API_ENDPOINT, {
    userAddress
  })

  return response.data
}
