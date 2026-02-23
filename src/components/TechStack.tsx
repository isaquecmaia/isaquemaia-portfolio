import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Database, BarChart3, Settings } from 'lucide-react';

type SkillLevel = 'Avançado' | 'Intermediário' | 'Em evolução';

interface Skill {
    name: string;
    level: SkillLevel;
}

interface SkillBlock {
    title: string;
    icon: React.ReactNode;
    skills: Skill[];
    primary?: boolean;
}

const levelWidth: Record<SkillLevel, string> = {
    'Avançado': '92%',
    'Intermediário': '70%',
    'Em evolução': '50%',
};

const blocks: SkillBlock[] = [
    {
        title: 'Dados & Analytics',
        icon: <Database size={22} />,
        primary: true,
        skills: [
            { name: 'Looker Studio', level: 'Avançado' },
            { name: 'KPIs & Métricas', level: 'Avançado' },
            { name: 'Visualização de Dados', level: 'Avançado' },
            { name: 'Python', level: 'Intermediário' },
            { name: 'SQL', level: 'Intermediário' },
            { name: 'Modelagem de Dados', level: 'Em evolução' },
            { name: 'ETL / Tratamento de Dados', level: 'Em evolução' },
        ],
    },
    {
        title: 'Business Intelligence & Performance',
        icon: <BarChart3 size={22} />,
        skills: [
            { name: 'Construção de Dashboards', level: 'Avançado' },
            { name: 'Scorecards', level: 'Avançado' },
            { name: 'Excel / Google Sheets', level: 'Avançado' },
            { name: 'Definição de Indicadores', level: 'Avançado' },
            { name: 'Análise de Performance Operacional', level: 'Intermediário' },
            { name: 'Data-driven decision making', level: 'Intermediário' },
        ],
    },
    {
        title: 'Automação & Processos',
        icon: <Settings size={22} />,
        skills: [
            { name: 'Google Apps Script', level: 'Intermediário' },
            { name: 'Automação com Notion', level: 'Intermediário' },
        ],
    },
];

function SkillBar({ skill, index }: { skill: Skill; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-40px' });

    const levelColor: Record<SkillLevel, string> = {
        'Avançado': 'text-[#FF6B35]',
        'Intermediário': 'text-[#FF8F66]',
        'Em evolução': 'text-[#BDBDBD]',
    };

    return (
        <div ref={ref} className="space-y-2">
            <div className="flex items-center justify-between">
                <span className="text-sm text-[#E0E0E0] font-body">{skill.name}</span>
                <span className={`text-xs font-semibold uppercase tracking-wider ${levelColor[skill.level]}`}>
                    {skill.level}
                </span>
            </div>
            <div className="w-full h-[6px] bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
                <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#FF6B35] to-[#FF8F66]"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: levelWidth[skill.level] } : { width: 0 }}
                    transition={{
                        duration: 1,
                        delay: index * 0.08,
                        ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                />
            </div>
        </div>
    );
}

function SkillBlockCard({ block, blockIndex }: { block: SkillBlock; blockIndex: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: blockIndex * 0.15, duration: 0.6, ease: 'easeOut' }}
            className={`p-6 md:p-8 rounded-2xl border transition-all duration-300 ${block.primary
                ? 'bg-gradient-to-b from-[rgba(255,107,53,0.10)] to-[rgba(255,107,53,0.03)] border-[rgba(255,107,53,0.25)] lg:col-span-2'
                : 'bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.08)]'
                }`}
        >
            {/* Block Header */}
            <div className="flex items-center gap-3 mb-8">
                <div className={`p-2.5 rounded-lg ${block.primary ? 'bg-[rgba(255,107,53,0.15)] text-[#FF6B35]' : 'bg-[rgba(255,255,255,0.06)] text-[#FF8F66]'}`}>
                    {block.icon}
                </div>
                <h3 className="text-lg font-semibold font-heading text-[#F5F5F5]">{block.title}</h3>
            </div>

            {/* Skills */}
            <div className="space-y-5">
                {block.skills.map((skill, i) => (
                    <SkillBar key={skill.name} skill={skill} index={i} />
                ))}
            </div>
        </motion.div>
    );
}

const TechStack = () => {
    return (
        <section className="py-16 bg-[#0A0A0A] relative" id="skills">
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:30px_30px]" />

            <div className="container mx-auto px-4 max-w-5xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center"
                >
                    <span className="text-[13px] font-semibold text-[#FF6B35] uppercase tracking-[3px] mb-2 block font-body">Competências</span>
                    <h2 className="text-3xl md:text-5xl font-bold font-heading text-[#F5F5F5] mb-6">Skills & Expertise</h2>
                    <p className="text-[#757575] max-w-2xl mx-auto">
                        De dados brutos a decisões estratégicas — ferramentas e competências que transformam informação em resultado.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {blocks.map((block, i) => (
                        <SkillBlockCard key={block.title} block={block} blockIndex={i} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechStack;
