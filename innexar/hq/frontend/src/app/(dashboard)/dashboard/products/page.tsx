'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Package,
  Users,
  DollarSign,
  TrendingUp,
  ArrowRight,
  ExternalLink,
  Plus,
} from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

const products = [
  {
    id: 'mecanica365',
    name: 'Mecânica365',
    slug: 'mecanica365',
    description: 'ERP para gestão de oficinas mecânicas',
    status: 'active',
    url: 'https://admin.mecanica365.com',
    color: '#3B82F6',
    totalUsers: 2847,
    totalRevenue: 127450,
    monthlyGrowth: 12.5,
    activeTickets: 12,
  },
]

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Produtos SaaS</h1>
          <p className="text-muted-foreground">
            Gerencie todos os produtos da INNEXAR
          </p>
        </div>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Novo Produto
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Produtos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
            <p className="text-xs text-muted-foreground">1 ativo</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Clientes Totais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {products.reduce((acc, p) => acc + p.totalUsers, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">em todos os produtos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(products.reduce((acc, p) => acc + p.totalRevenue, 0))}
            </div>
            <p className="text-xs text-muted-foreground">neste mês</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Crescimento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+12.5%</div>
            <p className="text-xs text-muted-foreground">vs. mês anterior</p>
          </CardContent>
        </Card>
      </div>

      {/* Products Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div
              className="h-2"
              style={{ backgroundColor: product.color }}
            />
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${product.color}20` }}
                  >
                    <Package className="h-6 w-6" style={{ color: product.color }} />
                  </div>
                  <div>
                    <CardTitle>{product.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{product.description}</p>
                  </div>
                </div>
                <Badge variant="success">{product.status === 'active' ? 'Ativo' : 'Inativo'}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="h-3 w-3" />
                    Clientes
                  </div>
                  <div className="text-xl font-bold">{product.totalUsers.toLocaleString()}</div>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <DollarSign className="h-3 w-3" />
                    Receita
                  </div>
                  <div className="text-xl font-bold">
                    {formatCurrency(product.totalRevenue).replace('R$', 'R$').slice(0, -3)}k
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <TrendingUp className="h-3 w-3" />
                    Crescimento
                  </div>
                  <div className="text-xl font-bold text-green-600">
                    +{product.monthlyGrowth}%
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button asChild variant="default" className="flex-1">
                  <Link href={`/dashboard/products/${product.slug}`}>
                    Gerenciar
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <a href={product.url} target="_blank" rel="noopener noreferrer">
                    Admin Completo
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Add New Product Card */}
        <Card className="border-dashed">
          <CardContent className="flex min-h-[300px] items-center justify-center">
            <div className="text-center space-y-3">
              <div className="mx-auto h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                <Plus className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">Adicionar Novo Produto</p>
                <p className="text-sm text-muted-foreground">
                  Expanda o portfólio da INNEXAR
                </p>
              </div>
              <Button variant="outline">
                Criar Produto
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

