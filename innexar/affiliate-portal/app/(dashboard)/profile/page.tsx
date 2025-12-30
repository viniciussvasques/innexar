'use client';

import { useEffect, useState } from 'react';
import {
    PersonIcon,
    EnvelopeClosedIcon,
    MobileIcon,
    IdCardIcon,
    CheckIcon,
    Pencil1Icon,
} from '@radix-ui/react-icons';
import { innexarApi } from '@/lib/api';

interface Profile {
    id: string;
    name: string;
    email: string;
    phone?: string;
    cpfCnpj?: string;
    pixKey?: string;
    pixKeyType?: string;
    bankName?: string;
    bankAgency?: string;
    bankAccount?: string;
    referralCode?: string;
    status: string;
    createdAt: string;
}

export default function ProfilePage() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        pixKey: '',
        pixKeyType: 'email',
        bankName: '',
        bankAgency: '',
        bankAccount: '',
    });

    useEffect(() => {
        loadProfile();
    }, []);

    async function loadProfile() {
        try {
            const data = await innexarApi.getProfile();
            setProfile(data);
            setFormData({
                name: data.name || '',
                phone: data.phone || '',
                pixKey: data.pixKey || '',
                pixKeyType: data.pixKeyType || 'email',
                bankName: data.bankName || '',
                bankAgency: data.bankAgency || '',
                bankAccount: data.bankAccount || '',
            });
        } catch (error) {
            console.error('Erro ao carregar perfil:', error);
        } finally {
            setLoading(false);
        }
    }

    const handleSave = async () => {
        setSaving(true);
        try {
            await innexarApi.updateProfile(formData);
            await loadProfile();
            setEditing(false);
        } catch (error) {
            console.error('Erro ao salvar perfil:', error);
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });
    };

    const statusLabels: Record<string, { label: string; color: string; bg: string }> = {
        active: { label: 'Ativo', color: 'text-[#10b981]', bg: 'bg-[#10b981]/10' },
        pending: { label: 'Pendente', color: 'text-[#f59e0b]', bg: 'bg-[#f59e0b]/10' },
        blocked: { label: 'Bloqueado', color: 'text-[#ef4444]', bg: 'bg-[#ef4444]/10' },
    };

    if (loading) {
        return (
            <div className="space-y-8">
                <div className="h-32 bg-[#0a1628] animate-pulse rounded-2xl" />
                <div className="h-64 bg-[#0a1628] animate-pulse rounded-2xl" />
            </div>
        );
    }

    if (!profile) return null;

    const status = statusLabels[profile.status] || statusLabels.pending;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-white">Meu Perfil</h1>
                    <p className="text-[#6b7a8a] mt-1">Gerencie suas informações e dados de pagamento.</p>
                </div>
                {!editing && (
                    <button 
                        onClick={() => setEditing(true)}
                        className="inline-flex items-center gap-2 bg-[#4aa8b3]/10 text-[#4aa8b3] px-6 py-3 rounded-xl font-medium text-sm hover:bg-[#4aa8b3]/20 transition-colors"
                    >
                        <Pencil1Icon />
                        Editar Perfil
                    </button>
                )}
            </header>

            {/* Profile Header */}
            <div className="bg-[#0a1628] border border-[#4aa8b3]/10 rounded-2xl p-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#4aa8b3] to-[#2d7a85] rounded-2xl flex items-center justify-center text-white text-3xl font-bold">
                        {profile.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-white">{profile.name}</h2>
                        <p className="text-[#6b7a8a]">{profile.email}</p>
                        <div className="flex items-center gap-4 mt-2">
                            <span className={`px-3 py-1 rounded-lg text-xs font-medium ${status.bg} ${status.color}`}>
                                {status.label}
                            </span>
                            <span className="text-[#6b7a8a] text-sm">
                                Membro desde {formatDate(profile.createdAt)}
                            </span>
                        </div>
                    </div>
                    {profile.referralCode && (
                        <div className="bg-[#050b14]/50 rounded-xl p-4 text-center">
                            <p className="text-[#6b7a8a] text-xs mb-1">Seu Código</p>
                            <p className="text-[#4aa8b3] font-mono font-bold text-lg">{profile.referralCode}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Profile Form */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Personal Info */}
                <div className="bg-[#0a1628] border border-[#4aa8b3]/10 rounded-2xl p-6">
                    <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                        <PersonIcon className="text-[#4aa8b3]" />
                        Dados Pessoais
                    </h3>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-[#6b7a8a] mb-2">Nome completo</label>
                            {editing ? (
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full innexar-input px-4 py-3"
                                />
                            ) : (
                                <p className="text-white bg-[#050b14]/50 px-4 py-3 rounded-xl">{profile.name}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm text-[#6b7a8a] mb-2">E-mail</label>
                            <p className="text-white bg-[#050b14]/50 px-4 py-3 rounded-xl flex items-center gap-2">
                                <EnvelopeClosedIcon className="text-[#4aa8b3]" />
                                {profile.email}
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm text-[#6b7a8a] mb-2">Telefone</label>
                            {editing ? (
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="(11) 99999-9999"
                                    className="w-full innexar-input px-4 py-3"
                                />
                            ) : (
                                <p className="text-white bg-[#050b14]/50 px-4 py-3 rounded-xl flex items-center gap-2">
                                    <MobileIcon className="text-[#4aa8b3]" />
                                    {profile.phone || 'Não informado'}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm text-[#6b7a8a] mb-2">CPF/CNPJ</label>
                            <p className="text-white bg-[#050b14]/50 px-4 py-3 rounded-xl flex items-center gap-2">
                                <IdCardIcon className="text-[#4aa8b3]" />
                                {profile.cpfCnpj || 'Não informado'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Payment Info */}
                <div className="bg-[#0a1628] border border-[#4aa8b3]/10 rounded-2xl p-6">
                    <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                        <svg className="w-5 h-5 text-[#4aa8b3]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="2" y="5" width="20" height="14" rx="2" />
                            <line x1="2" y1="10" x2="22" y2="10" />
                        </svg>
                        Dados de Pagamento
                    </h3>
                    
                    <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-2">
                                <label className="block text-sm text-[#6b7a8a] mb-2">Chave PIX</label>
                                {editing ? (
                                    <input
                                        type="text"
                                        name="pixKey"
                                        value={formData.pixKey}
                                        onChange={handleChange}
                                        placeholder="Sua chave PIX"
                                        className="w-full innexar-input px-4 py-3"
                                    />
                                ) : (
                                    <p className="text-white bg-[#050b14]/50 px-4 py-3 rounded-xl">
                                        {profile.pixKey || 'Não informado'}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm text-[#6b7a8a] mb-2">Tipo</label>
                                {editing ? (
                                    <select
                                        name="pixKeyType"
                                        value={formData.pixKeyType}
                                        onChange={handleChange}
                                        className="w-full innexar-input px-4 py-3"
                                    >
                                        <option value="email">E-mail</option>
                                        <option value="cpf">CPF</option>
                                        <option value="phone">Celular</option>
                                        <option value="random">Aleatória</option>
                                    </select>
                                ) : (
                                    <p className="text-white bg-[#050b14]/50 px-4 py-3 rounded-xl capitalize">
                                        {profile.pixKeyType || '-'}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="border-t border-[#4aa8b3]/10 pt-4 mt-4">
                            <p className="text-[#6b7a8a] text-sm mb-4">Dados Bancários (opcional)</p>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-[#6b7a8a] mb-2">Banco</label>
                                    {editing ? (
                                        <input
                                            type="text"
                                            name="bankName"
                                            value={formData.bankName}
                                            onChange={handleChange}
                                            placeholder="Nome do banco"
                                            className="w-full innexar-input px-4 py-3"
                                        />
                                    ) : (
                                        <p className="text-white bg-[#050b14]/50 px-4 py-3 rounded-xl">
                                            {profile.bankName || 'Não informado'}
                                        </p>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-[#6b7a8a] mb-2">Agência</label>
                                        {editing ? (
                                            <input
                                                type="text"
                                                name="bankAgency"
                                                value={formData.bankAgency}
                                                onChange={handleChange}
                                                placeholder="0000"
                                                className="w-full innexar-input px-4 py-3"
                                            />
                                        ) : (
                                            <p className="text-white bg-[#050b14]/50 px-4 py-3 rounded-xl">
                                                {profile.bankAgency || '-'}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm text-[#6b7a8a] mb-2">Conta</label>
                                        {editing ? (
                                            <input
                                                type="text"
                                                name="bankAccount"
                                                value={formData.bankAccount}
                                                onChange={handleChange}
                                                placeholder="00000-0"
                                                className="w-full innexar-input px-4 py-3"
                                            />
                                        ) : (
                                            <p className="text-white bg-[#050b14]/50 px-4 py-3 rounded-xl">
                                                {profile.bankAccount || '-'}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Save Button */}
            {editing && (
                <div className="flex justify-end gap-4">
                    <button
                        onClick={() => setEditing(false)}
                        className="px-6 py-3 rounded-xl font-medium text-[#6b7a8a] hover:text-white transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4aa8b3] to-[#2d7a85] text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-[#4aa8b3]/25 transition-all disabled:opacity-50"
                    >
                        <CheckIcon />
                        {saving ? 'Salvando...' : 'Salvar Alterações'}
                    </button>
                </div>
            )}
        </div>
    );
}
