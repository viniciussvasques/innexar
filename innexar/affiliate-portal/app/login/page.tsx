'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { EnvelopeClosedIcon, LockClosedIcon, EyeOpenIcon, EyeClosedIcon } from '@radix-ui/react-icons';

// INNEXAR Logo Component (Geometric Raven)
const InnexarLogo = ({ className = "w-16 h-16" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="ravenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1a3a4a" />
                <stop offset="50%" stopColor="#2d8b96" />
                <stop offset="100%" stopColor="#4aa8b3" />
            </linearGradient>
            <linearGradient id="ravenAccent" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2d7a85" />
                <stop offset="100%" stopColor="#5bc4cf" />
            </linearGradient>
        </defs>
        <polygon points="50,10 70,25 75,50 65,75 50,85 35,75 25,50 30,25" fill="url(#ravenGradient)" />
        <polygon points="50,10 65,20 60,35 50,30 40,35 35,20" fill="url(#ravenAccent)" />
        <polygon points="50,30 55,35 50,45 45,35" fill="#1a3a4a" />
        <polygon points="25,50 15,45 10,60 20,70 35,75" fill="url(#ravenGradient)" opacity="0.9" />
        <polygon points="75,50 85,45 90,60 80,70 65,75" fill="url(#ravenGradient)" opacity="0.9" />
        <polygon points="50,85 40,95 50,90 60,95" fill="url(#ravenAccent)" />
        <circle cx="45" cy="22" r="3" fill="#050b14" />
        <circle cx="46" cy="21" r="1" fill="#4aa8b3" />
        <line x1="50" y1="30" x2="50" y2="50" stroke="#4aa8b3" strokeWidth="0.5" opacity="0.5" />
        <line x1="35" y1="40" x2="65" y2="40" stroke="#4aa8b3" strokeWidth="0.5" opacity="0.5" />
    </svg>
);

// Component that uses useSearchParams
function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const registered = searchParams.get('registered');
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://apiaf.innexar.app'}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Erro ao fazer login');
            }

            localStorage.setItem('innexar_token', data.accessToken);
            localStorage.setItem('innexar_user', JSON.stringify(data.affiliate));

            router.push('/');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao fazer login');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {registered && (
                <div className="mb-4 p-4 bg-[#10b981]/10 border border-[#10b981]/20 rounded-xl text-[#10b981] text-sm">
                    ✅ Cadastro realizado! Aguarde a aprovação da sua conta.
                </div>
            )}

            {error && (
                <div className="mb-4 p-4 bg-[#ef4444]/10 border border-[#ef4444]/20 rounded-xl text-[#ef4444] text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm text-[#6b7a8a] mb-2 font-medium">E-mail</label>
                    <div className="relative">
                        <EnvelopeClosedIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4aa8b3]" />
                                <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="seu@email.com"
                            className="w-full innexar-input pl-11 pr-4 py-3.5"
                            autoComplete="email"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm text-[#6b7a8a] mb-2 font-medium">Senha</label>
                    <div className="relative">
                        <LockClosedIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4aa8b3]" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full innexar-input pl-11 pr-11 py-3.5"
                            autoComplete="current-password"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6b7a8a] hover:text-[#4aa8b3] transition-colors"
                        >
                            {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 text-[#6b7a8a] cursor-pointer group">
                        <input 
                            type="checkbox" 
                            className="rounded border-[#4aa8b3]/30 bg-[#0a1628] text-[#4aa8b3] focus:ring-[#4aa8b3]/50" 
                        />
                        <span className="group-hover:text-white transition-colors">Lembrar de mim</span>
                    </label>
                    <Link href="/forgot-password" className="text-[#4aa8b3] hover:text-[#5bc4cf] transition-colors">
                        Esqueceu a senha?
                    </Link>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full innexar-btn py-3.5 text-white font-bold"
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Entrando...
                        </span>
                    ) : 'Entrar'}
                </button>
            </form>
        </>
    );
}

export default function AffiliateLogin() {
    return (
        <div className="min-h-screen bg-[#050b14] flex items-center justify-center p-4 geometric-pattern relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-radial from-[#4aa8b3]/5 to-transparent rounded-full blur-3xl" />
                <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-radial from-[#2d8b96]/5 to-transparent rounded-full blur-3xl" />
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Logo e Marca */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="relative">
                            <InnexarLogo className="w-20 h-20 animate-float" />
                            <div className="absolute inset-0 bg-[#4aa8b3]/20 blur-2xl rounded-full" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold text-white tracking-tight">
                        INNEXAR
                    </h1>
                    <p className="text-[#6b7a8a] mt-2 text-sm">Plataforma de Afiliados Multi-SaaS</p>
                </div>

                {/* Card de Login */}
                <div className="bg-[#0a1628]/80 backdrop-blur-xl border border-[#4aa8b3]/10 rounded-2xl p-8 innexar-glow">
                    <h2 className="text-xl font-bold text-white mb-6">Entrar na sua conta</h2>

                    <Suspense fallback={<div className="text-[#6b7a8a] text-center py-4">Carregando...</div>}>
                        <LoginForm />
                    </Suspense>

                    <div className="mt-6 text-center text-sm text-[#6b7a8a]">
                        Ainda não é afiliado?{' '}
                        <Link href="/register" className="text-[#4aa8b3] hover:text-[#5bc4cf] font-medium transition-colors">
                            Cadastre-se grátis
                        </Link>
                    </div>
                </div>

                {/* Link para Landing */}
                <div className="mt-6 text-center">
                    <Link href="/join" className="text-sm text-[#6b7a8a] hover:text-white transition-colors">
                        ← Saiba mais sobre o programa
                    </Link>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center text-xs text-[#4a5568]">
                    © 2024 INNEXAR. Todos os direitos reservados.
                </div>
            </div>
        </div>
    );
}
