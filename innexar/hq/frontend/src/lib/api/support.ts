import api from '../api'
import { Ticket } from '@/types'

export const supportApi = {
    getAll: async () => {
        const response = await api.get<Ticket[]>('/support')
        return response.data
    },

    getOne: async (id: string) => {
        const response = await api.get<Ticket>(`/support/${id}`)
        return response.data
    },

    create: async (data: Partial<Ticket>) => {
        const response = await api.post<Ticket>('/support', data)
        return response.data
    },

    update: async (id: string, data: Partial<Ticket>) => {
        const response = await api.patch<Ticket>(`/support/${id}`, data)
        return response.data
    },

    addMessage: async (id: string, content: string, isInternal: boolean = false) => {
        const response = await api.post(`/support/${id}/messages`, { content, isInternal })
        return response.data
    },
}
