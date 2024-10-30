import React from 'react'
import { Skeleton } from '../../../shared/components/Skeleton'

export const Skeletons = () => {
  return (
    <>
      <Skeleton height="44px" width="150px" marginBottom="8px" />
      <Skeleton height="80px" width="100%" marginBottom="24px" />

      <Skeleton height="44px" width="150px" marginBottom="8px" />
      <Skeleton height="240px" width="100%" />
    </>
  )
}
