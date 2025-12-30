'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  Users,
  DollarSign,
  TrendingUp,
  ArrowLeft,
  ExternalLink,
  Headphones,
  Activity,
} from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'

const stats = {
  totalUsers: 2847,
  totalRevenue: 127450,
  monthlyGrowth: 12.5,
  activeTickets: 12,
  churnRate: 2.3,
}

const recentUsers = [
  { id: '1', name: 'Oficina XYZ', email: 'contato@oficinaxyz.com', plan: 'Pro', status: 'active', createdAt: '2025-12-28' },
  { id: '2', name: 'Mecânica ABC', email: 'contato@mecanicaabc.com', plan: 'Basic', status: 'active', createdAt: '2025-12-27' },
  { id: '3', name: 'Auto Center 123', email: 'contato@autocenter123.com', plan: 'Pro', status: 'trial', createdAt: '2025-12-26' },
]

export default function Mecanica365DetailPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/products">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Mecânica365</h1>
            <p className="text-muted-foreground">
              ERP para gestão de oficinas mecânicas
            </p>
          </div>
        </div>
        <Button variant="outline" asChild>
          <a href="https://admin.mecanica365.com" target="_blank" rel="noopener noreferrer">
            Admin Completo
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4" />
              Clientes Ativos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {stats.churnRate}% churn rate
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Receita Mensal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
            <p className="text-xs text-green-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +{stats.monthlyGrowth}% vs. mês anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Headphones className="h-4 w-4" />
              Tickets Abertos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeTickets}</div>
            <p className="text-xs text-muted-foreground">necessitam atenção</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="success" className="text-lg px-4 py-2">Online</Badge>
            <p className="text-xs text-muted-foreground mt-2">Sistema operacional</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Users */}
      <Card>
        <CardHeader>
          <CardTitle>Clientes Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Plano</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Cadastro</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.plan}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === 'active' ? 'success' : user.status === 'trial' ? 'secondary' : 'destructive'}>
                      {user.status === 'active' ? 'Ativo' : user.status === 'trial' ? 'Trial' : 'Inativo'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(user.createdAt)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Gestão Avançada</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Acesse o painel completo para gestão detalhada de tenants, planos e configurações.
            </p>
            <Button variant="outline" className="w-full" asChild>
              <a href="https://admin.mecanica365.com" target="_blank" rel="noopener noreferrer">
                Abrir Admin Completo
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Suporte</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Visualize e gerencie tickets de suporte relacionados ao Mecânica365.
            </p>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/dashboard/support">
                Ver Tickets
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Relatórios</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Gere relatórios detalhados de receita, clientes e crescimento.
            </p>
            <Button variant="outline" className="w-full">
              Gerar Relatório
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

