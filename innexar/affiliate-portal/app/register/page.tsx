'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
    EnvelopeClosedIcon, 
    LockClosedIcon, 
    EyeOpenIcon, 
    EyeClosedIcon,
    PersonIcon,
    IdCardIcon,
    CheckIcon,
    MobileIcon
} from '@radix-ui/react-icons';

// INNEXAR Logo Component
const InnexarLogo = ({ className = "w-16 h-16" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="ravenGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1a3a4a" />
                <stop offset="50%" stopColor="#2d8b96" />
                <stop offset="100%" stopColor="#4aa8b3" />
            </linearGradient>
            <linearGradient id="ravenAccent2" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2d7a85" />
                <stop offset="100%" stopColor="#5bc4cf" />
            </linearGradient>
        </defs>
        <polygon points="50,10 70,25 75,50 65,75 50,85 35,75 25,50 30,25" fill="url(#ravenGradient2)" />
        <polygon points="50,10 65,20 60,35 50,30 40,35 35,20" fill="url(#ravenAccent2)" />
        <polygon points="50,30 55,35 50,45 45,35" fill="#1a3a4a" />
        <polygon points="25,50 15,45 10,60 20,70 35,75" fill="url(#ravenGradient2)" opacity="0.9" />
        <polygon points="75,50 85,45 90,60 80,70 65,75" fill="url(#ravenGradient2)" opacity="0.9" />
        <polygon points="50,85 40,95 50,90 60,95" fill="url(#ravenAccent2)" />
        <circle cx="45" cy="22" r="3" fill="#050b14" />
        <circle cx="46" cy="21" r="1" fill="#4aa8b3" />
    </svg>
);

export default function AffiliateRegister() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        cpfCnpj: '',
        pixKey: '',
        pixKeyType: 'email',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('As senhas não coincidem');
            return;
        }

        if (formData.password.length < 6) {
            setError('A senha deve ter no mínimo 6 caracteres');
            return;
        }

        if (!acceptTerms) {
            setError('Você precisa aceitar os termos de uso');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://apiaf.innexar.app'}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    cpfCnpj: formData.cpfCnpj,
                    pixKey: formData.pixKey,
                    pixKeyType: formData.pixKeyType,
                    password: formData.password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Erro ao criar conta');
            }

            router.push('/login?registered=true');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao criar conta');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050b14] flex items-center justify-center p-4 py-12 geometric-pattern relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-radial from-[#4aa8b3]/5 to-transparent rounded-full blur-3xl" />
                <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-radial from-[#2d8b96]/5 to-transparent rounded-full blur-3xl" />
            </div>

            <div className="w-full max-w-lg relative z-10">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="relative">
                            <InnexarLogo className="w-16 h-16" />
                            <div className="absolute inset-0 bg-[#4aa8b3]/20 blur-2xl rounded-full" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">
                        INNEXAR
                    </h1>
                    <p className="text-[#6b7a8a] mt-1 text-sm">Torne-se um Afiliado</p>
                </div>

                {/* Card de Registro */}
                <div className="bg-[#0a1628]/80 backdrop-blur-xl border border-[#4aa8b3]/10 rounded-2xl p-8 innexar-glow">
                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-white">Criar conta de afiliado</h2>
                        <p className="text-[#6b7a8a] text-sm mt-1">
                            Ganhe <span className="text-[#4aa8b3] font-semibold">até 20%</span> de comissão recorrente!
                        </p>
                    </div>

                    {error && (
                        <div className="mb-4 p-4 bg-[#ef4444]/10 border border-[#ef4444]/20 rounded-xl text-[#ef4444] text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Nome */}
                        <div>
                            <label className="block text-sm text-[#6b7a8a] mb-2 font-medium">Nome completo</label>
                            <div className="relative">
                                <PersonIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4aa8b3]" />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Seu nome completo"
                                    className="w-full innexar-input pl-11 pr-4 py-3"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm text-[#6b7a8a] mb-2 font-medium">E-mail</label>
                            <div className="relative">
                                <EnvelopeClosedIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4aa8b3]" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="seu@email.com"
                                    className="w-full innexar-input pl-11 pr-4 py-3"
                                    required
                                />
                            </div>
                        </div>

                        {/* Telefone e CPF/CNPJ */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-[#6b7a8a] mb-2 font-medium">Telefone</label>
                                <div className="relative">
                                    <MobileIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4aa8b3]" />
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="(11) 99999-9999"
                                        className="w-full innexar-input pl-11 pr-4 py-3"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-[#6b7a8a] mb-2 font-medium">CPF/CNPJ</label>
                                <div className="relative">
                                    <IdCardIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4aa8b3]" />
                                    <input
                                        type="text"
                                        name="cpfCnpj"
                                        value={formData.cpfCnpj}
                                        onChange={handleChange}
                                        placeholder="000.000.000-00"
                                        className="w-full innexar-input pl-11 pr-4 py-3"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* PIX */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-2">
                                <label className="block text-sm text-[#6b7a8a] mb-2 font-medium">Chave PIX</label>
                                <input
                                    type="text"
                                    name="pixKey"
                                    value={formData.pixKey}
                                    onChange={handleChange}
                                    placeholder="Sua chave PIX para receber"
                                    className="w-full innexar-input px-4 py-3"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-[#6b7a8a] mb-2 font-medium">Tipo</label>
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
                            </div>
                        </div>

                        {/* Senhas */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-[#6b7a8a] mb-2 font-medium">Senha</label>
                                <div className="relative">
                                    <LockClosedIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4aa8b3]" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Mínimo 6 caracteres"
                                    className="w-full innexar-input pl-11 pr-11 py-3"
                                    autoComplete="new-password"
                                    required
                                    minLength={6}
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

                            <div>
                                <label className="block text-sm text-[#6b7a8a] mb-2 font-medium">Confirmar</label>
                                <div className="relative">
                                    <LockClosedIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4aa8b3]" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Repita a senha"
                                    className="w-full innexar-input pl-11 pr-4 py-3"
                                    autoComplete="new-password"
                                    required
                                />
                                </div>
                            </div>
                        </div>

                        {/* Termos */}
                        <label className="flex items-start gap-3 cursor-pointer group">
                            <div 
                                onClick={() => setAcceptTerms(!acceptTerms)}
                                className={`w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center transition-all mt-0.5 ${
                                    acceptTerms 
                                        ? 'bg-[#4aa8b3] border-[#4aa8b3]' 
                                        : 'border-[#4aa8b3]/30 bg-[#0a1628]'
                                }`}
                            >
                                {acceptTerms && <CheckIcon className="w-3 h-3 text-white" />}
                            </div>
                            <span className="text-sm text-[#6b7a8a] group-hover:text-white transition-colors">
                                Concordo com os{' '}
                                <Link href="/terms" className="text-[#4aa8b3] hover:underline">
                                    Termos de Uso
                                </Link>{' '}
                                e a{' '}
                                <Link href="/privacy" className="text-[#4aa8b3] hover:underline">
                                    Política de Privacidade
                                </Link>
                            </span>
                        </label>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full innexar-btn py-3.5 text-white font-bold mt-2"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Criando conta...
                                </span>
                            ) : 'Criar minha conta'}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-[#6b7a8a]">
                        Já tem uma conta?{' '}
                        <Link href="/login" className="text-[#4aa8b3] hover:text-[#5bc4cf] font-medium transition-colors">
                            Fazer login
                        </Link>
                    </div>
                </div>

                {/* Link para Landing */}
                <div className="mt-6 text-center">
                    <Link href="/join" className="text-sm text-[#6b7a8a] hover:text-white transition-colors">
                        ← Saiba mais sobre o programa
                    </Link>
                </div>
            </div>
        </div>
    );
}
