import api from '../api' // Importa a instância do axios configurada
import { TeamMember, UserRole } from '@/types'

export const teamApi = {
    getAll: async () => {
        const response = await api.get<TeamMember[]>('/team')
        return response.data
    },

    getOne: async (id: string) => {
        const response = await api.get<TeamMember>(`/team/${id}`)
        return response.data
    },

    create: async (data: Partial<TeamMember> & { password?: string }) => {
        const response = await api.post<TeamMember>('/team', data)
        return response.data
    },

    update: async (id: string, data: Partial<TeamMember>) => {
        const response = await api.patch<TeamMember>(`/team/${id}`, data)
        return response.data
    },

    delete: async (id: string) => {
        await api.delete(`/team/${id}`)
    },
}
