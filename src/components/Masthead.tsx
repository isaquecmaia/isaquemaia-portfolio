import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { profile } from '../content/profile';
import { container } from './primitives';

const nav = [
    { label: 'Trabalho', id: 'trabalho' },
    { label: 'Experiência', id: 'experiencia' },
    { label: 'Sobre', id: 'sobre' },
    { label: 'Contato', id: 'contato' },
];

export default function Masthead() {
    const { pathname } = useLocation();
    const [active, setActive] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(() => setOpen(false), [pathname]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
            { rootMargin: '-40% 0px -55% 0px' },
        );
        nav.forEach((n) => {
            const el = document.getElementById(n.id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, [pathname]);

    const go = (id: string) => (e: React.MouseEvent) => {
        setOpen(false);
        const el = document.getElementById(id);
        if (pathname === '/' && el) {
            e.preventDefault();
            el.scrollIntoView({ behavior: 'smooth' });
            history.replaceState(null, '', `#${id}`);
        }
    };

    const links = nav.map((n) => (
        <Link
            key={n.id}
            to={`/#${n.id}`}
            onClick={go(n.id)}
            className={`transition-colors hover:text-ink ${active === n.id ? 'text-ink' : 'text-muted'}`}
        >
            {n.label}
        </Link>
    ));

    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b border-rule bg-paper">
            <div className={`${container} flex h-14 items-center justify-between`}>
                <Link to="/" className="flex items-baseline gap-3 no-underline">
                    <span className="font-serif text-[19px] tracking-[-0.01em]">{profile.name}</span>
                    <span className="label hidden lg:inline">{profile.role}</span>
                </Link>

                <nav className="hidden items-center gap-7 text-[14px] md:flex">
                    {links}
                    <a href={profile.cv} download className="border border-ink px-3 py-1 text-ink transition-colors hover:bg-ink hover:text-paper">
                        CV ↓
                    </a>
                </nav>

                <button
                    type="button"
                    className="label !text-ink md:hidden"
                    aria-expanded={open}
                    aria-controls="menu-mobile"
                    onClick={() => setOpen((v) => !v)}
                >
                    {open ? 'Fechar' : 'Menu'}
                </button>
            </div>

            {open && (
                <nav id="menu-mobile" className="border-t border-rule bg-paper md:hidden">
                    <div className={`${container} flex flex-col py-2 text-[17px] [&>*]:border-b [&>*]:border-rule [&>*]:py-3 [&>*:last-child]:border-0`}>
                        {links}
                        <a href={profile.cv} download className="text-ink">
                            Baixar CV ↓
                        </a>
                    </div>
                </nav>
            )}
        </header>
    );
}
