import Link from 'next/link';

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-[#050b14] py-16 px-4">
            <div className="max-w-3xl mx-auto">
                <Link href="/register" className="text-[#4aa8b3] hover:text-[#5bc4cf] mb-8 inline-block">
                    ← Voltar ao cadastro
                </Link>
                
                <h1 className="text-4xl font-bold text-white mb-8">Termos de Uso</h1>
                
                <div className="bg-[#0a1628] border border-[#4aa8b3]/10 rounded-2xl p-8 space-y-6 text-[#e5e7eb]">
                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">1. Aceitação dos Termos</h2>
                        <p className="text-[#6b7a8a]">
                            Ao se cadastrar como afiliado na plataforma INNEXAR, você concorda com estes termos de uso e se compromete a segui-los integralmente.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">2. Programa de Afiliados</h2>
                        <p className="text-[#6b7a8a]">
                            O programa de afiliados INNEXAR permite que você promova produtos SaaS parceiros e receba comissões por vendas realizadas através dos seus links de indicação.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">3. Comissões</h2>
                        <ul className="list-disc pl-5 text-[#6b7a8a] space-y-2">
                            <li>As taxas de comissão variam por produto e são exibidas no catálogo</li>
                            <li>Comissões são calculadas sobre o valor líquido das vendas</li>
                            <li>O período de cookie tracking é definido por produto</li>
                            <li>Comissões são creditadas após aprovação da venda</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">4. Pagamentos</h2>
                        <ul className="list-disc pl-5 text-[#6b7a8a] space-y-2">
                            <li>O valor mínimo para saque é de R$ 50,00</li>
                            <li>Pagamentos são realizados via PIX</li>
                            <li>Saques são processados em até 5 dias úteis</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">5. Proibições</h2>
                        <p className="text-[#6b7a8a]">É proibido:</p>
                        <ul className="list-disc pl-5 text-[#6b7a8a] space-y-2 mt-2">
                            <li>Usar spam ou práticas enganosas para promover links</li>
                            <li>Fazer auto-compras para gerar comissões</li>
                            <li>Violar direitos de propriedade intelectual</li>
                            <li>Utilizar tráfego fraudulento ou bots</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">6. Rescisão</h2>
                        <p className="text-[#6b7a8a]">
                            A INNEXAR reserva-se o direito de encerrar sua conta a qualquer momento em caso de violação destes termos, fraude ou inatividade prolongada.
                        </p>
                    </section>

                    <p className="text-[#4a5568] text-sm mt-8">
                        Última atualização: Dezembro de 2024
                    </p>
                </div>
            </div>
        </div>
    );
}

