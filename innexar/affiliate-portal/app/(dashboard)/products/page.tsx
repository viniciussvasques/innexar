'use client';

import { useEffect, useState } from 'react';
import {
    RocketIcon,
    ExternalLinkIcon,
    Link2Icon,
    CheckIcon,
} from '@radix-ui/react-icons';
import { innexarApi } from '@/lib/api';

interface Product {
    id: string;
    code: string;
    name: string;
    description?: string;
    logoUrl?: string;
    baseUrl: string;
    commissionRate: number;
    cookieDays: number;
    isActive: boolean;
}

interface AffiliateLink {
    id: string;
    productId: string;
    code: string;
    targetUrl: string;
}

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [myLinks, setMyLinks] = useState<AffiliateLink[]>([]);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState<string | null>(null);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {
            const [productsData, linksData] = await Promise.all([
                innexarApi.getProducts(),
                innexarApi.getLinks()
            ]);
            setProducts(productsData);
            setMyLinks(linksData);
        } catch (error) {
            console.error('Erro ao carregar produtos:', error);
        } finally {
            setLoading(false);
        }
    }

    const handleCreateLink = async (productId: string) => {
        setCreating(productId);
        try {
            await innexarApi.createLink(productId);
            await loadData();
        } catch (error) {
            console.error('Erro ao criar link:', error);
        } finally {
            setCreating(null);
        }
    };

    const hasLinkFor = (productId: string) => {
        return myLinks.some(l => l.productId === productId);
    };

    const getLinkFor = (productId: string) => {
        return myLinks.find(l => l.productId === productId);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header>
                <h1 className="text-3xl font-extrabold text-white">Produtos SaaS</h1>
                <p className="text-[#6b7a8a] mt-1">Explore os produtos disponíveis e crie seus links de afiliado.</p>
            </header>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    [1, 2, 3].map(i => (
                        <div key={i} className="h-64 bg-[#0a1628] animate-pulse rounded-2xl border border-[#4aa8b3]/10" />
                    ))
                ) : products.length === 0 ? (
                    <div className="col-span-full bg-[#0a1628] border border-[#4aa8b3]/10 rounded-2xl p-12 text-center">
                        <RocketIcon className="w-12 h-12 text-[#4aa8b3] mx-auto mb-4 opacity-50" />
                        <h3 className="text-white font-bold text-lg mb-2">Nenhum produto disponível</h3>
                        <p className="text-[#6b7a8a]">Novos produtos serão adicionados em breve.</p>
                    </div>
                ) : products.map((product) => {
                    const hasLink = hasLinkFor(product.id);
                    const link = getLinkFor(product.id);
                    
                    return (
                        <div 
                            key={product.id} 
                            className="bg-[#0a1628] border border-[#4aa8b3]/10 rounded-2xl overflow-hidden hover:border-[#4aa8b3]/20 transition-all group"
                        >
                            {/* Product Header */}
                            <div className="bg-gradient-to-br from-[#1a3a4a]/50 to-[#2d8b96]/30 p-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center">
                                        {product.logoUrl ? (
                                            <img src={product.logoUrl} alt={product.name} className="w-10 h-10 rounded" />
                                        ) : (
                                            <RocketIcon className="w-7 h-7 text-[#4aa8b3]" />
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-lg">{product.name}</h3>
                                        <p className="text-[#4aa8b3] text-xs font-mono">{product.code}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Product Body */}
                            <div className="p-6">
                                <p className="text-[#6b7a8a] text-sm mb-4 line-clamp-2">
                                    {product.description || 'Sistema SaaS completo para seu negócio.'}
                                </p>

                                {/* Stats */}
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="bg-[#050b14]/50 rounded-xl p-3 text-center">
                                        <p className="text-[#10b981] font-bold text-xl">{(product.commissionRate * 100).toFixed(0)}%</p>
                                        <p className="text-[#6b7a8a] text-[10px] uppercase tracking-wider">Comissão</p>
                                    </div>
                                    <div className="bg-[#050b14]/50 rounded-xl p-3 text-center">
                                        <p className="text-[#4aa8b3] font-bold text-xl">{product.cookieDays}</p>
                                        <p className="text-[#6b7a8a] text-[10px] uppercase tracking-wider">Dias Cookie</p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2">
                                    {hasLink ? (
                                        <button 
                                            className="flex-1 inline-flex items-center justify-center gap-2 bg-[#10b981]/10 text-[#10b981] py-3 rounded-xl font-medium text-sm"
                                            disabled
                                        >
                                            <CheckIcon />
                                            Link Criado
                                        </button>
                                    ) : (
                                        <button 
                                            onClick={() => handleCreateLink(product.id)}
                                            disabled={creating === product.id}
                                            className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#4aa8b3] to-[#2d7a85] text-white py-3 rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-[#4aa8b3]/25 transition-all disabled:opacity-50"
                                        >
                                            <Link2Icon />
                                            {creating === product.id ? 'Criando...' : 'Criar Link'}
                                        </button>
                                    )}
                                    <a
                                        href={product.baseUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 bg-[#4aa8b3]/10 hover:bg-[#4aa8b3]/20 rounded-xl text-[#4aa8b3] transition-colors"
                                        title="Visitar Site"
                                    >
                                        <ExternalLinkIcon />
                                    </a>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
