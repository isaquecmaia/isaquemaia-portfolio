import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

interface FormationCard {
    logo: string;
    title: string;
    institution: string;
    status: 'Cursando' | 'Em andamento' | 'Concluído';
    endDate: string;
}

interface CertCard {
    logo: string;
    title: string;
    issuer: string;
    pdfUrl: string;
}

const formations: FormationCard[] = [
    {
        logo: '/assets/logos/Logo Descomplica Faculdade.png',
        title: 'Análise e Desenvolvimento de Sistemas',
        institution: 'Descomplica Faculdade Digital',
        status: 'Cursando',
        endDate: 'Dezembro de 2026',
    },
    {
        logo: '/assets/logos/Logo Mate Academy.jpg',
        title: 'Curso de Análise de Dados',
        institution: 'Mate Academy',
        status: 'Em andamento',
        endDate: 'Setembro de 2026',
    },
];

const certifications: CertCard[] = [
    {
        logo: '/assets/logos/Logo Mate Academy.jpg',
        title: 'Data Analytics - Basic',
        issuer: 'Mate Academy',
        pdfUrl: '/assets/certificates/data-analytics-basic-mate-academy.pdf',
    },
    {
        logo: '/assets/logos/Logo Quinto Andar.jpg',
        title: 'Análise de Dados',
        issuer: 'Grupo QuintoAndar',
        pdfUrl: '/assets/certificates/analise-dados-quintoandar.png',
    },
];

function StatusBadge({ status }: { status: string }) {
    const isCompleted = status === 'Concluído';
    return (
        <span
            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${isCompleted
                ? 'bg-[rgba(34,197,94,0.15)] text-[#22c55e]'
                : 'bg-[rgba(255,107,53,0.15)] text-[#FF6B35]'
                }`}
        >
            <span className={`w-1.5 h-1.5 rounded-full ${isCompleted ? 'bg-[#22c55e]' : 'bg-[#FF6B35]'}`} />
            {status}
        </span>
    );
}

const Education = () => {
    return (
        <section className="py-16 bg-[#0A0A0A]" id="formacao">
            <div className="container mx-auto px-4 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-[13px] font-semibold text-[#FF6B35] uppercase tracking-[3px] mb-2 block font-body">Formação & Certificações</span>
                    <h2 className="text-3xl md:text-5xl font-bold font-heading text-[#F5F5F5]">Formação & Certificações</h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Formação Acadêmica */}
                    <div>
                        <h3 className="text-lg font-semibold font-heading text-[#F5F5F5] mb-6">Formação Acadêmica</h3>
                        <div className="space-y-4">
                            {formations.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.15, duration: 0.6 }}
                                    className="group p-5 rounded-2xl bg-[rgba(255,255,255,0.05)] backdrop-blur-[10px] border border-[rgba(255,255,255,0.1)] transition-all duration-300 [@media(hover:hover)]:hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_8px_32px_rgba(255,107,53,0.1)]"
                                >
                                    <div className="flex items-start gap-4">
                                        <img src={item.logo} alt={item.institution} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-[#F5F5F5] font-heading font-semibold text-base mb-1">{item.title}</h4>
                                            <p className="text-sm text-[#BDBDBD] mb-2">{item.institution}</p>
                                            <div className="flex items-center gap-3 flex-wrap">
                                                <StatusBadge status={item.status} />
                                                <span className="text-xs text-[#757575]">Previsão: {item.endDate}</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Certificações */}
                    <div>
                        <h3 className="text-lg font-semibold font-heading text-[#F5F5F5] mb-6">Certificações</h3>
                        <div className="space-y-4">
                            {certifications.map((cert, i) => (
                                <motion.a
                                    key={i}
                                    href={cert.pdfUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.15, duration: 0.6 }}
                                    className="group flex items-start gap-4 p-5 rounded-2xl bg-[rgba(255,255,255,0.05)] backdrop-blur-[10px] border border-[rgba(255,255,255,0.1)] transition-all duration-300 [@media(hover:hover)]:hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_8px_32px_rgba(255,107,53,0.1)] cursor-pointer"
                                >
                                    <img src={cert.logo} alt={cert.issuer} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-[#F5F5F5] font-heading font-semibold text-base mb-1 group-hover:text-[#FF6B35] transition-colors">{cert.title}</h4>
                                        <p className="text-sm text-[#BDBDBD]">Emitido por: {cert.issuer}</p>
                                    </div>
                                    <ExternalLink size={18} className="text-[#757575] group-hover:text-[#FF6B35] transition-colors shrink-0 mt-1" />
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Education;
