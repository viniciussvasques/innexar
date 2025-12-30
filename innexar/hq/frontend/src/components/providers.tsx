'use client'

import { QueryClient, QueryClientProvider, QueryCache, MutationCache } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from '@/hooks/use-toast'

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error) => {
            toast({
              variant: "destructive",
              title: "Erro ao carregar dados",
              description: error.message || "Ocorreu um erro inesperado.",
            })
          },
        }),
        mutationCache: new MutationCache({
          onError: (error) => {
            toast({
              variant: "destructive",
              title: "Erro na operação",
              description: error.message || "Não foi possível concluir a ação.",
            })
          },
        }),
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minuto
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

