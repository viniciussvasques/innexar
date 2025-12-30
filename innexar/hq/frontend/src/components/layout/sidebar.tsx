'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  LayoutDashboard,
  Users,
  UserPlus,
  Package,
  Headphones,
  DollarSign,
  Megaphone,
  Settings,
  ChevronLeft,
  LogOut,
} from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Equipe', href: '/dashboard/team', icon: Users },
  { name: 'Afiliados', href: '/dashboard/affiliates', icon: UserPlus },
  { name: 'Produtos SaaS', href: '/dashboard/products', icon: Package },
  { name: 'Suporte', href: '/dashboard/support', icon: Headphones, badge: 12 },
  { name: 'Financeiro', href: '/dashboard/billing', icon: DollarSign },
  { name: 'Marketing', href: '/dashboard/marketing', icon: Megaphone },
  { name: 'Configurações', href: '/dashboard/settings', icon: Settings },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useAuth()

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen border-r bg-card transition-all duration-300',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b px-4">
          {!collapsed && (
            <div className="relative h-8 w-32">
              <Image
                src="/logo-innexar.svg"
                alt="INNEXAR"
                fill
                className="object-contain"
              />
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className={cn('shrink-0', collapsed && 'mx-auto')}
          >
            <ChevronLeft
              className={cn(
                'h-4 w-4 transition-transform',
                collapsed && 'rotate-180'
              )}
            />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                  collapsed && 'justify-center'
                )}
                title={collapsed ? item.name : undefined}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {!collapsed && (
                  <>
                    <span className="flex-1">{item.name}</span>
                    {item.badge && (
                      <Badge variant="destructive" className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </Link>
            )
          })}
        </nav>

        {/* User Profile */}
        <div className="border-t p-4">
          {!collapsed ? (
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={user?.avatar} />
                <AvatarFallback>
                  {user?.name?.slice(0, 2).toUpperCase() || 'AD'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium truncate">{user?.name || 'Admin'}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email || 'admin@innexar.app'}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={logout}
                title="Sair"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Avatar>
                <AvatarImage src={user?.avatar} />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <Button
                variant="ghost"
                size="icon"
                onClick={logout}
                title="Sair"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}

