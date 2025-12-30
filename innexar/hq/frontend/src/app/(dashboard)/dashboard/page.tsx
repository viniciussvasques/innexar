'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  DollarSign,
  Users,
  UserPlus,
  Package,
  TrendingUp,
  TrendingDown,
  ArrowRight,
} from 'lucide-react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { formatCurrency, formatPercentage } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

// Mock data - Substituir por dados reais da API
const stats = [
  {
    title: 'Receita Total',
    value: 'R$ 127.450',
    change: +12.5,
    icon: DollarSign,
    description: 'vs. mês anterior',
  },
  {
    title: 'Clientes Ativos',
    value: '2.847',
    change: +8.3,
    icon: Users,
    description: 'em todos os produtos',
  },
  {
    title: 'Afiliados',
    value: '184',
    change: +5.2,
    icon: UserPlus,
    description: 'gerando vendas',
  },
  {
    title: 'Produtos SaaS',
    value: '1',
    change: 0,
    icon: Package,
    description: 'Mecânica365',
  },
]

const revenueData = [
  { month: 'Jan', value: 85000 },
  { month: 'Fev', value: 92000 },
  { month: 'Mar', value: 98000 },
  { month: 'Abr', value: 105000 },
  { month: 'Mai', value: 115000 },
  { month: 'Jun', value: 127450 },
]

const productsData = [
  { name: 'Mecânica365', value: 127450, color: '#3B82F6' },
  { name: 'Futuros SaaS', value: 0, color: '#64748B' },
]

const recentActivities = [
  { type: 'sale', text: 'Nova venda - Plano Pro', time: 'há 5 minutos' },
  { type: 'affiliate', text: 'Novo afiliado cadastrado', time: 'há 1 hora' },
  { type: 'support', text: 'Ticket #1234 resolvido', time: 'há 2 horas' },
  { type: 'user', text: '5 novos clientes', time: 'há 3 horas' },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Visão geral de todos os produtos e serviços INNEXAR
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  {stat.change > 0 ? (
                    <>
                      <TrendingUp className="h-3 w-3 text-green-500" />
                      <span className="text-green-500">
                        {formatPercentage(stat.change)}
                      </span>
                    </>
                  ) : stat.change < 0 ? (
                    <>
                      <TrendingDown className="h-3 w-3 text-red-500" />
                      <span className="text-red-500">
                        {formatPercentage(stat.change)}
                      </span>
                    </>
                  ) : (
                    <span>—</span>
                  )}
                </span>
                <span>{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Revenue Chart */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Receita Mensal</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="month"
                  className="text-xs"
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis
                  className="text-xs"
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  tickFormatter={(value) =>
                    formatCurrency(value).replace('R$', 'R$').slice(0, -3) + 'k'
                  }
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 text-sm"
                >
                  <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                  <div className="flex-1">
                    <p className="font-medium">{activity.text}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="mt-4 w-full" asChild>
              <Link href="/dashboard/support">
                Ver todas
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Products */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Produtos SaaS</CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/products">
                Ver todos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {/* Mecânica365 */}
            <div className="rounded-lg border p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Mecânica365</h3>
                <Badge variant="success">Ativo</Badge>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Clientes</p>
                  <p className="text-xl font-bold">2.847</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Receita</p>
                  <p className="text-xl font-bold">R$ 127k</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Tickets</p>
                  <p className="text-xl font-bold">12</p>
                </div>
              </div>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/dashboard/products/mecanica365">
                  Gerenciar
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Placeholder para futuros SaaS */}
            <div className="rounded-lg border border-dashed p-4 flex items-center justify-center">
              <div className="text-center space-y-2">
                <Package className="h-12 w-12 mx-auto text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Adicionar novo produto SaaS
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

