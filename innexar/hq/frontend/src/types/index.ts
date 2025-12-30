export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  createdAt: string
  updatedAt: string
}

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  SUPPORT = 'SUPPORT',
  MARKETING = 'MARKETING',
  FINANCE = 'FINANCE',
  DEV = 'DEV',
}

export interface TeamMember extends User {
  status: 'active' | 'inactive'
  lastLogin?: string
  permissions: string[]
}

export interface Affiliate {
  id: string
  name: string
  email: string
  phone?: string
  document?: string
  status: 'active' | 'pending' | 'blocked'
  commission: number
  products: string[]
  totalSales: number
  totalCommission: number
  createdAt: string
  updatedAt: string
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  status: 'active' | 'inactive' | 'development'
  url: string
  logo?: string
  color?: string
  totalUsers: number
  totalRevenue: number
  createdAt: string
  updatedAt: string
}

export interface Ticket {
  id: string
  title: string
  description: string
  status: 'open' | 'in_progress' | 'resolved' | 'closed'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  productId: string
  userId?: string
  assignedTo?: string
  createdAt: string
  updatedAt: string
}

export interface Campaign {
  id: string
  name: string
  type: 'email' | 'sms' | 'push' | 'banner'
  status: 'draft' | 'scheduled' | 'active' | 'paused' | 'completed'
  productIds: string[]
  targetAudience: string
  startDate?: string
  endDate?: string
  totalSent: number
  totalClicks: number
  totalConversions: number
  createdAt: string
  updatedAt: string
}

export interface Transaction {
  id: string
  type: 'sale' | 'commission' | 'refund'
  amount: number
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  productId: string
  affiliateId?: string
  userId?: string
  description: string
  createdAt: string
  updatedAt: string
}

export interface DashboardStats {
  totalRevenue: number
  totalUsers: number
  totalAffiliates: number
  totalProducts: number
  monthlyRevenue: number
  monthlyGrowth: number
  activeTickets: number
  pendingCommissions: number
  revenueByProduct: Array<{ name: string; value: number }>
  revenueByMonth: Array<{ month: string; value: number }>
  topAffiliates: Array<{ name: string; sales: number; commission: number }>
}

