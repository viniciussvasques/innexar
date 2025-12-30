import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import api from '@/lib/api'
import type { User } from '@/types'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  checkAuth: () => Promise<void>
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true })
        try {
          const response = await api.post('/auth/login', { email, password })
          const { user, token } = response.data

          localStorage.setItem('token', token)
          set({ user, token, isAuthenticated: true, isLoading: false })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      logout: () => {
        localStorage.removeItem('token')
        set({ user: null, token: null, isAuthenticated: false })
      },

      checkAuth: async () => {
        const token = localStorage.getItem('token')
        if (!token) {
          set({ isAuthenticated: false })
          return
        }

        try {
          const response = await api.get('/auth/me')
          set({ user: response.data, isAuthenticated: true, token })
        } catch {
          localStorage.removeItem('token')
          set({ user: null, token: null, isAuthenticated: false })
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
)

