'use client';

import { useState } from 'react';
import {
    RocketIcon,
    BarChartIcon,
    CheckIcon,
    ChevronRightIcon,
    LightningBoltIcon,
    LockClosedIcon,
    PersonIcon,
    StarIcon,
} from '@radix-ui/react-icons';
import Link from 'next/link';

// INNEXAR Logo
const InnexarLogo = ({ className = "w-12 h-12" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="landingRavenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1a3a4a" />
                <stop offset="50%" stopColor="#2d8b96" />
                <stop offset="100%" stopColor="#4aa8b3" />
            </linearGradient>
            <linearGradient id="landingRavenAccent" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2d7a85" />
                <stop offset="100%" stopColor="#5bc4cf" />
            </linearGradient>
        </defs>
        <polygon points="50,10 70,25 75,50 65,75 50,85 35,75 25,50 30,25" fill="url(#landingRavenGradient)" />
        <polygon points="50,10 65,20 60,35 50,30 40,35 35,20" fill="url(#landingRavenAccent)" />
        <polygon points="50,30 55,35 50,45 45,35" fill="#1a3a4a" />
        <polygon points="25,50 15,45 10,60 20,70 35,75" fill="url(#landingRavenGradient)" opacity="0.9" />
        <polygon points="75,50 85,45 90,60 80,70 65,75" fill="url(#landingRavenGradient)" opacity="0.9" />
        <polygon points="50,85 40,95 50,90 60,95" fill="url(#landingRavenAccent)" />
        <circle cx="45" cy="22" r="3" fill="#050b14" />
        <circle cx="46" cy="21" r="1" fill="#4aa8b3" />
    </svg>
);

// Stats Counter Animation
const StatCard = ({ value, label, prefix = '', suffix = '' }: { value: string; label: string; prefix?: string; suffix?: string }) => (
    <div className="text-center">
        <p className="text-4xl md:text-5xl font-bold text-white mb-2">
            <span className="text-[#4aa8b3]">{prefix}</span>
            {value}
            <span className="text-[#4aa8b3]">{suffix}</span>
        </p>
        <p className="text-[#6b7a8a] text-sm uppercase tracking-wider">{label}</p>
    </div>
);

export default function LandingPage() {
    const [email, setEmail] = useState('');

    const handleCTA = () => {
        window.location.href = `/register${email ? `?email=${encodeURIComponent(email)}` : ''}`;
    };

    return (
        <div className="min-h-screen bg-[#050b14] text-white font-sans overflow-x-hidden">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050b14]/80 backdrop-blur-xl border-b border-[#4aa8b3]/10">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <InnexarLogo className="w-10 h-10" />
                        <span className="text-xl font-bold tracking-tight">INNEXAR</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/login" className="text-[#6b7a8a] hover:text-white transition-colors text-sm font-medium">
                            Entrar
                        </Link>
                        <Link 
                            href="/register" 
                            className="bg-[#4aa8b3] hover:bg-[#5bc4cf] text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-all"
                        >
                            Cadastrar
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-24 overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#4aa8b3]/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#2d8b96]/10 rounded-full blur-[100px]" />
                </div>
                
                {/* Geometric Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234aa8b3' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#4aa8b3]/10 border border-[#4aa8b3]/20 rounded-full text-[#4aa8b3] text-xs font-bold uppercase tracking-widest mb-8">
                            <LightningBoltIcon />
                            Plataforma de Afiliados Multi-SaaS
                        </div>

                        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight leading-tight">
                            Ganhe dinheiro<br />
                            <span className="bg-gradient-to-r from-[#4aa8b3] to-[#5bc4cf] bg-clip-text text-transparent">
                                promovendo SaaS
                            </span>
                        </h1>

                        <p className="text-xl text-[#6b7a8a] max-w-2xl mx-auto mb-12 leading-relaxed">
                            Conecte-se aos melhores produtos SaaS do mercado brasileiro e receba 
                            <span className="text-white font-semibold"> até 20% de comissão recorrente</span> por cada cliente indicado.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                            <Link 
                                href="/register"
                                className="group px-10 py-5 bg-gradient-to-r from-[#4aa8b3] to-[#2d7a85] text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-[#4aa8b3]/30 hover:scale-105 transition-all flex items-center gap-2"
                            >
                                Começar Gratuitamente
                                <ChevronRightIcon className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link 
                                href="/login" 
                                className="px-10 py-5 border border-[#4aa8b3]/30 hover:border-[#4aa8b3]/50 hover:bg-[#4aa8b3]/5 rounded-2xl font-bold text-lg transition-all"
                            >
                                Já sou afiliado
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-[#4aa8b3]/10">
                            <StatCard value="20" suffix="%" label="Comissão máxima" />
                            <StatCard value="30" label="Dias de cookie" />
                            <StatCard prefix="R$" value="50" label="Saque mínimo" />
                            <StatCard value="24h" label="Aprovação rápida" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section className="py-24 bg-[#0a1628]/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Produtos Disponíveis</h2>
                        <p className="text-[#6b7a8a] max-w-2xl mx-auto">
                            Promova sistemas SaaS de qualidade e construa uma renda passiva consistente
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Mecânica365 */}
                        <div className="bg-[#0a1628] border border-[#4aa8b3]/10 rounded-2xl p-8 hover:border-[#4aa8b3]/30 transition-all group">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                                    M
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">Mecânica365</h3>
                                    <p className="text-[#4aa8b3] text-sm">Sistema para Oficinas</p>
                                </div>
                            </div>
                            <p className="text-[#6b7a8a] text-sm mb-6">
                                O sistema mais completo para gestão de oficinas mecânicas no Brasil. 
                                Agendamentos, orçamentos, OS, estoque e muito mais.
                            </p>
                            <div className="flex items-center justify-between pt-4 border-t border-[#4aa8b3]/10">
                                <div>
                                    <p className="text-[#10b981] font-bold text-2xl">10%</p>
                                    <p className="text-[#6b7a8a] text-xs">comissão</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-white font-bold">30 dias</p>
                                    <p className="text-[#6b7a8a] text-xs">cookie</p>
                                </div>
                            </div>
                        </div>

                        {/* Em breve 1 */}
                        <div className="bg-[#0a1628]/50 border border-dashed border-[#4aa8b3]/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
                            <div className="w-14 h-14 bg-[#4aa8b3]/10 rounded-xl flex items-center justify-center mb-4">
                                <RocketIcon className="w-7 h-7 text-[#4aa8b3]" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Novo SaaS em breve</h3>
                            <p className="text-[#6b7a8a] text-sm">
                                Estamos constantemente adicionando novos produtos ao catálogo
                            </p>
                        </div>

                        {/* Em breve 2 */}
                        <div className="bg-[#0a1628]/50 border border-dashed border-[#4aa8b3]/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
                            <div className="w-14 h-14 bg-[#4aa8b3]/10 rounded-xl flex items-center justify-center mb-4">
                                <StarIcon className="w-7 h-7 text-[#4aa8b3]" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Sugira um produto</h3>
                            <p className="text-[#6b7a8a] text-sm">
                                Conhece um SaaS que deveria estar aqui? Nos conte!
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How it Works */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Como Funciona</h2>
                        <p className="text-[#6b7a8a] max-w-2xl mx-auto">
                            Em 3 passos simples você começa a ganhar comissões
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="relative">
                            <div className="absolute -left-4 top-0 text-8xl font-bold text-[#4aa8b3]/10">1</div>
                            <div className="relative z-10 pl-8">
                                <div className="w-12 h-12 bg-[#4aa8b3]/10 rounded-xl flex items-center justify-center mb-4">
                                    <PersonIcon className="w-6 h-6 text-[#4aa8b3]" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">Cadastre-se</h3>
                                <p className="text-[#6b7a8a] text-sm leading-relaxed">
                                    Crie sua conta gratuita em menos de 2 minutos. Sem taxas ou mensalidades.
                                </p>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -left-4 top-0 text-8xl font-bold text-[#4aa8b3]/10">2</div>
                            <div className="relative z-10 pl-8">
                                <div className="w-12 h-12 bg-[#4aa8b3]/10 rounded-xl flex items-center justify-center mb-4">
                                    <LightningBoltIcon className="w-6 h-6 text-[#4aa8b3]" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">Gere seus links</h3>
                                <p className="text-[#6b7a8a] text-sm leading-relaxed">
                                    Escolha os produtos que deseja promover e gere links únicos de afiliado.
                                </p>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -left-4 top-0 text-8xl font-bold text-[#4aa8b3]/10">3</div>
                            <div className="relative z-10 pl-8">
                                <div className="w-12 h-12 bg-[#10b981]/10 rounded-xl flex items-center justify-center mb-4">
                                    <BarChartIcon className="w-6 h-6 text-[#10b981]" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">Receba comissões</h3>
                                <p className="text-[#6b7a8a] text-sm leading-relaxed">
                                    Acompanhe suas vendas em tempo real e receba via PIX automaticamente.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-24 bg-[#0a1628]/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-8">
                                Por que escolher a<br />
                                <span className="text-[#4aa8b3]">INNEXAR?</span>
                            </h2>

                            <div className="space-y-6">
                                {[
                                    { title: 'Comissões competitivas', desc: 'Até 20% de comissão recorrente enquanto o cliente permanecer ativo' },
                                    { title: 'Pagamentos rápidos', desc: 'Receba via PIX assim que atingir o valor mínimo de R$ 50' },
                                    { title: 'Dashboard completo', desc: 'Acompanhe cliques, conversões e comissões em tempo real' },
                                    { title: 'Suporte dedicado', desc: 'Time pronto para ajudar você a maximizar seus resultados' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-4">
                                        <div className="w-6 h-6 bg-[#4aa8b3]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <CheckIcon className="w-4 h-4 text-[#4aa8b3]" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white mb-1">{item.title}</h4>
                                            <p className="text-[#6b7a8a] text-sm">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CTA Card */}
                        <div className="bg-gradient-to-br from-[#0a1628] to-[#0d1d35] border border-[#4aa8b3]/20 rounded-3xl p-10 relative overflow-hidden">
                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#4aa8b3]/10 rounded-full blur-3xl" />
                            
                            <h3 className="text-2xl font-bold mb-3 relative z-10">Pronto para começar?</h3>
                            <p className="text-[#6b7a8a] mb-8 relative z-10">
                                Crie sua conta gratuita e comece a ganhar comissões hoje mesmo.
                            </p>

                            <div className="space-y-4 relative z-10">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Seu melhor e-mail"
                                    className="w-full bg-[#050b14]/50 border border-[#4aa8b3]/20 rounded-xl px-5 py-4 text-white placeholder-[#6b7a8a] focus:border-[#4aa8b3] focus:outline-none transition-colors"
                                />
                                <button
                                    onClick={handleCTA}
                                    className="w-full bg-gradient-to-r from-[#4aa8b3] to-[#2d7a85] text-white py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-[#4aa8b3]/30 transition-all"
                                >
                                    Criar conta grátis
                                </button>
                            </div>

                            <div className="flex items-center gap-4 mt-6 pt-6 border-t border-[#4aa8b3]/10 relative z-10">
                                <LockClosedIcon className="text-[#6b7a8a]" />
                                <p className="text-[#6b7a8a] text-xs">
                                    Seus dados estão seguros. Não compartilhamos com terceiros.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-[#4aa8b3]/10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-3">
                            <InnexarLogo className="w-8 h-8" />
                            <span className="font-bold">INNEXAR</span>
                        </div>
                        
                        <div className="flex items-center gap-6 text-sm text-[#6b7a8a]">
                            <Link href="/terms" className="hover:text-white transition-colors">Termos</Link>
                            <Link href="/privacy" className="hover:text-white transition-colors">Privacidade</Link>
                            <Link href="/login" className="hover:text-white transition-colors">Login</Link>
                        </div>
                        
                        <p className="text-[#4a5568] text-sm">
                            © 2024 INNEXAR. Todos os direitos reservados.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
