'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/hooks/use-auth'
import { useToast } from '@/hooks/use-toast'
import { Loader2 } from 'lucide-react'

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
})

type LoginForm = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const { login, isAuthenticated } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, router])

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true)
    try {
      await login(data.email, data.password)
      toast({
        title: 'Login realizado!',
        description: 'Bem-vindo ao INNEXAR HQ',
      })
      router.push('/dashboard')
    } catch (error) {
      toast({
        title: 'Erro ao fazer login',
        description: 'Email ou senha incorretos',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative h-16 w-48">
            <Image
              src="/logo-innexar.svg"
              alt="INNEXAR Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold">INNEXAR HQ</h1>
            <p className="text-sm text-muted-foreground">
              Central de Gestão
            </p>
          </div>
        </div>

        {/* Login Card */}
        <Card className="border-2">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Entrar</CardTitle>
            <CardDescription>
              Acesse o painel administrativo da INNEXAR
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" required>
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  disabled={isLoading}
                  error={errors.email?.message}
                  {...register('email')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" required>
                  Senha
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  disabled={isLoading}
                  error={errors.password?.message}
                  {...register('password')}
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>Apenas funcionários autorizados</p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} INNEXAR. Todos os direitos reservados.
        </p>
      </div>
    </div>
  )
}

