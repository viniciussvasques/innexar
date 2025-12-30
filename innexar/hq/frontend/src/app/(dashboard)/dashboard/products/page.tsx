'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

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

import { useQuery } from '@tanstack/react-query'
import { productsApi } from '@/lib/api/products'

import type { Product } from '@/types'
import { PageHeader } from '@/components/common/page-header'
import { StatsCard } from '@/components/common/stats-card'
import { StatusBadge } from '@/components/common/status-badge'

export default function ProductsPage() {
  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: () => productsApi.getAll(),
  })

  return (
    <div className="space-y-6">
      <PageHeader
        title="Produtos SaaS"
        description="Gerencie todos os produtos da INNEXAR"
      >
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Novo Produto
        </Button>
      </PageHeader>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatsCard
          title="Total de Produtos"
          value={products.length.toString()}
          icon={Package}
          description="1 ativo"
        />
        <StatsCard
          title="Clientes Totais"
          value={products.reduce((acc, p) => acc + p.totalUsers, 0).toLocaleString()}
          icon={Users}
          description="em todos os produtos"
        />
        <StatsCard
          title="Receita Total"
          value={formatCurrency(products.reduce((acc, p) => acc + p.totalRevenue, 0))}
          icon={DollarSign}
          description="neste mês"
        />
        <StatsCard
          title="Crescimento"
          value="+12.5%"
          icon={TrendingUp}
          description="vs. mês anterior"
          change={12.5}
        />
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
                <StatusBadge status={product.status} />
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

