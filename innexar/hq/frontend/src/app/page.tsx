'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'

export default function HomePage() {
  const router = useRouter()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard')
    } else {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="mt-4 text-sm text-muted-foreground">Carregando...</p>
      </div>
    </div>
  )
}

