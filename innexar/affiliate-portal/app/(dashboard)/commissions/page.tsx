
'use client';

import { useEffect, useState, useCallback } from 'react';
import {
    BarChartIcon,
    ClockIcon,
    CheckCircledIcon,
    CrossCircledIcon,
} from '@radix-ui/react-icons';
import { innexarApi } from '@/lib/api';

interface Commission {
    id: string;
    saleAmount: number;
    commissionRate: number;
    amount: number;
    status: string;
    orderId?: string;
    customerEmail?: string;
    createdAt: string;
    approvedAt?: string;
    paidAt?: string;
    link: {
        product: {
            name: string;
            logoUrl?: string;
        };
    };
}

interface StatusConfigItem {
    label: string;
    color: string;
    bg: string;
    icon: React.ElementType;
}

const statusConfig: Record<string, StatusConfigItem> = {
    pending: { label: 'Pendente', color: 'text-[#f59e0b]', bg: 'bg-[#f59e0b]/10', icon: ClockIcon },
    approved: { label: 'Aprovada', color: 'text-[#10b981]', bg: 'bg-[#10b981]/10', icon: CheckCircledIcon },
    paid: { label: 'Pago', color: 'text-[#4aa8b3]', bg: 'bg-[#4aa8b3]/10', icon: CheckCircledIcon },
    cancelled: { label: 'Cancelada', color: 'text-[#ef4444]', bg: 'bg-[#ef4444]/10', icon: CrossCircledIcon },
};

export default function CommissionsPage() {
    const [commissions, setCommissions] = useState<Commission[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<string>('all');
    const [totals, setTotals] = useState({
        pending: 0,
        approved: 0,
        paid: 0,
        total: 0,
    });



    const loadCommissions = useCallback(async () => {
        setLoading(true);
        try {
            const data = await innexarApi.getCommissions(filter === 'all' ? undefined : filter) as Commission[];
            setCommissions(data);

            // Calculate totals
            const newTotals = data.reduce((acc: { pending: number; approved: number; paid: number; total: number }, c: Commission) => {
                acc[c.status as keyof typeof acc] = (acc[c.status as keyof typeof acc] || 0) + Number(c.amount);
                acc.total += Number(c.amount);
                return acc;
            }, { pending: 0, approved: 0, paid: 0, total: 0 });
            setTotals(newTotals);
        } catch (error) {
            console.error('Erro ao carregar comissões:', error);
        } finally {
            setLoading(false);
        }
    }, [filter]);

    useEffect(() => {
        loadCommissions();
    }, [loadCommissions]);

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const formatCurrency = (value: number) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header>
                <h1 className="text-3xl font-extrabold text-white">Comissões</h1>
                <p className="text-[#6b7a8a] mt-1">Acompanhe suas comissões e histórico de ganhos.</p>
            </header>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#0a1628] border border-[#f59e0b]/20 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-[#f59e0b]/10 rounded-xl flex items-center justify-center">
                            <ClockIcon className="w-5 h-5 text-[#f59e0b]" />
                        </div>
                        <span className="text-[#6b7a8a] text-sm">Pendente</span>
                    </div>
                    <p className="text-2xl font-bold text-[#f59e0b]">{formatCurrency(totals.pending)}</p>
                </div>

                <div className="bg-[#0a1628] border border-[#10b981]/20 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-[#10b981]/10 rounded-xl flex items-center justify-center">
                            <CheckCircledIcon className="w-5 h-5 text-[#10b981]" />
                        </div>
                        <span className="text-[#6b7a8a] text-sm">Aprovado</span>
                    </div>
                    <p className="text-2xl font-bold text-[#10b981]">{formatCurrency(totals.approved)}</p>
                </div>

                <div className="bg-[#0a1628] border border-[#4aa8b3]/20 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-[#4aa8b3]/10 rounded-xl flex items-center justify-center">
                            <CheckCircledIcon className="w-5 h-5 text-[#4aa8b3]" />
                        </div>
                        <span className="text-[#6b7a8a] text-sm">Pago</span>
                    </div>
                    <p className="text-2xl font-bold text-[#4aa8b3]">{formatCurrency(totals.paid)}</p>
                </div>

                <div className="bg-[#0a1628] border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                            <BarChartIcon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-[#6b7a8a] text-sm">Total</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{formatCurrency(totals.total)}</p>
                </div>
            </div>

            {/* Filter */}
            <div className="flex gap-2 flex-wrap">
                {['all', 'pending', 'approved', 'paid', 'cancelled'].map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilter(status)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${filter === status
                            ? 'bg-[#4aa8b3] text-white'
                            : 'bg-[#0a1628] text-[#6b7a8a] hover:text-white border border-[#4aa8b3]/10'
                            }`}
                    >
                        {status === 'all' ? 'Todas' : statusConfig[status]?.label || status}
                    </button>
                ))}
            </div>

            {/* Commissions Table */}
            <div className="bg-[#0a1628] border border-[#4aa8b3]/10 rounded-2xl overflow-hidden">
                {loading ? (
                    <div className="p-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-16 bg-white/5 animate-pulse rounded-xl mb-2" />
                        ))}
                    </div>
                ) : commissions.length === 0 ? (
                    <div className="p-12 text-center">
                        <BarChartIcon className="w-12 h-12 text-[#4aa8b3] mx-auto mb-4 opacity-50" />
                        <h3 className="text-white font-bold text-lg mb-2">Nenhuma comissão encontrada</h3>
                        <p className="text-[#6b7a8a]">Suas comissões aparecerão aqui quando houver vendas.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-[#050b14]/50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-[10px] font-bold text-[#6b7a8a] uppercase tracking-wider">Produto</th>
                                    <th className="px-6 py-4 text-left text-[10px] font-bold text-[#6b7a8a] uppercase tracking-wider">Venda</th>
                                    <th className="px-6 py-4 text-left text-[10px] font-bold text-[#6b7a8a] uppercase tracking-wider">Comissão</th>
                                    <th className="px-6 py-4 text-left text-[10px] font-bold text-[#6b7a8a] uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-left text-[10px] font-bold text-[#6b7a8a] uppercase tracking-wider">Data</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#4aa8b3]/5">
                                {commissions.map((commission) => {
                                    const status = statusConfig[commission.status] || statusConfig.pending;
                                    const StatusIcon = status.icon;

                                    return (
                                        <tr key={commission.id} className="hover:bg-[#4aa8b3]/5 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-[#4aa8b3]/10 rounded-lg flex items-center justify-center">
                                                        <BarChartIcon className="w-4 h-4 text-[#4aa8b3]" />
                                                    </div>
                                                    <span className="text-white font-medium">{commission.link.product.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-[#6b7a8a]">{formatCurrency(commission.saleAmount)}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-white font-bold">{formatCurrency(commission.amount)}</span>
                                                <span className="text-[#6b7a8a] text-xs ml-2">
                                                    ({(commission.commissionRate * 100).toFixed(0)}%)
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium ${status.bg} ${status.color}`}>
                                                    <StatusIcon className="w-3 h-3" />
                                                    {status.label}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-[#6b7a8a] text-sm">{formatDate(commission.createdAt)}</span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

