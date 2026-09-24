import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { profile } from '../content/profile';
import { readingMinutes, sections } from '../content/sections';
import { localeMeta, locales, stripLocale, useI18n, withLocale } from '../i18n';

// Sumário da edição: abre sobre a página, como o índice de uma revista.
export default function IndexOverlay({ onClose, onGo }: { onClose: () => void; onGo: (id: string) => (e: React.MouseEvent) => void }) {
    const { t, c, locale, to } = useI18n();
    const { pathname } = useLocation();
    const first = useRef<HTMLAnchorElement>(null);
    const total = c.cases.reduce((a, x) => a + readingMinutes(x), 0);

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
        <div role="dialog" aria-modal="true" aria-label={t.index} className="index-overlay fixed inset-0 top-(--header-h) z-40 overflow-y-auto bg-paper">
            <div className="wrap grid-ed gap-y-10 pt-8 pb-16 md:pt-12">
                <div className="col-aside">
                    <p className="label m-0 text-ink">{t.overlay.edition}</p>
                    <p className="t-small mt-3 mb-0 max-w-[26ch] text-ink-soft">{t.overlay.summary(total)}</p>
                    <a href={profile.cv} download className="label link mt-6 inline-block text-ink">
                        {t.overlay.cv} ↓
                    </a>

                    <p className="label mt-8 mb-2">{t.langLabel}</p>
                    <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                        {locales.map((l) => (
                            <li key={l}>
                                <Link
                                    to={withLocale(stripLocale(pathname), l)}
                                    onClick={onClose}
                                    hrefLang={localeMeta[l].html}
                                    lang={localeMeta[l].html}
                                    aria-current={l === locale ? 'true' : undefined}
                                    className={`t-small inline-block border border-ink px-2.5 py-1 no-underline ${l === locale ? 'bg-ink text-paper' : 'hover:bg-paper-deep'}`}
                                >
                                    {localeMeta[l].name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <nav aria-label={t.overlay.sections} className="col-main">
                    <ol className="m-0 list-none border-t-2 border-ink p-0">
                        {sections.map((s, i) => (
                            <li key={s.id} className="border-b border-rule">
                                <Link
                                    ref={i === 0 ? first : undefined}
                                    to={`${to('/')}#${s.id}`}
                                    onClick={onGo(s.id)}
                                    className="group grid grid-cols-[48px_1fr] items-baseline py-4 no-underline md:grid-cols-[64px_1fr] md:py-5"
                                >
                                    <span className="num text-[13px] text-signal">{s.number}</span>
                                    <span className="t-headline transition-transform duration-300 ease-(--ease-editorial) group-hover:translate-x-1.5">{c.sectionTitles[s.id]}</span>
                                </Link>

                                {s.id === 'trabalho' && (
                                    <ol className="m-0 mb-5 ml-12 list-none space-y-2 p-0 md:ml-16">
                                        {c.cases.map((x) => (
                                            <li key={x.slug}>
                                                <Link to={to(`/cases/${x.slug}`)} onClick={onClose} className="t-small group flex items-baseline gap-3 no-underline">
                                                    <span className="num text-[12px] text-muted">{x.number}</span>
                                                    <span className="link">{x.title}</span>
                                                    <span className="label ml-auto shrink-0 pl-4">{readingMinutes(x)} min</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ol>
                                )}
                            </li>
                        ))}
                        <li className="border-b border-rule">
                            <Link to={`${to('/')}#contato`} onClick={onGo('contato')} className="group grid grid-cols-[48px_1fr] items-baseline py-4 no-underline md:grid-cols-[64px_1fr] md:py-5">
                                <span className="num text-[13px] text-signal">§</span>
                                <span className="t-headline transition-transform duration-300 ease-(--ease-editorial) group-hover:translate-x-1.5">{t.contact.label}</span>
                            </Link>
                        </li>
                    </ol>
                    <p className="label mt-6 mb-0">{t.overlay.esc}</p>
                </nav>
            </div>
        </div>
    );
}
