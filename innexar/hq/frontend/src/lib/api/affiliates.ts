import { api } from '@/lib/api'
import type { Affiliate } from '@/types'

export const affiliatesApi = {
    getAll: async (): Promise<Affiliate[]> => {
        const { data } = await api.get('/affiliates')
        return data
    },

    getById: async (id: string): Promise<Affiliate> => {
        const { data } = await api.get(`/affiliates/${id}`)
        return data
    },

    create: async (data: any) => {
        const response = await api.post<Affiliate>('/affiliates', data);
        return response.data;
    },

    update: async (id: string, data: any) => {
        const response = await api.patch<Affiliate>(`/affiliates/${id}`, data);
        return response.data;
    },

    delete: async (id: string) => {
        await api.delete(`/affiliates/${id}`);
    },
};
