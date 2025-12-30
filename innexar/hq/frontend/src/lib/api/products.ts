import { api } from '@/lib/api'
import type { Product } from '@/types'

export const productsApi = {
    getAll: async (): Promise<Product[]> => {
        const { data } = await api.get('/products')
        return data
    },

    getById: async (id: string): Promise<Product> => {
        const { data } = await api.get(`/products/${id}`)
        return data
    },

    create: async (payload: Partial<Product>): Promise<Product> => {
        const { data } = await api.post('/products', payload)
        return data
    },

    update: async (id: string, payload: Partial<Product>): Promise<Product> => {
        const { data } = await api.patch(`/products/${id}`, payload)
        return data
    },

    delete: async (id: string): Promise<void> => {
        return api.delete(`/products/${id}`)
    }
}
