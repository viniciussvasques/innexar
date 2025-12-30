import api from '../api'
import { Campaign } from '@/types'

export const marketingApi = {
    getAllCampaigns: async () => {
        const response = await api.get<Campaign[]>('/marketing/campaigns')
        return response.data
    },

    getOneCampaign: async (id: string) => {
        const response = await api.get<Campaign>(`/marketing/campaigns/${id}`)
        return response.data
    },

    createCampaign: async (data: Partial<Campaign>) => {
        const response = await api.post<Campaign>('/marketing/campaigns', data)
        return response.data
    },

    updateCampaign: async (id: string, data: Partial<Campaign>) => {
        const response = await api.patch<Campaign>(`/marketing/campaigns/${id}`, data)
        return response.data
    },

    // Leads endpoints can be added here
}
