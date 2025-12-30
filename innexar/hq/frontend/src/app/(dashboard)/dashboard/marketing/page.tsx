'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Mail, Send, Users } from 'lucide-react'

import { useQuery } from '@tanstack/react-query'
import { marketingApi } from '@/lib/api/marketing'

// Mock removed

export default function MarketingPage() {
  const { data: campaigns = [] } = useQuery({
    queryKey: ['campaigns'],
    queryFn: () => marketingApi.getAllCampaigns(),
  })
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
              {campaigns.filter((c: any) => c.status === 'active').length}
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
              {campaigns.reduce((acc: number, c: any) => acc + (c.totalSent || 0), 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Cliques</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(() => {
                const totalSent = campaigns.reduce((acc: number, c: any) => acc + (c.totalSent || 0), 0);
                const totalClicks = campaigns.reduce((acc: number, c: any) => acc + (c.totalClicks || 0), 0);
                return totalSent > 0 ? ((totalClicks / totalSent) * 100).toFixed(1) + '%' : '0%';
              })()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Conversões</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {campaigns.reduce((acc: number, c: any) => acc + (c.totalConversions || 0), 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {campaigns.map((campaign: any) => (
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

