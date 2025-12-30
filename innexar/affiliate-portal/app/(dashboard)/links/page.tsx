
'use client';

import Image from 'next/image';

import { useEffect, useState } from 'react';
import {
    Link2Icon,
    CopyIcon,
    ExternalLinkIcon,
    PlusIcon,
    TrashIcon,
    CheckIcon,
} from '@radix-ui/react-icons';
import { innexarApi } from '@/lib/api';

interface AffiliateLink {
    id: string;
    code: string;
    targetUrl: string;
    totalClicks: number;
    conversions: number;
    product: {
        id: string;
        name: string;
        logoUrl?: string;
        commissionRate: number;
    };
}

interface Product {
    id: string;
    code: string;
    name: string;
    description?: string;
    logoUrl?: string;
    commissionRate: number;
}

export default function AffiliateLinks() {
    const [links, setLinks] = useState<AffiliateLink[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<string>('');
    const [creating, setCreating] = useState(false);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {
            const [linksData, productsData] = await Promise.all([
                innexarApi.getLinks(),
                innexarApi.getProducts()
            ]);
            setLinks(linksData as AffiliateLink[]);
            setProducts(productsData as Product[]);
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        } finally {
            setLoading(false);
        }
    }

    const copyToClipboard = async (text: string, id: string) => {
        await navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleCreateLink = async () => {
        if (!selectedProduct) return;
        setCreating(true);
        try {
            await innexarApi.createLink(selectedProduct);
            await loadData();
            setShowCreateModal(false);
            setSelectedProduct('');
        } catch (error) {
            console.error('Erro ao criar link:', error);
        } finally {
            setCreating(false);
        }
    };

    const handleDeleteLink = async (linkId: string) => {
        if (!confirm('Tem certeza que deseja remover este link?')) return;
        try {
            await innexarApi.deleteLink(linkId);
            setLinks(links.filter(l => l.id !== linkId));
        } catch (error) {
            console.error('Erro ao remover link:', error);
        }
    };

    // Filter products that don't have links yet
    const availableProducts = products.filter(
        p => !links.some(l => l.product.id === p.id)
    );

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-white">Meus Links</h1>
                    <p className="text-[#6b7a8a] mt-1">Gerencie seus links de afiliado e acompanhe o desempenho.</p>
                </div>
                <button
                    onClick={() => setShowCreateModal(true)}
                    disabled={availableProducts.length === 0}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4aa8b3] to-[#2d7a85] text-white px-6 py-3 rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-[#4aa8b3]/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <PlusIcon />
                    Novo Link
                </button>
            </header>

            {/* Links List */}
            <div className="space-y-4">
                {loading ? (
                    [1, 2, 3].map(i => (
                        <div key={i} className="h-24 bg-[#0a1628] animate-pulse rounded-2xl border border-[#4aa8b3]/10" />
                    ))
                ) : links.length === 0 ? (
                    <div className="bg-[#0a1628] border border-[#4aa8b3]/10 rounded-2xl p-12 text-center">
                        <Link2Icon className="w-12 h-12 text-[#4aa8b3] mx-auto mb-4 opacity-50" />
                        <h3 className="text-white font-bold text-lg mb-2">Nenhum link criado</h3>
                        <p className="text-[#6b7a8a] mb-4">Crie seu primeiro link de afiliado para começar a ganhar comissões.</p>
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="inline-flex items-center gap-2 bg-[#4aa8b3]/10 text-[#4aa8b3] px-6 py-3 rounded-xl font-medium text-sm hover:bg-[#4aa8b3]/20 transition-colors"
                        >
                            <PlusIcon />
                            Criar Primeiro Link
                        </button>
                    </div>
                ) : links.map((link) => (
                    <div key={link.id} className="bg-[#0a1628] border border-[#4aa8b3]/10 p-6 rounded-2xl hover:border-[#4aa8b3]/20 transition-all group">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-[#4aa8b3]/10 rounded-xl flex items-center justify-center">
                                    {link.product.logoUrl ? (
                                        <Image
                                            src={link.product.logoUrl}
                                            alt={link.product.name}
                                            width={32}
                                            height={32}
                                            className="rounded"
                                            unoptimized
                                        />
                                    ) : (
                                        <Link2Icon className="text-[#4aa8b3] w-6 h-6" />
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg">{link.product.name}</h3>
                                    <p className="text-[#6b7a8a] text-xs font-mono bg-[#050b14]/50 px-2 py-0.5 rounded inline-block">
                                        {link.code}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-8">
                                <div className="text-center">
                                    <p className="text-[#6b7a8a] text-[10px] uppercase font-bold tracking-widest">Cliques</p>
                                    <p className="text-white font-bold text-lg">{link.totalClicks}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-[#6b7a8a] text-[10px] uppercase font-bold tracking-widest">Vendas</p>
                                    <p className="text-white font-bold text-lg">{link.conversions}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-[#6b7a8a] text-[10px] uppercase font-bold tracking-widest">Comissão</p>
                                    <p className="text-[#10b981] font-bold text-lg">{(link.product.commissionRate * 100).toFixed(0)}%</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="flex-1 bg-[#050b14]/50 border border-[#4aa8b3]/10 px-4 py-2.5 rounded-xl text-xs text-[#6b7a8a] font-mono truncate max-w-[280px]">
                                    {link.targetUrl}
                                </div>
                                <button
                                    onClick={() => copyToClipboard(link.targetUrl, link.id)}
                                    className={`p-2.5 rounded-lg transition-colors ${copiedId === link.id
                                        ? 'bg-[#10b981]/20 text-[#10b981]'
                                        : 'bg-[#4aa8b3]/10 hover:bg-[#4aa8b3]/20 text-[#4aa8b3]'
                                        }`}
                                    title="Copiar Link"
                                >
                                    {copiedId === link.id ? <CheckIcon /> : <CopyIcon />}
                                </button>
                                <a
                                    href={link.targetUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2.5 bg-[#4aa8b3]/10 hover:bg-[#4aa8b3]/20 rounded-lg text-[#4aa8b3] transition-colors"
                                    title="Abrir Link"
                                >
                                    <ExternalLinkIcon />
                                </a>
                                <button
                                    onClick={() => handleDeleteLink(link.id)}
                                    className="p-2.5 bg-[#ef4444]/10 hover:bg-[#ef4444]/20 rounded-lg text-[#ef4444] transition-colors"
                                    title="Remover Link"
                                >
                                    <TrashIcon />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Create Link Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-[#0a1628] border border-[#4aa8b3]/20 rounded-2xl p-8 max-w-md w-full">
                        <h2 className="text-xl font-bold text-white mb-6">Criar Novo Link</h2>

                        {availableProducts.length === 0 ? (
                            <p className="text-[#6b7a8a] text-center py-8">
                                Você já tem links para todos os produtos disponíveis.
                            </p>
                        ) : (
                            <>
                                <p className="text-[#6b7a8a] text-sm mb-4">Selecione um produto:</p>
                                <div className="space-y-2 max-h-64 overflow-y-auto mb-6">
                                    {availableProducts.map(product => (
                                        <button
                                            key={product.id}
                                            onClick={() => setSelectedProduct(product.id)}
                                            className={`w-full p-4 rounded-xl border text-left transition-all ${selectedProduct === product.id
                                                ? 'bg-[#4aa8b3]/10 border-[#4aa8b3]/30'
                                                : 'bg-[#050b14]/50 border-[#4aa8b3]/10 hover:border-[#4aa8b3]/20'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-[#4aa8b3]/10 rounded-lg flex items-center justify-center">
                                                    <RocketIcon className="text-[#4aa8b3]" />
                                                </div>
                                                <div>
                                                    <p className="text-white font-medium">{product.name}</p>
                                                    <p className="text-[#4aa8b3] text-xs">{(product.commissionRate * 100).toFixed(0)}% de comissão</p>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowCreateModal(false)}
                                className="flex-1 py-3 rounded-xl font-medium text-[#6b7a8a] hover:text-white transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleCreateLink}
                                disabled={!selectedProduct || creating}
                                className="flex-1 bg-gradient-to-r from-[#4aa8b3] to-[#2d7a85] text-white py-3 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {creating ? 'Criando...' : 'Criar Link'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Simple Rocket Icon for the modal
const RocketIcon = ({ className }: { className?: string }) => (
    <svg className={className} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.85355 3.85355C7.04882 3.65829 7.04882 3.34171 6.85355 3.14645C6.65829 2.95118 6.34171 2.95118 6.14645 3.14645L2.14645 7.14645C1.95118 7.34171 1.95118 7.65829 2.14645 7.85355L6.14645 11.8536C6.34171 12.0488 6.65829 12.0488 6.85355 11.8536C7.04882 11.6583 7.04882 11.3417 6.85355 11.1464L3.20711 7.5L6.85355 3.85355ZM12.8536 3.85355C13.0488 3.65829 13.0488 3.34171 12.8536 3.14645C12.6583 2.95118 12.3417 2.95118 12.1464 3.14645L8.14645 7.14645C7.95118 7.34171 7.95118 7.65829 8.14645 7.85355L12.1464 11.8536C12.3417 12.0488 12.6583 12.0488 12.8536 11.8536C13.0488 11.6583 13.0488 11.3417 12.8536 11.1464L9.20711 7.5L12.8536 3.85355Z" fill="currentColor" />
    </svg>
);
