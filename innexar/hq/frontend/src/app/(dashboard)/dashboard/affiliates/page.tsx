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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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
import { formatCurrency, formatDate } from '@/lib/utils'
import type { Affiliate } from '@/types'

// Mock data
const mockAffiliates: Affiliate[] = [
  {
    id: '1',
    name: 'Pedro Fernandes',
    email: 'pedro@example.com',
    phone: '(11) 98765-4321',
    document: '123.456.789-00',
    status: 'active',
    commission: 20,
    products: ['mecanica365'],
    totalSales: 45,
    totalCommission: 15400,
    createdAt: '2024-01-10',
    updatedAt: '2025-12-28',
  },
  {
    id: '2',
    name: 'Ana Costa',
    email: 'ana@example.com',
    phone: '(21) 91234-5678',
    status: 'active',
    commission: 25,
    products: ['mecanica365'],
    totalSales: 32,
    totalCommission: 11200,
    createdAt: '2024-02-15',
    updatedAt: '2025-12-27',
  },
  {
    id: '3',
    name: 'Ricardo Lima',
    email: 'ricardo@example.com',
    status: 'pending',
    commission: 20,
    products: [],
    totalSales: 0,
    totalCommission: 0,
    createdAt: '2025-12-20',
    updatedAt: '2025-12-20',
  },
]

export default function AffiliatesPage() {
  const [search, setSearch] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const { data: affiliates = mockAffiliates } = useQuery({
    queryKey: ['affiliates'],
    queryFn: async () => mockAffiliates,
  })

  const filteredAffiliates = affiliates.filter(
    (aff: Affiliate) =>
      aff.name.toLowerCase().includes(search.toLowerCase()) ||
      aff.email.toLowerCase().includes(search.toLowerCase())
  )

  const totalCommission = affiliates.reduce((acc: number, aff: Affiliate) => acc + aff.totalCommission, 0)
  const totalSales = affiliates.reduce((acc: number, aff: Affiliate) => acc + aff.totalSales, 0)
  const activeAffiliates = affiliates.filter((aff: Affiliate) => aff.status === 'active').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Afiliados</h1>
          <p className="text-muted-foreground">
            Gerencie afiliados de todos os produtos SaaS
          </p>
        </div>
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
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4" />
              Total de Afiliados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{affiliates.length}</div>
            <p className="text-xs text-muted-foreground">
              {activeAffiliates} ativos
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Total de Vendas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSales}</div>
            <p className="text-xs text-muted-foreground">vendas realizadas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Comissões Totais
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalCommission)}</div>
            <p className="text-xs text-muted-foreground">pagos até hoje</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {affiliates.filter((a: Affiliate) => a.status === 'pending').length}
            </div>
            <p className="text-xs text-muted-foreground">aguardando aprovação</p>
          </CardContent>
        </Card>
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
                    <Badge
                      variant={
                        affiliate.status === 'active'
                          ? 'success'
                          : affiliate.status === 'blocked'
                          ? 'destructive'
                          : 'secondary'
                      }
                    >
                      {affiliate.status === 'active'
                        ? 'Ativo'
                        : affiliate.status === 'blocked'
                        ? 'Bloqueado'
                        : 'Pendente'}
                    </Badge>
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

