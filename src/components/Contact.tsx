import { motion } from 'framer-motion';
import { Mail, Linkedin, ArrowRight } from 'lucide-react';

const footerNavLinks = [
    { label: 'Sobre', href: '#sobre' },
    { label: 'Trajetória', href: '#trajetoria' },
    { label: 'Skills', href: '#skills' },
    { label: 'Formação', href: '#formacao' },
    { label: 'Projetos', href: '#projetos' },
    { label: 'Recomendações', href: '#recomendacoes' },
    { label: 'Contato', href: '#contato' },
];

const Contact = () => {
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="py-20 bg-[#0A0A0A]" id="contato"
            style={{ backgroundImage: 'radial-gradient(ellipse at center, rgba(255, 107, 53, 0.06) 0%, transparent 70%)' }}
        >
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold font-heading mb-8 text-[#F5F5F5] tracking-tight">Vamos construir algo incrível juntos?</h2>
                    <p className="text-[#757575] text-xl mb-12 max-w-2xl mx-auto">
                        Estou sempre aberto a novos desafios e parcerias estratégicas.
                    </p>

                    <div className="flex flex-col md:flex-row justify-center gap-6 mb-20">
                        <a href="mailto:isaquemaia2004@gmail.com" className="group inline-flex items-center justify-center gap-3 px-8 py-3 w-full md:w-auto bg-[#FF6B35] text-white rounded-full font-semibold hover:bg-[#E55A2B] [@media(hover:hover)]:hover:scale-[1.02] transition-all duration-300">
                            <Mail size={20} />
                            <span>Enviar E-mail</span>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a href="https://linkedin.com/in/isaque-maia-8ab346268" target="_blank" rel="noopener" className="group inline-flex items-center justify-center gap-3 px-8 py-3 w-full md:w-auto bg-transparent text-[#FF6B35] rounded-full font-semibold border border-[rgba(255,107,53,0.4)] hover:bg-[rgba(255,107,53,0.1)] transition-all duration-300">
                            <Linkedin size={20} />
                            <span>LinkedIn</span>
                        </a>
                    </div>

                    {/* Divider before footer */}
                    <div className="w-full h-px bg-[rgba(255,107,53,0.08)] mb-8" />

                    {/* Footer Navigation */}
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 md:gap-8 mb-8">
                        {footerNavLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className="text-sm text-[#757575] hover:text-[#FF6B35] transition-colors duration-300 font-body"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    <p className="text-[13px] italic text-[#505050] mb-8 font-body">
                        Construído com dados, café e código ☕
                    </p>

                    <footer className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[rgba(255,107,53,0.08)] text-[#757575] text-sm">
                        <p>© {new Date().getFullYear()} Isaque Maia. Todos os direitos reservados.</p>
                        <div className="flex gap-6 mt-4 md:mt-0">
                            <a href="https://github.com/isaquecmaia" target="_blank" rel="noopener" className="hover:text-[#FF8F66] transition-colors">GitHub</a>
                            <a href="https://linkedin.com/in/isaque-maia-8ab346268" target="_blank" rel="noopener" className="hover:text-[#FF8F66] transition-colors">LinkedIn</a>
                        </div>
                    </footer>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
