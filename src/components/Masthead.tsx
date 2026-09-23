import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { profile } from '../content/profile';
import IndexOverlay from './IndexOverlay';

const nav = [
    { label: 'Trabalho', id: 'trabalho' },
    { label: 'Experiência', id: 'experiencia' },
    { label: 'Sobre', id: 'sobre' },
    { label: 'Contato', id: 'contato' },
];

export default function Masthead() {
    const { pathname, hash } = useLocation();
    const [active, setActive] = useState('');
    const [where, setWhere] = useState('');
    const [open, setOpen] = useState(false);
    const bar = useRef<HTMLDivElement>(null);

    // O índice também abre por link direto (/#indice).
    useEffect(() => setOpen(hash === '#indice'), [pathname, hash]);

    // Seção atual: qualquer bloco com data-section que cruze o meio da tela.
    useEffect(() => {
        setWhere('');
        setActive('');
        const observer = new IntersectionObserver(
            (entries) =>
                entries.forEach((e) => {
                    if (!e.isIntersecting) return;
                    const el = e.target as HTMLElement;
                    setWhere(el.dataset.section ?? '');
                    if (el.id) setActive(el.id);
                }),
            { rootMargin: '-45% 0px -50% 0px' },
        );
        document.querySelectorAll('[data-section]').forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [pathname]);

    // Progresso de leitura: um fio que cresce da esquerda, só com transform.
    useEffect(() => {
        let frame = 0;
        const update = () => {
            frame = 0;
            const max = document.documentElement.scrollHeight - window.innerHeight;
            const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
            if (bar.current) bar.current.style.transform = `scaleX(${p})`;
        };
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };
        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            cancelAnimationFrame(frame);
        };
    }, [pathname]);

    const go = useCallback(
        (id: string) => (e: React.MouseEvent) => {
            setOpen(false);
            const el = document.getElementById(id);
            if (pathname === '/' && el) {
                e.preventDefault();
                el.scrollIntoView({ behavior: 'smooth' });
                history.replaceState(null, '', `#${id}`);
            }
        },
        [pathname],
    );
    const close = useCallback(() => {
        setOpen(false);
        if (window.location.hash === '#indice') history.replaceState(null, '', window.location.pathname);
    }, []);

    return (
        <>
            <header className="fixed inset-x-0 top-0 z-50 border-b border-rule bg-paper">
                <div className="wrap flex h-(--header-h) items-center justify-between gap-6">
                    <div className="flex min-w-0 items-baseline gap-3">
                        <Link to="/" className="shrink-0 font-serif text-[19px] tracking-[-0.01em] no-underline">
                            {profile.name}
                        </Link>
                        {/* No topo mostra o cargo; durante a leitura, onde o leitor está. */}
                        <span key={where || 'role'} className="label masthead-where hidden truncate lg:inline">
                            {where ? <span className="text-ink">{where}</span> : profile.role}
                        </span>
                    </div>

                    <nav className="flex items-center gap-7 text-[14px]">
                        <div className="hidden items-center gap-7 md:flex">
                            {nav.map((n) => (
                                <Link
                                    key={n.id}
                                    to={`/#${n.id}`}
                                    onClick={go(n.id)}
                                    className={`transition-colors hover:text-ink ${active === n.id ? 'text-ink' : 'text-muted'}`}
                                >
                                    {n.label}
                                </Link>
                            ))}
                        </div>
                        <button
                            type="button"
                            aria-expanded={open}
                            onClick={() => setOpen((v) => !v)}
                            className="label cursor-pointer text-ink transition-colors hover:text-signal"
                        >
                            {open ? 'Fechar' : 'Índice'}
                        </button>
                        <a href={profile.cv} download className="hidden border border-ink px-3 py-1 text-ink transition-colors hover:bg-ink hover:text-paper sm:inline-block">
                            CV ↓
                        </a>
                    </nav>
                </div>
                <div aria-hidden className="absolute inset-x-0 -bottom-px h-[2px] overflow-hidden">
                    <div ref={bar} className="h-full origin-left scale-x-0 bg-signal" />
                </div>
            </header>
            {open && <IndexOverlay onClose={close} onGo={go} />}
        </>
    );
}
