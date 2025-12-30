'use client';

import {
    RocketIcon,
    BarChartIcon,
    LayersIcon,
    Link2Icon,
    ArrowRightIcon,
    ArrowUpIcon,
    EyeOpenIcon
} from '@radix-ui/react-icons';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// API helper
const getApiUrl = () => process.env.NEXT_PUBLIC_API_URL || 'https://api.innexar.com.br';
const getToken = () => typeof window !== 'undefined' ? localStorage.getItem('innexar_token') : null;

interface Stats {
    totalVisits: number;
    totalConversions: number;
    conversionRate: string;
    totalCommissions: number;
    pendingCommissions: number;
    approvedCommissions: number;
}

export default function AffiliateDashboard() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState('Parceiro');

    useEffect(() => {
        async function loadData() {
            try {
                const token = getToken();
                if (!token) return;

                // Get user name
                const userData = localStorage.getItem('innexar_user');
                if (userData) {
                    const user = JSON.parse(userData);
                    setUserName(user.name?.split(' ')[0] || 'Parceiro');
                }

                // Fetch stats
                const response = await fetch(`${getApiUrl()}/api/affiliate/stats`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (response.ok) {
                    const data = await response.json();
                    setStats(data);
                }
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);

    const statsCards = [
        { 
            label: 'Comissão Total', 
            value: stats ? `R$ ${stats.totalCommissions.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '...', 
            icon: LayersIcon, 
            color: 'text-[#10b981]', 
            bg: 'bg-[#10b981]/10',
            border: 'border-[#10b981]/20'
        },
        { 
            label: 'Cliques', 
            value: stats ? stats.totalVisits.toString() : '...', 
            icon: EyeOpenIcon, 
            color: 'text-[#4aa8b3]', 
            bg: 'bg-[#4aa8b3]/10',
            border: 'border-[#4aa8b3]/20'
        },
        { 
            label: 'Conversões', 
            value: stats ? stats.totalConversions.toString() : '...', 
            icon: BarChartIcon, 
            color: 'text-[#f59e0b]', 
            bg: 'bg-[#f59e0b]/10',
            border: 'border-[#f59e0b]/20'
        },
        { 
            label: 'Taxa de Conversão', 
            value: stats ? `${stats.conversionRate}%` : '...', 
            icon: RocketIcon, 
            color: 'text-[#8b5cf6]', 
            bg: 'bg-[#8b5cf6]/10',
            border: 'border-[#8b5cf6]/20'
        },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-white">
                        Olá, {userName}! 👋
                    </h1>
                    <p className="text-[#6b7a8a] mt-1">Confira seu desempenho e gerencie seus links.</p>
                </div>
                <Link 
                    href="/links"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4aa8b3] to-[#2d7a85] text-white px-6 py-3 rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-[#4aa8b3]/25 transition-all hover:-translate-y-0.5"
                >
                    <Link2Icon />
                    Criar Novo Link
                </Link>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statsCards.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div 
                            key={i} 
                            className={`bg-[#0a1628] border ${stat.border} p-6 rounded-2xl hover:border-[#4aa8b3]/30 transition-all group`}
                        >
                            <div className={`${stat.bg} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                <Icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <p className="text-[#6b7a8a] text-xs font-medium uppercase tracking-wider">{stat.label}</p>
                            <p className="text-2xl font-bold text-white mt-1">
                                {loading ? (
                                    <span className="inline-block w-24 h-7 bg-white/5 animate-pulse rounded" />
                                ) : stat.value}
                            </p>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Pending Balance */}
                <div className="lg:col-span-2 bg-[#0a1628] border border-[#4aa8b3]/10 rounded-2xl p-6 lg:p-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white">Saldo</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-[#050b14]/50 rounded-xl p-5 border border-[#4aa8b3]/10">
                            <p className="text-[#6b7a8a] text-sm mb-2">Pendente de Aprovação</p>
                            <p className="text-2xl font-bold text-[#f59e0b]">
                                {loading ? '...' : `R$ ${(stats?.pendingCommissions || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                            </p>
                            <p className="text-xs text-[#6b7a8a] mt-2">Aguardando confirmação das vendas</p>
                        </div>
                        <div className="bg-[#050b14]/50 rounded-xl p-5 border border-[#10b981]/20">
                            <p className="text-[#6b7a8a] text-sm mb-2">Disponível para Saque</p>
                            <p className="text-2xl font-bold text-[#10b981]">
                                {loading ? '...' : `R$ ${(stats?.approvedCommissions || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                            </p>
                            <button className="mt-3 text-xs bg-[#10b981]/10 text-[#10b981] px-4 py-2 rounded-lg hover:bg-[#10b981]/20 transition-colors font-medium">
                                Solicitar Saque
                            </button>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-4">
                    <div className="bg-gradient-to-br from-[#1a3a4a] to-[#2d8b96] rounded-2xl p-6 relative overflow-hidden group">
                        <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all"></div>
                        <RocketIcon className="w-8 h-8 text-white/80 mb-4" />
                        <h3 className="text-lg font-bold text-white relative z-10 mb-2">Produtos SaaS</h3>
                        <p className="text-white/70 relative z-10 text-sm mb-4">Explore os produtos disponíveis e crie links.</p>
                        <Link
                            href="/products"
                            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur text-white px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-white/20 transition-all"
                        >
                            Ver Catálogo
                            <ArrowRightIcon />
                        </Link>
                    </div>

                    <div className="bg-[#0a1628] border border-[#4aa8b3]/10 rounded-2xl p-6">
                        <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                            <ArrowUpIcon className="text-[#4aa8b3]" />
                            Meta do Mês
                        </h3>
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                                <span className="text-[#6b7a8a]">Progresso</span>
                                <span className="text-white font-bold">
                                    {loading ? '...' : `${Math.min(100, Math.round((stats?.totalConversions || 0) / 10 * 100))}%`}
                                </span>
                            </div>
                            <div className="h-2 bg-[#050b14] rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-gradient-to-r from-[#4aa8b3] to-[#5bc4cf] transition-all duration-1000"
                                    style={{ width: loading ? '0%' : `${Math.min(100, Math.round((stats?.totalConversions || 0) / 10 * 100))}%` }}
                                />
                            </div>
                            <p className="text-xs text-[#6b7a8a]">
                                {loading ? '...' : `${stats?.totalConversions || 0} de 10 vendas`}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tips Section */}
            <div className="bg-[#0a1628]/50 border border-[#4aa8b3]/10 rounded-2xl p-6">
                <h3 className="text-white font-bold mb-4">💡 Dicas para Aumentar suas Vendas</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-[#050b14]/50 rounded-xl p-4">
                        <p className="text-[#4aa8b3] font-medium text-sm mb-1">Compartilhe nas Redes</p>
                        <p className="text-[#6b7a8a] text-xs">Use seus links em posts, stories e grupos relevantes.</p>
                    </div>
                    <div className="bg-[#050b14]/50 rounded-xl p-4">
                        <p className="text-[#4aa8b3] font-medium text-sm mb-1">Crie Conteúdo</p>
                        <p className="text-[#6b7a8a] text-xs">Reviews e tutoriais geram mais confiança e conversão.</p>
                    </div>
                    <div className="bg-[#050b14]/50 rounded-xl p-4">
                        <p className="text-[#4aa8b3] font-medium text-sm mb-1">Segmente o Público</p>
                        <p className="text-[#6b7a8a] text-xs">Foque em quem realmente precisa do produto.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
