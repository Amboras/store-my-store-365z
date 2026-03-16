'use client'

import { useQuery } from '@tanstack/react-query'
import { medusaClient } from '@/lib/medusa-client'

export function useCollections() {
  return useQuery({
    queryKey: ['collections'],
    queryFn: async () => {
      const response = await medusaClient.store.collection.list({
        limit: 100,
      })
      return response.collections
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
