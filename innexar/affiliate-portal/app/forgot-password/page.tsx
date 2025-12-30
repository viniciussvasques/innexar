'use client';

import { useState } from 'react';
import Link from 'next/link';
import { EnvelopeClosedIcon, CheckCircledIcon } from '@radix-ui/react-icons';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // TODO: Implementar endpoint de recuperação de senha
            await new Promise(resolve => setTimeout(resolve, 1500));
            setSent(true);
        } catch {
            setError('Erro ao enviar e-mail. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050b14] flex items-center justify-center p-4 geometric-pattern">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white">INNEXAR</h1>
                    <p className="text-[#6b7a8a] mt-2">Recuperar senha</p>
                </div>

                <div className="bg-[#0a1628]/80 backdrop-blur-xl border border-[#4aa8b3]/10 rounded-2xl p-8">
                    {sent ? (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-[#10b981]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircledIcon className="w-8 h-8 text-[#10b981]" />
                            </div>
                            <h2 className="text-xl font-bold text-white mb-2">E-mail enviado!</h2>
                            <p className="text-[#6b7a8a] mb-6">
                                Se existe uma conta com esse e-mail, você receberá as instruções para redefinir sua senha.
                            </p>
                            <Link 
                                href="/login"
                                className="text-[#4aa8b3] hover:text-[#5bc4cf] font-medium"
                            >
                                Voltar ao login
                            </Link>
                        </div>
                    ) : (
                        <>
                            <h2 className="text-xl font-bold text-white mb-2">Esqueceu sua senha?</h2>
                            <p className="text-[#6b7a8a] text-sm mb-6">
                                Digite seu e-mail e enviaremos instruções para redefinir sua senha.
                            </p>

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

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full innexar-btn py-3.5 text-white font-bold"
                                >
                                    {isLoading ? 'Enviando...' : 'Enviar instruções'}
                                </button>
                            </form>

                            <div className="mt-6 text-center">
                                <Link href="/login" className="text-[#4aa8b3] hover:text-[#5bc4cf] text-sm">
                                    ← Voltar ao login
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

