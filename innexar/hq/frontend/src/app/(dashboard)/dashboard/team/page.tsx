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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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
import { Textarea } from '@/components/ui/textarea'
import { Plus, Search, Edit, Trash2, Mail, Shield } from 'lucide-react'
import { formatDate, getInitials } from '@/lib/utils'
import type { TeamMember, UserRole } from '@/types'
import { teamApi } from '@/lib/api/team'

const roleColors: Record<UserRole, string> = {
  SUPER_ADMIN: 'destructive',
  ADMIN: 'default',
  SUPPORT: 'secondary',
  MARKETING: 'outline',
  FINANCE: 'outline',
  DEV: 'outline',
}

const roleLabels: Record<UserRole, string> = {
  SUPER_ADMIN: 'Super Admin',
  ADMIN: 'Admin',
  SUPPORT: 'Suporte',
  MARKETING: 'Marketing',
  FINANCE: 'Financeiro',
  DEV: 'Desenvolvedor',
}

export default function TeamPage() {
  const [search, setSearch] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const { data: members = [] } = useQuery({
    queryKey: ['team'],
    queryFn: () => teamApi.getAll(),
  })

  const filteredMembers = members.filter(
    (member: TeamMember) =>
      member.name.toLowerCase().includes(search.toLowerCase()) ||
      member.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Equipe</h1>
          <p className="text-muted-foreground">
            Gerencie os funcionários da INNEXAR
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Funcionário
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Novo Funcionário</DialogTitle>
              <DialogDescription>
                Adicione um novo membro à equipe INNEXAR
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
                  <Input id="email" type="email" placeholder="joao@innexar.app" />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="role" required>Cargo/Função</Label>
                  <Input id="role" placeholder="ex: Admin, Suporte" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" required>Senha</Label>
                  <Input id="password" type="password" placeholder="••••••••" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="permissions">Permissões</Label>
                <Textarea
                  id="permissions"
                  placeholder="Descreva as permissões..."
                  rows={3}
                />
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
            <CardTitle className="text-sm font-medium">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{members.length}</div>
            <p className="text-xs text-muted-foreground">funcionários ativos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Admins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {members.filter((m: TeamMember) => m.role === 'ADMIN' || m.role === 'SUPER_ADMIN').length}
            </div>
            <p className="text-xs text-muted-foreground">com acesso total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Suporte</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {members.filter((m: TeamMember) => m.role === 'SUPPORT').length}
            </div>
            <p className="text-xs text-muted-foreground">atendendo tickets</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Online</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {members.filter((m: TeamMember) => m.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">neste momento</p>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Funcionários</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar..."
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
                <TableHead>Funcionário</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Último Acesso</TableHead>
                <TableHead>Cadastro</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((member: TeamMember) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {member.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    <Badge variant={roleColors[member.role as UserRole] as any}>
                      <Shield className="mr-1 h-3 w-3" />
                      {roleLabels[member.role as UserRole]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={member.status === 'active' ? 'success' : 'secondary'}>
                      {member.status === 'active' ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {member.lastLogin ? formatDate(member.lastLogin) : '—'}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(member.createdAt)}
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

