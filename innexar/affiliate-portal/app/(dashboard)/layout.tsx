'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    DashboardIcon,
    Link2Icon,
    RocketIcon,
    ExitIcon,
    PersonIcon,
    BarChartIcon,
    GearIcon
} from '@radix-ui/react-icons';

// INNEXAR Logo Component
const InnexarLogo = ({ className = "w-10 h-10" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="sidebarRavenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1a3a4a" />
                <stop offset="50%" stopColor="#2d8b96" />
                <stop offset="100%" stopColor="#4aa8b3" />
            </linearGradient>
            <linearGradient id="sidebarRavenAccent" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2d7a85" />
                <stop offset="100%" stopColor="#5bc4cf" />
            </linearGradient>
        </defs>
        <polygon points="50,10 70,25 75,50 65,75 50,85 35,75 25,50 30,25" fill="url(#sidebarRavenGradient)" />
        <polygon points="50,10 65,20 60,35 50,30 40,35 35,20" fill="url(#sidebarRavenAccent)" />
        <polygon points="50,30 55,35 50,45 45,35" fill="#1a3a4a" />
        <polygon points="25,50 15,45 10,60 20,70 35,75" fill="url(#sidebarRavenGradient)" opacity="0.9" />
        <polygon points="75,50 85,45 90,60 80,70 65,75" fill="url(#sidebarRavenGradient)" opacity="0.9" />
        <polygon points="50,85 40,95 50,90 60,95" fill="url(#sidebarRavenAccent)" />
        <circle cx="45" cy="22" r="3" fill="#050b14" />
        <circle cx="46" cy="21" r="1" fill="#4aa8b3" />
    </svg>
);

export default function AffiliateDashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<{ name: string; email: string } | null>(null);

    useEffect(() => {
        // Check auth
        const token = localStorage.getItem('innexar_token');
        const userData = localStorage.getItem('innexar_user');
        
        if (!token) {
            router.push('/login');
            return;
        }

        if (userData) {
            try {
                setUser(JSON.parse(userData));
            } catch {
                // Invalid user data
            }
        }

        setIsLoading(false);
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('innexar_token');
        localStorage.removeItem('innexar_user');
        router.push('/login');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#050b14] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <InnexarLogo className="w-16 h-16 animate-pulse" />
                    <p className="text-[#6b7a8a]">Carregando INNEXAR...</p>
                </div>
            </div>
        );
    }

    const menuItems = [
        { label: 'Dashboard', href: '/', icon: DashboardIcon },
        { label: 'Meus Links', href: '/links', icon: Link2Icon },
        { label: 'Produtos SaaS', href: '/products', icon: RocketIcon },
        { label: 'Comissões', href: '/commissions', icon: BarChartIcon },
        { label: 'Meu Perfil', href: '/profile', icon: PersonIcon },
    ];

    return (
        <div className="min-h-screen bg-[#050b14] text-[#e5e7eb] flex flex-col md:flex-row font-sans">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-[#0a1628] border-r border-[#4aa8b3]/10 p-6 flex flex-col gap-6">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <InnexarLogo className="w-10 h-10" />
                        <div className="absolute inset-0 bg-[#4aa8b3]/20 blur-xl rounded-full" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white tracking-tight">INNEXAR</h2>
                        <p className="text-[10px] text-[#4aa8b3] uppercase tracking-widest">Affiliate Hub</p>
                    </div>
                </div>

                {/* User Info */}
                {user && (
                    <div className="bg-[#050b14]/50 rounded-xl p-4 border border-[#4aa8b3]/10">
                        <p className="text-white font-medium text-sm truncate">{user.name}</p>
                        <p className="text-[#6b7a8a] text-xs truncate">{user.email}</p>
                    </div>
                )}

                {/* Navigation */}
                <nav className="flex-1 space-y-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const active = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                                    active 
                                        ? 'bg-[#4aa8b3]/10 text-white border border-[#4aa8b3]/20' 
                                        : 'text-[#6b7a8a] hover:bg-[#4aa8b3]/5 hover:text-white'
                                }`}
                            >
                                <Icon className={`w-5 h-5 ${active ? 'text-[#4aa8b3]' : ''}`} />
                                <span className="font-medium text-sm">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer Actions */}
                <div className="space-y-2">
                    <Link 
                        href="/settings"
                        className="flex items-center gap-3 px-4 py-3 text-[#6b7a8a] hover:bg-[#4aa8b3]/5 hover:text-white transition-colors rounded-xl"
                    >
                        <GearIcon className="w-5 h-5" />
                        <span className="text-sm font-medium">Configurações</span>
                    </Link>
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-[#6b7a8a] hover:text-[#ef4444] transition-colors rounded-xl"
                    >
                        <ExitIcon className="w-5 h-5" />
                        <span className="text-sm font-medium">Sair</span>
                    </button>
                </div>

                {/* Version */}
                <div className="text-center text-[10px] text-[#4a5568]">
                    INNEXAR v1.0.0
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className="p-6 md:p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
