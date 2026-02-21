import { useState, useEffect } from 'react';

const navLinks = [
    { label: 'Sobre', href: '#sobre' },
    { label: 'Trajetória', href: '#trajetoria' },
    { label: 'Skills', href: '#skills' },
    { label: 'Formação', href: '#formacao' },
    { label: 'Projetos', href: '#projetos' },
    { label: 'Recomendações', href: '#recomendacoes' },
    { label: 'Contato', href: '#contato' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 80);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection('#' + entry.target.id);
                    }
                });
            },
            { rootMargin: '-40% 0px -55% 0px' }
        );

        const sections = document.querySelectorAll('section[id]');
        sections.forEach((s) => observer.observe(s));
        return () => observer.disconnect();
    }, []);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
            setMobileOpen(false);
        }
    };

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? 'bg-[rgba(10,10,10,0.92)] backdrop-blur-lg border-b border-[rgba(255,107,53,0.12)]'
                    : 'bg-transparent border-b border-transparent'
                    }`}
            >
                <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
                    {/* Branding: IM badge + name */}
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="flex items-center group"
                    >
                        <img
                            src="/assets/images/profile.jpg"
                            alt="Isaque Maia"
                            className="w-9 h-9 rounded-lg object-cover border-[1.5px] border-[rgba(255,107,53,0.5)] mr-2.5 transition-all duration-300 group-hover:border-[rgba(255,107,53,0.8)]"
                        />
                        <span className="font-heading text-[16px] font-bold text-[#F5F5F5] transition-colors duration-300 group-hover:text-[#FF6B35]">
                            Isaque Maia
                        </span>
                    </a>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={(e) => handleClick(e, link.href)}
                                className={`relative text-[13px] font-body transition-colors duration-300 ${activeSection === link.href
                                    ? 'text-[#FF6B35]'
                                    : 'text-[#BDBDBD] hover:text-[#FF6B35]'
                                    }`}
                            >
                                {link.label}
                                {activeSection === link.href && (
                                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#FF6B35]" />
                                )}
                            </a>
                        ))}
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden flex flex-col gap-1.5 p-2"
                        aria-label="Menu"
                    >
                        <span className={`block w-6 h-0.5 bg-[#FF6B35] transition-transform duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
                        <span className={`block w-6 h-0.5 bg-[#FF6B35] transition-opacity duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
                        <span className={`block w-6 h-0.5 bg-[#FF6B35] transition-transform duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                    </button>
                </div>
            </nav>

            {/* Mobile Sidebar */}
            <div
                className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
            >
                <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
                <div
                    className={`absolute top-0 right-0 h-full w-64 bg-[#0A0A0A] border-l border-[rgba(255,107,53,0.12)] p-8 pt-24 transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                >
                    <div className="flex flex-col gap-6">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={(e) => handleClick(e, link.href)}
                                className={`text-lg font-body transition-colors duration-300 ${activeSection === link.href
                                    ? 'text-[#FF6B35]'
                                    : 'text-[#BDBDBD] hover:text-[#FF6B35]'
                                    }`}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
