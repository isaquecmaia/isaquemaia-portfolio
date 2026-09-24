import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { profile } from '../content/profile';
import { localeMeta, locales, stripLocale, useI18n, withLocale } from '../i18n';
import IndexOverlay from './IndexOverlay';
import A11yPanel from './A11yPanel';

const nav = ['trabalho', 'experiencia', 'sobre', 'contato'] as const;

export default function Masthead() {
    const { pathname, hash } = useLocation();
    const { t, c, locale, to } = useI18n();
    const [active, setActive] = useState('');
    const [where, setWhere] = useState('');
    const [open, setOpen] = useState(false);
    const [a11y, setA11y] = useState(false);
    const bar = useRef<HTMLDivElement>(null);
    const base = stripLocale(pathname);

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
            if (base === '/' && el) {
                e.preventDefault();
                el.scrollIntoView({ behavior: 'smooth' });
                history.replaceState(null, '', `${to('/')}#${id}`);
            }
        },
        [base, to],
    );
    const close = useCallback(() => {
        setOpen(false);
        if (window.location.hash === '#indice') history.replaceState(null, '', window.location.pathname);
    }, []);
    const closeA11y = useCallback(() => setA11y(false), []);

    return (
        <>
            <a href="#conteudo" className="skip-link">
                {t.skip}
            </a>
            <header className="fixed inset-x-0 top-0 z-50 border-b border-rule bg-paper">
                <div className="wrap relative flex h-(--header-h) items-center justify-between gap-4">
                    <div className="flex min-w-0 items-baseline gap-3">
                        <Link to={to('/')} className="shrink-0 font-serif text-[19px] tracking-[-0.01em] no-underline">
                            {profile.name}
                        </Link>
                        {/* No topo mostra o cargo; durante a leitura, onde o leitor está. */}
                        <span key={where || 'role'} className="label masthead-where hidden truncate xl:inline">
                            {where ? <span className="text-ink">{where}</span> : c.profile.role}
                        </span>
                    </div>

                    <nav aria-label={t.mainNav} className="flex items-center gap-5 text-[14px] lg:gap-7">
                        <div className="hidden items-center gap-6 lg:flex">
                            {nav.map((id) => (
                                <Link
                                    key={id}
                                    to={`${to('/')}#${id}`}
                                    onClick={go(id)}
                                    aria-current={active === id ? 'true' : undefined}
                                    className={`transition-colors hover:text-ink ${active === id ? 'text-ink' : 'text-muted'}`}
                                >
                                    {t.nav[id]}
                                </Link>
                            ))}
                        </div>

                        {/* Troca o idioma sem sair da página em que o leitor está. */}
                        <ul aria-label={t.langLabel} className="label m-0 hidden list-none items-center gap-1.5 p-0 sm:flex">
                            {locales.map((l) => (
                                <li key={l}>
                                    <Link
                                        to={withLocale(base, l)}
                                        hrefLang={localeMeta[l].html}
                                        lang={localeMeta[l].html}
                                        aria-current={l === locale ? 'true' : undefined}
                                        aria-label={localeMeta[l].name}
                                        className={`px-1 py-0.5 no-underline transition-colors ${l === locale ? 'bg-ink text-paper' : 'text-muted hover:text-ink'}`}
                                    >
                                        {localeMeta[l].label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <button
                            type="button"
                            data-a11y-toggle
                            aria-expanded={a11y}
                            aria-label={t.a11y.button}
                            title={t.a11y.button}
                            onClick={() => setA11y((v) => !v)}
                            className="inline-grid h-8 w-8 cursor-pointer place-items-center border border-ink font-serif text-[15px] transition-colors hover:bg-ink hover:text-paper aria-expanded:bg-ink aria-expanded:text-paper"
                        >
                            <span aria-hidden>Aa</span>
                        </button>
                        <button
                            type="button"
                            aria-expanded={open}
                            onClick={() => setOpen((v) => !v)}
                            className="label cursor-pointer text-ink transition-colors hover:text-signal"
                        >
                            {open ? t.close : t.index}
                        </button>
                        <a href={profile.cv} download className="hidden border border-ink px-3 py-1 text-ink transition-colors hover:bg-ink hover:text-paper md:inline-block">
                            {t.cv} ↓
                        </a>
                    </nav>

                    {a11y && <A11yPanel onClose={closeA11y} />}
                </div>
                <div aria-hidden className="absolute inset-x-0 -bottom-px h-[2px] overflow-hidden">
                    <div ref={bar} className="h-full origin-left scale-x-0 bg-signal" />
                </div>
            </header>
            {open && <IndexOverlay onClose={close} onGo={go} />}
        </>
    );
}
