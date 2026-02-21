import { motion } from 'framer-motion';

const experiences = [
    {
        role: "Analista de Dados e Operações",
        company: "Pagaa — Fintech de Pagamentos",
        period: "2025 – Atual",
        location: "Belo Horizonte, MG",
        logo: "/assets/logos/Logo Pagaa.jpg",
        description: "Responsável pela operação completa de Business Intelligence em uma fintech de processamento de pagamentos.",
        highlights: [
            "Dashboards no Looker Studio monitorando TPV de 3 adquirentes",
            "Gerenciamento de Data Warehouse com atualizações diárias e processamento incremental",
            "Sistema de Scorecard com 64 métricas para analisar clientes ativos",
            "Automações de vendas integrando Fireflies AI + Make + Notion CRM",
            "Migração de arquitetura de dashboards, otimizando 46 colunas para 12",
            "Apoio direto à diretoria com análises de margem, churn e saúde de clientes"
        ],
        result: "Dashboard com 6 páginas cobrindo R$3.5M+ em TPV e métricas de crescimento WoW/MoM/DoD."
    },
    {
        role: "Efficiency Ops — Qualidade e Treinamento",
        company: "Grupo QuintoAndar — PropTech",
        period: "2024 – 2025",
        location: "",
        logo: "/assets/logos/Logo Quinto Andar.jpg",
        description: "Atuação em qualidade e análise de dados com entregas acima das atribuições do cargo.",
        highlights: [
            "Monitorias e avaliações de qualidade de atendimentos",
            "Mapeamento e documentação de bugs na plataforma",
            "Automações em Google Sheets para otimização de processos",
            "Análises no Looker Studio para indicadores de qualidade",
            "Participação em reuniões estratégicas com gestores"
        ],
        result: "Indicado formalmente para promoção a Analista de Inteligência Conversacional por alta performance."
    },
    {
        role: "Auxiliar Administrativo",
        company: "Expertise Pesquisas",
        period: "2021 – 2023",
        location: "",
        logo: "/assets/logos/Logo Expertise.jpg",
        description: "Base da carreira em qualidade de dados e análise.",
        highlights: [
            "Validação e controle de qualidade de pesquisas",
            "Elaboração de relatórios analíticos",
            "Organização e tratamento de dados"
        ],
        result: ""
    }
];

const Experience = () => {
    return (
        <section className="py-20 bg-[#111111]" id="trajetoria">
            <div className="container mx-auto px-4 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-[13px] font-semibold text-[#FF6B35] uppercase tracking-[3px] mb-2 block font-body">Trajetória</span>
                    <h2 className="text-3xl md:text-4xl font-bold font-heading text-[#F5F5F5] mb-4">Experiência Profissional</h2>
                </motion.div>

                <div className="relative border-l-2 border-[rgba(255,107,53,0.2)] ml-6 md:ml-14 space-y-16">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15, duration: 0.6, ease: 'easeOut' }}
                            className="group relative pl-10 md:pl-14"
                        >
                            {/* Company Logo — grayscale by default, color on hover */}
                            <div className="absolute -left-[22px] top-0 w-10 h-10 rounded-full overflow-hidden border-2 border-[rgba(255,107,53,0.3)] bg-[#111111] shadow-lg">
                                <img
                                    src={exp.logo}
                                    alt={`Logo ${exp.company}`}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                        if (target.parentElement) {
                                            target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-[rgba(255,107,53,0.15)] text-[#FF6B35] text-xs font-bold">${exp.company.charAt(0)}</div>`;
                                        }
                                    }}
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-1">
                                <h3 className="text-xl font-bold font-heading text-[#F5F5F5]">{exp.role}</h3>
                                <span className="text-sm font-mono text-[#FF6B35] shrink-0">{exp.period}</span>
                            </div>

                            <div className="text-lg text-[#BDBDBD] font-medium mb-1">{exp.company}</div>
                            {exp.location && <div className="text-sm text-[#757575] mb-3">{exp.location}</div>}
                            <p className="text-[#BDBDBD] leading-relaxed mb-4">{exp.description}</p>

                            <ul className="space-y-2 mb-4">
                                {exp.highlights.map((item, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.15 + i * 0.08, duration: 0.4 }}
                                        className="flex items-start gap-2 text-[#BDBDBD] text-sm"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] mt-1.5 shrink-0" />
                                        {item}
                                    </motion.li>
                                ))}
                            </ul>

                            {exp.result && (
                                <div className="mt-3 px-4 py-3 rounded-lg bg-[rgba(255,107,53,0.05)] border-l-[3px] border-[#FF6B35]">
                                    <span className="text-xs text-[#FF6B35] uppercase tracking-wider font-bold">Resultado</span>
                                    <p className="text-[#BDBDBD] text-sm mt-1">{exp.result}</p>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
