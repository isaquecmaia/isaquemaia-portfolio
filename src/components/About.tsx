import { motion } from 'framer-motion';
import { MapPin, Building2, BarChart3 } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

const About = () => {
    const progressRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [imgError, setImgError] = useState(false);

    const languages = [
        {
            flag: <img src="https://flagcdn.com/h40/br.png" alt="Brasil" className="w-8 h-6 rounded-sm object-cover shadow-sm" />,
            name: 'Português',
            level: 'Nativo',
            percent: 100,
        },
        {
            flag: <img src="https://flagcdn.com/h40/us.png" alt="Estados Unidos" className="w-8 h-6 rounded-sm object-cover shadow-sm" />,
            name: 'Inglês',
            level: 'Avançado',
            percent: 85,
        },
    ];

    useEffect(() => {
        const observers: IntersectionObserver[] = [];
        progressRefs.current.forEach((el, i) => {
            if (!el) return;
            const observer = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting) {
                        gsap.fromTo(
                            el,
                            { width: '0%' },
                            { width: `${languages[i].percent}%`, duration: 1.2, ease: 'power2.out', delay: i * 0.2 }
                        );
                        observer.disconnect();
                    }
                },
                { threshold: 0.5 }
            );
            observer.observe(el);
            observers.push(observer);
        });
        return () => observers.forEach((o) => o.disconnect());
    }, []);

    return (
        <section className="py-16 bg-[#0A0A0A] text-[#BDBDBD]" id="sobre">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="text-center mb-16"
                >
                    <span className="text-[#FF6B35] font-semibold tracking-[3px] text-[13px] uppercase mb-4 block font-body">Sobre Mim</span>
                    <h2 className="text-3xl md:text-5xl font-bold font-heading mb-8 text-[#F5F5F5]">
                        Transformando dados brutos em
                        <span className="text-[#FF6B35]"> decisões estratégicas</span>.
                    </h2>
                </motion.div>

                {/* Profile photo + Bio */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
                    {/* Profile photo */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="shrink-0"
                    >
                        <div className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-full p-[3px] bg-gradient-to-br from-[#FF6B35] to-[#E55A2B] shadow-[0_0_24px_rgba(255,107,53,0.25)]">
                            {imgError ? (
                                <div className="w-full h-full rounded-full bg-[#FF6B35] flex items-center justify-center">
                                    <span className="font-heading font-bold text-2xl md:text-3xl text-white">IM</span>
                                </div>
                            ) : (
                                <img
                                    src="/assets/images/profile.jpg"
                                    alt="Isaque Maia"
                                    className="w-full h-full rounded-full object-cover"
                                    onError={() => setImgError(true)}
                                />
                            )}
                        </div>
                    </motion.div>

                    {/* Bio paragraphs */}
                    <div className="space-y-6">
                        {[
                            <p key="p1" className="text-[#BDBDBD] text-lg md:text-xl leading-relaxed">
                                Sou <strong className="text-[#F5F5F5]">Isaque Couto Maia</strong>, Analista de Dados e Operações localizado em Belo Horizonte. Atualmente na <strong className="text-[#F5F5F5]">Pagaa</strong>, uma fintech de processamento de pagamentos, onde sou responsável por toda a operação de Business Intelligence — do Data Warehouse aos dashboards executivos.
                            </p>,
                            <p key="p2" className="text-[#BDBDBD] text-lg md:text-xl leading-relaxed">
                                Meu trabalho envolve consolidar dados de múltiplos adquirentes, construir métricas de performance e criar automações que eliminam trabalho manual. Já gerenciei dados de mais de 11 mil transações, monitorando <span className="text-[#FF6B35] font-bold">R$3.5M+</span> em volume de pagamentos.
                            </p>,
                            <p key="p3" className="text-[#BDBDBD] text-lg md:text-xl leading-relaxed">
                                Atualmente estou cursando Análise e Desenvolvimento de Sistemas e estou sempre buscando evoluir — tanto em ferramentas técnicas como Python e SQL quanto em visão de negócio.
                            </p>
                        ].map((paragraph, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.15 * i, ease: 'easeOut' }}
                            >
                                {paragraph}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Info cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                    {[
                        { icon: <MapPin size={20} className="text-[#FF6B35] shrink-0" />, text: 'Belo Horizonte, MG', strong: false },
                        { icon: <Building2 size={20} className="text-[#FF6B35] shrink-0" />, text: 'Pagaa — Fintech', strong: false },
                        { icon: <BarChart3 size={20} className="text-[#FF6B35] shrink-0" />, text: 'R$3.5M+ monitorados', strong: true },
                    ].map((card, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: 'easeOut' }}
                            className={`flex items-center gap-3 rounded-xl border bg-[#141414] px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 ${card.strong
                                ? 'border-[rgba(255,107,53,0.35)] hover:border-[rgba(255,107,53,0.5)]'
                                : 'border-[rgba(255,107,53,0.12)] hover:border-[rgba(255,107,53,0.3)]'
                                }`}
                        >
                            {card.icon}
                            <span className={`text-sm text-[#BDBDBD] ${card.strong ? 'font-semibold' : ''}`}>{card.text}</span>
                        </motion.div>
                    ))}
                </div>

                {/* Languages */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                    {languages.map((lang, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-4 rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] backdrop-blur-[10px] px-5 py-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_4px_20px_rgba(255,107,53,0.08)]"
                        >
                            <div className="shrink-0">{lang.flag}</div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-baseline justify-between mb-1.5">
                                    <span className="text-sm font-semibold text-[#F5F5F5]">{lang.name}</span>
                                    <span className="text-xs text-[#757575]">{lang.level}</span>
                                </div>
                                <div className="h-1.5 rounded-full bg-[rgba(255,255,255,0.08)] overflow-hidden">
                                    <div
                                        ref={(el) => { progressRefs.current[i] = el; }}
                                        className="h-full rounded-full bg-[#FF6B35]"
                                        style={{ width: '0%' }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default About;
