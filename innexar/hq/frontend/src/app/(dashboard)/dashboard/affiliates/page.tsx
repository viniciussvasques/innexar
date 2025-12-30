'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Plus, Search, Edit, Trash2, DollarSign, TrendingUp, Users } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import type { Affiliate } from '@/types'
import { affiliatesApi } from '@/lib/api/affiliates'
import { PageHeader } from '@/components/common/page-header'
import { StatsCard } from '@/components/common/stats-card'
import { StatusBadge } from '@/components/common/status-badge'

export default function AffiliatesPage() {
  const [search, setSearch] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const { data: affiliates = [] } = useQuery<Affiliate[]>({
    queryKey: ['affiliates'],
    queryFn: () => affiliatesApi.getAll(),
  })

  const filteredAffiliates = affiliates.filter(
    (aff) =>
      aff.name.toLowerCase().includes(search.toLowerCase()) ||
      aff.email.toLowerCase().includes(search.toLowerCase())
  )

  const totalCommission = affiliates.reduce((acc, aff) => acc + (aff.totalCommission || 0), 0)
  const totalSales = affiliates.reduce((acc, aff) => acc + (aff.totalSales || 0), 0)
  const activeAffiliates = affiliates.filter((aff) => aff.status === 'active').length

  const stats = [
    {
      title: 'Total de Afiliados',
      value: affiliates.length.toString(),
      icon: Users,
      description: `${activeAffiliates} ativos`
    },
    {
      title: 'Total de Vendas',
      value: totalSales.toString(),
      icon: TrendingUp,
      description: 'vendas realizadas'
    },
    {
      title: 'Comissões Totais',
      value: formatCurrency(totalCommission),
      icon: DollarSign,
      description: 'pagos até hoje'
    },
    {
      title: 'Pendentes',
      value: affiliates.filter((a) => a.status === 'pending').length.toString(),
      icon: Users,
      description: 'aguardando aprovação'
    }
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Afiliados"
        description="Gerencie afiliados de todos os produtos SaaS"
      >
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo Afiliado
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Novo Afiliado</DialogTitle>
              <DialogDescription>
                Cadastre um novo afiliado para promover os produtos INNEXAR
              </DialogDescription>
            </DialogHeader>
            <form className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" required>Nome Completo</Label>
                  <Input id="name" placeholder="João Silva" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" required>Email</Label>
                  <Input id="email" type="email" placeholder="joao@example.com" />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" placeholder="(11) 98765-4321" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="document">CPF/CNPJ</Label>
                  <Input id="document" placeholder="000.000.000-00" />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="commission" required>Comissão (%)</Label>
                  <Input id="commission" type="number" placeholder="20" min="0" max="100" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="products" required>Produtos</Label>
                  <Input id="products" placeholder="Mecânica365" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">Salvar</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </PageHeader>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((stat, i) => (
          <StatsCard
            key={i}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            description={stat.description}
          />
        ))}
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Lista de Afiliados</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar afiliado..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Afiliado</TableHead>
                <TableHead>Produtos</TableHead>
                <TableHead>Comissão</TableHead>
                <TableHead>Vendas</TableHead>
                <TableHead>Total Ganho</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAffiliates.map((affiliate: Affiliate) => (
                <TableRow key={affiliate.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{affiliate.name}</div>
                      <div className="text-sm text-muted-foreground">{affiliate.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {affiliate.products.length > 0 ? (
                      <div className="flex gap-1">
                        {affiliate.products.map((product: string) => (
                          <Badge key={product} variant="outline">
                            {product}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">Nenhum</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{affiliate.commission}%</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{affiliate.totalSales}</TableCell>
                  <TableCell className="font-medium text-green-600">
                    {formatCurrency(affiliate.totalCommission)}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={affiliate.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

