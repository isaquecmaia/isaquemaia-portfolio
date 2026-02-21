import { motion } from 'framer-motion';
import {
    BarChart, Database, Terminal, Globe,
    Workflow, Layout
} from 'lucide-react';

const categories = [
    {
        title: "Business Intelligence",
        icon: <BarChart size={24} className="text-[#FF6B35]" />,
        skills: ["Looker Studio", "Google Sheets (Avançado)", "KPIs & Métricas", "Visualização de Dados", "Scorecards"],
        primary: true
    },
    {
        title: "Dados & Programação",
        icon: <Database size={24} className="text-[#FF6B35]" />,
        skills: ["Python", "Pandas", "SQL", "ETL Pipelines", "Data Warehouse", "Limpeza de Dados"],
        primary: true
    },
    {
        title: "Automação",
        icon: <Workflow size={24} className="text-[rgba(255,107,53,0.7)]" />,
        skills: ["Make.com", "n8n", "Integrações de API", "Automação de Processos"],
        primary: false
    },
    {
        title: "Desenvolvimento Web",
        icon: <Globe size={24} className="text-[rgba(255,107,53,0.7)]" />,
        skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Vercel"],
        primary: false
    },
    {
        title: "Banco de Dados",
        icon: <Terminal size={24} className="text-[rgba(255,107,53,0.7)]" />,
        skills: ["Supabase", "PostgreSQL", "Modelagem de Dados"],
        primary: false
    },
    {
        title: "Ferramentas de Gestão",
        icon: <Layout size={24} className="text-[rgba(255,107,53,0.7)]" />,
        skills: ["Notion", "Trello", "Monday.com", "Metodologias Ágeis"],
        primary: false
    }
];

const TechStack = () => {
    return (
        <section className="py-16 bg-[#0A0A0A] relative" id="skills">
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:30px_30px]" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center"
                >
                    <span className="text-[13px] font-semibold text-[#FF6B35] uppercase tracking-[3px] mb-2 block font-body">Arsenal Técnico</span>
                    <h2 className="text-3xl md:text-5xl font-bold font-heading text-[#F5F5F5] mb-6">Tecnologias & Habilidades</h2>
                    <p className="text-[#757575] max-w-2xl mx-auto">
                        Um conjunto completo de ferramentas que conecta dados brutos a insights acionáveis de negócio.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className={`group p-6 rounded-2xl transition-all duration-300 [@media(hover:hover)]:hover:scale-[1.02] active:scale-[0.98] hover:border-[rgba(255,107,53,0.4)] hover:shadow-[0_8px_32px_rgba(255,107,53,0.08)] ${category.primary
                                ? 'bg-gradient-to-b from-[rgba(255,107,53,0.12)] to-[rgba(255,107,53,0.04)] border border-[rgba(255,107,53,0.3)]'
                                : 'bg-[#141414] border border-[rgba(255,255,255,0.08)]'
                                }`}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className={`p-3 rounded-lg transition-colors ${category.primary ? 'bg-[rgba(255,107,53,0.1)]' : 'bg-[rgba(255,255,255,0.05)]'
                                    }`}>
                                    {category.icon}
                                </div>
                                <h3 className={`text-xl font-semibold font-heading ${category.primary ? 'text-[#F5F5F5]' : 'text-[#D0D0D0]'
                                    }`}>{category.title}</h3>
                            </div>

                            <ul className="space-y-3">
                                {category.skills.map((skill, i) => (
                                    <li key={i} className={`flex items-center gap-2 text-sm transition-colors ${category.primary ? 'text-[#BDBDBD]' : 'text-[#9E9E9E] group-hover:text-[#BDBDBD]'
                                        }`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${category.primary ? 'bg-[#FF6B35]' : 'bg-[rgba(255,107,53,0.6)]'
                                            }`} />
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechStack;
