import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { cases } from '../content/cases';
import { profile } from '../content/profile';
import { readingMinutes, sections } from '../content/sections';

// Sumário da edição: abre sobre a página, como o índice de uma revista.
export default function IndexOverlay({ onClose, onGo }: { onClose: () => void; onGo: (id: string) => (e: React.MouseEvent) => void }) {
    const first = useRef<HTMLAnchorElement>(null);
    const total = cases.reduce((a, c) => a + readingMinutes(c), 0);

    useEffect(() => {
        const previous = document.activeElement as HTMLElement | null;
        first.current?.focus();
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
        document.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
            previous?.focus();
        };
    }, [onClose]);

    return (
        <div role="dialog" aria-modal="true" aria-label="Índice" className="index-overlay fixed inset-0 top-(--header-h) z-40 overflow-y-auto bg-paper">
            <div className="wrap grid-ed gap-y-10 pt-8 pb-16 md:pt-12">
                <div className="col-aside">
                    <p className="label m-0 text-ink">Nesta edição</p>
                    <p className="t-small mt-3 mb-0 max-w-[26ch] text-ink-soft">
                        Seis seções e três cases. Os cases somam cerca de {total} minutos de leitura.
                    </p>
                    <a href={profile.cv} download className="label link mt-6 inline-block text-ink">
                        Baixar currículo ↓
                    </a>
                </div>

                <nav aria-label="Seções" className="col-main">
                    <ol className="m-0 list-none border-t-2 border-ink p-0">
                        {sections.map((s, i) => (
                            <li key={s.id} className="border-b border-rule">
                                <Link
                                    ref={i === 0 ? first : undefined}
                                    to={`/#${s.id}`}
                                    onClick={onGo(s.id)}
                                    className="group grid grid-cols-[48px_1fr] items-baseline py-4 no-underline md:grid-cols-[64px_1fr] md:py-5"
                                >
                                    <span className="num text-[13px] text-signal">{s.number}</span>
                                    <span className="t-headline transition-transform duration-300 ease-(--ease-editorial) group-hover:translate-x-1.5">{s.title}</span>
                                </Link>

                                {s.id === 'trabalho' && (
                                    <ol className="m-0 mb-5 ml-12 list-none space-y-2 p-0 md:ml-16">
                                        {cases.map((c) => (
                                            <li key={c.slug}>
                                                <Link to={`/cases/${c.slug}`} onClick={onClose} className="t-small group flex items-baseline gap-3 no-underline">
                                                    <span className="num text-[12px] text-muted">{c.number}</span>
                                                    <span className="link">{c.title}</span>
                                                    <span className="label ml-auto shrink-0 pl-4">{readingMinutes(c)} min</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ol>
                                )}
                            </li>
                        ))}
                        <li className="border-b border-rule">
                            <Link to="/#contato" onClick={onGo('contato')} className="group grid grid-cols-[48px_1fr] items-baseline py-4 no-underline md:grid-cols-[64px_1fr] md:py-5">
                                <span className="num text-[13px] text-signal">§</span>
                                <span className="t-headline transition-transform duration-300 ease-(--ease-editorial) group-hover:translate-x-1.5">Contato</span>
                            </Link>
                        </li>
                    </ol>
                    <p className="label mt-6 mb-0">Esc para fechar</p>
                </nav>
            </div>
        </div>
    );
}
