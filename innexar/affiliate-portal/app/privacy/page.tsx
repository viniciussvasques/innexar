import Link from 'next/link';

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-[#050b14] py-16 px-4">
            <div className="max-w-3xl mx-auto">
                <Link href="/register" className="text-[#4aa8b3] hover:text-[#5bc4cf] mb-8 inline-block">
                    ← Voltar ao cadastro
                </Link>
                
                <h1 className="text-4xl font-bold text-white mb-8">Política de Privacidade</h1>
                
                <div className="bg-[#0a1628] border border-[#4aa8b3]/10 rounded-2xl p-8 space-y-6 text-[#e5e7eb]">
                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">1. Dados Coletados</h2>
                        <p className="text-[#6b7a8a]">
                            Coletamos as seguintes informações quando você se cadastra:
                        </p>
                        <ul className="list-disc pl-5 text-[#6b7a8a] space-y-2 mt-2">
                            <li>Nome completo e e-mail</li>
                            <li>CPF/CNPJ (para fins fiscais)</li>
                            <li>Dados de pagamento (chave PIX, dados bancários)</li>
                            <li>Endereço IP e informações do dispositivo</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">2. Uso dos Dados</h2>
                        <p className="text-[#6b7a8a]">Seus dados são utilizados para:</p>
                        <ul className="list-disc pl-5 text-[#6b7a8a] space-y-2 mt-2">
                            <li>Gerenciar sua conta de afiliado</li>
                            <li>Processar pagamentos de comissões</li>
                            <li>Rastrear vendas e cliques dos seus links</li>
                            <li>Comunicação sobre o programa</li>
                            <li>Cumprimento de obrigações legais</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">3. Compartilhamento</h2>
                        <p className="text-[#6b7a8a]">
                            Não vendemos seus dados. Compartilhamos apenas com:
                        </p>
                        <ul className="list-disc pl-5 text-[#6b7a8a] space-y-2 mt-2">
                            <li>Produtos SaaS parceiros (apenas dados necessários para rastreamento)</li>
                            <li>Processadores de pagamento</li>
                            <li>Autoridades quando exigido por lei</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">4. Segurança</h2>
                        <p className="text-[#6b7a8a]">
                            Utilizamos criptografia SSL/TLS, senhas hasheadas e outras medidas de segurança para proteger seus dados.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">5. Seus Direitos</h2>
                        <p className="text-[#6b7a8a]">Você tem direito a:</p>
                        <ul className="list-disc pl-5 text-[#6b7a8a] space-y-2 mt-2">
                            <li>Acessar seus dados pessoais</li>
                            <li>Corrigir dados incorretos</li>
                            <li>Solicitar exclusão da conta</li>
                            <li>Exportar seus dados</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">6. Contato</h2>
                        <p className="text-[#6b7a8a]">
                            Para questões sobre privacidade, entre em contato através do e-mail: suporte@innexar.app
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

