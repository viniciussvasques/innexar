'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Mail, Send, Users } from 'lucide-react'

const mockCampaigns = [
  { id: '1', name: 'Lançamento Black Friday', type: 'email', status: 'active', productIds: ['mecanica365'], totalSent: 2500, totalClicks: 380, totalConversions: 45, startDate: '2025-12-01' },
  { id: '2', name: 'Webinar Grátis', type: 'email', status: 'scheduled', productIds: ['mecanica365'], totalSent: 0, totalClicks: 0, totalConversions: 0, startDate: '2026-01-15' },
  { id: '3', name: 'Newsletter Semanal', type: 'email', status: 'active', productIds: ['mecanica365'], totalSent: 8500, totalClicks: 950, totalConversions: 125, startDate: '2025-11-01' },
]

export default function MarketingPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Marketing</h1>
          <p className="text-muted-foreground">Gerencie campanhas de todos os produtos</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nova Campanha
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Campanhas Ativas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockCampaigns.filter(c => c.status === 'active').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Send className="h-4 w-4" />
              Emails Enviados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockCampaigns.reduce((acc, c) => acc + c.totalSent, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Cliques</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15.2%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Conversões</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockCampaigns.reduce((acc, c) => acc + c.totalConversions, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockCampaigns.map((campaign) => (
          <Card key={campaign.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-base">{campaign.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {campaign.type === 'email' && <Mail className="inline h-3 w-3 mr-1" />}
                    {campaign.type}
                  </p>
                </div>
                <Badge variant={campaign.status === 'active' ? 'success' : campaign.status === 'scheduled' ? 'secondary' : 'outline'}>
                  {campaign.status === 'active' ? 'Ativa' : campaign.status === 'scheduled' ? 'Agendada' : 'Pausada'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Enviados</p>
                  <p className="font-bold">{campaign.totalSent.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Cliques</p>
                  <p className="font-bold">{campaign.totalClicks}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Conversões</p>
                  <p className="font-bold text-green-600">{campaign.totalConversions}</p>
                </div>
              </div>
              <Button variant="outline" className="w-full">Ver Detalhes</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

