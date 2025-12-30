// INNEXAR API Client

const getApiUrl = () => process.env.NEXT_PUBLIC_API_URL || 'https://apiaf.innexar.app';
const getToken = () => typeof window !== 'undefined' ? localStorage.getItem('innexar_token') : null;

async function fetchApi<T = unknown>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = getToken();

    const response = await fetch(`${getApiUrl()}/api${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
            ...options.headers,
        },
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Erro na requisição' }));
        throw new Error(error.message || 'Erro na requisição');
    }

    return response.json();
}

export const innexarApi = {
    // Auth
    login: (email: string, password: string) =>
        fetchApi('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        }),

    register: (data: unknown) =>
        fetchApi('/auth/register', {
            method: 'POST',
            body: JSON.stringify(data)
        }),

    getMe: () => fetchApi('/auth/me'),

    // Stats
    getStats: () => fetchApi('/affiliate/stats'),

    // Links
    getLinks: () => fetchApi('/affiliate/links'),
    createLink: (productId: string, customSlug?: string) =>
        fetchApi('/affiliate/links', {
            method: 'POST',
            body: JSON.stringify({ productId, customSlug })
        }),
    deleteLink: (linkId: string) =>
        fetchApi(`/affiliate/links/${linkId}`, { method: 'DELETE' }),

    // Products
    getProducts: () => fetchApi('/products'),
    getProduct: (id: string) => fetchApi(`/products/${id}`),

    // Commissions
    getCommissions: (status?: string) =>
        fetchApi(`/affiliate/commissions${status ? `?status=${status}` : ''}`),

    // Profile
    getProfile: () => fetchApi('/affiliate/profile'),
    updateProfile: (data: unknown) =>
        fetchApi('/affiliate/profile', {
            method: 'PUT',
            body: JSON.stringify(data)
        }),

    // Withdrawals
    getWithdrawals: () => fetchApi('/affiliate/withdrawals'),
    requestWithdrawal: (amount: number) =>
        fetchApi('/affiliate/withdrawals', {
            method: 'POST',
            body: JSON.stringify({ amount })
        }),
};

// Legacy export for compatibility
export const affiliateApi = innexarApi;

export default innexarApi;
