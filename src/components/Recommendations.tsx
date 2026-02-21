import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';
import { useState } from 'react';

interface Recommendation {
    name: string;
    title: string;
    company: string;
    relation: string;
    photo: string;
    initials: string;
    linkedinUrl: string;
    paragraphs: string[];
}

const recommendations: Recommendation[] = [
    {
        name: 'Vitor Nogueira',
        title: 'Team Leader Efficiency Ops | Melhoria Contínua | Gestão de Projetos | Gestão da Qualidade',
        company: 'QuintoAndar',
        relation: 'Em 10 de novembro de 2025, Vitor supervisionava Isaque diretamente',
        photo: '/assets/images/vitor-nogueira.jpg',
        initials: 'VN',
        linkedinUrl: 'https://www.linkedin.com/in/vitor-nogueira-11a800199/',
        paragraphs: [
            'Isaque é um profissional exemplar, extremamente organizado, comprometido com prazos e com entregas sempre consistentes. Demonstra grande interesse por inovação e criatividade, sendo uma pessoa naturalmente curiosa, o que o destaca entre os demais.',
            'Possui uma energia positiva contagiante e uma postura colaborativa admirável, sempre disposto a compartilhar conhecimentos e contribuir para o desenvolvimento do time.',
            'Suas principais skills incluem:\n• Comunicação clara e eficaz\n• Flexibilidade diante de mudanças\n• Abertura e compreensão frente a feedbacks construtivos\n• Forte domínio de processos, documentação, qualidade, melhoria contínua e treinamentos',
            'Em resumo, Isaque é um profissional completo, com mentalidade de crescimento e um espírito de equipe que faz a diferença em qualquer ambiente de trabalho.',
        ],
    },
];

function RecommendationCard({ rec, index }: { rec: Recommendation; index: number }) {
    const [imgError, setImgError] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.7, ease: 'easeOut' }}
            className="relative p-5 md:p-8 rounded-2xl bg-[rgba(255,255,255,0.05)] backdrop-blur-[10px] border border-[rgba(255,255,255,0.1)] transition-all duration-300 hover:shadow-[0_8px_32px_rgba(255,107,53,0.1)]"
        >
            {/* Decorative quote mark */}
            <span className="absolute top-4 right-6 text-[48px] md:text-[72px] leading-none font-heading font-bold text-[#FF6B35] opacity-15 select-none pointer-events-none" aria-hidden>
                "
            </span>

            <div className="flex items-start gap-5 mb-6">
                {/* Photo */}
                <div className="w-[60px] h-[60px] rounded-full overflow-hidden shrink-0 border-2 border-[rgba(255,107,53,0.3)]">
                    {imgError ? (
                        <div className="w-full h-full bg-[#FF6B35] flex items-center justify-center">
                            <span className="font-heading font-bold text-lg text-white">{rec.initials}</span>
                        </div>
                    ) : (
                        <img
                            src={rec.photo}
                            alt={rec.name}
                            className="w-full h-full object-cover"
                            onError={() => setImgError(true)}
                        />
                    )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                        <h4 className="text-[#F5F5F5] font-heading font-bold text-base">{rec.name}</h4>
                        <a
                            href={rec.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#757575] hover:text-[#FF6B35] transition-colors"
                            aria-label={`LinkedIn de ${rec.name}`}
                        >
                            <Linkedin size={14} />
                        </a>
                    </div>
                    <p className="text-sm text-[#BDBDBD] leading-snug">{rec.title}</p>
                    <p className="text-xs text-[#757575] mt-1">{rec.company} · {rec.relation}</p>
                </div>
            </div>

            {/* Quote text */}
            <div className="space-y-4 text-[#BDBDBD] leading-relaxed text-[15px] italic">
                {rec.paragraphs.map((p, i) => (
                    <p key={i} className="whitespace-pre-line">
                        {i === 0 ? '"' : ''}{p}{i === rec.paragraphs.length - 1 ? '"' : ''}
                    </p>
                ))}
            </div>
        </motion.div>
    );
}

const Recommendations = () => {
    return (
        <section className="py-20 bg-[#111111]" id="recomendacoes">
            <div className="container mx-auto px-4 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-[13px] font-semibold text-[#FF6B35] uppercase tracking-[3px] mb-2 block font-body">Recomendações</span>
                    <h2 className="text-3xl md:text-5xl font-bold font-heading text-[#F5F5F5]">O que dizem sobre mim</h2>
                </motion.div>

                <div className="space-y-8">
                    {recommendations.map((rec, i) => (
                        <RecommendationCard key={i} rec={rec} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Recommendations;
