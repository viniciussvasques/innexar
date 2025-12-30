import { api } from '@/lib/api'
import type { Plan, Subscription, Invoice } from '@/types'

export const billingApi = {
    getAllPlans: async (): Promise<Plan[]> => {
        const { data } = await api.get('/billing/plans')
        return data
    },

    createPlan: async (payload: Partial<Plan>): Promise<Plan> => {
        const { data } = await api.post('/billing/plans', payload)
        return data
    },

    getAllSubscriptions: async (): Promise<Subscription[]> => {
        const { data } = await api.get('/billing/subscriptions')
        return data
    },

    getAllInvoices: async (): Promise<Invoice[]> => {
        const { data } = await api.get('/billing/invoices')
        return data
    },
}
