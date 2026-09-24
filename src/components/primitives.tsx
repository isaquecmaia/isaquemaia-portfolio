import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { sectionMeta, type SectionId } from '../content/sections';
import { useI18n } from '../i18n';

// Container único do site (ver .wrap em index.css).
export const container = 'wrap';

// Entrada discreta: 8px e opacidade, em CSS (ver .reveal em index.css).
// `now` anima ao montar (primeira dobra); o resto anima ao entrar na tela.
export function Reveal({
    children,
    className = '',
    delay = 0,
    now = false,
    section,
    style,
}: {
    children: ReactNode;
    className?: string;
    delay?: number;
    now?: boolean;
    /** Rótulo mostrado no header enquanto este bloco estiver no meio da tela. */
    section?: string;
    style?: CSSProperties;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [seen, setSeen] = useState(now);
    useEffect(() => {
        if (seen || !ref.current) return;
        const io = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) {
                    setSeen(true);
                    io.disconnect();
                }
            },
            { rootMargin: '0px 0px -60px 0px' },
        );
        io.observe(ref.current);
        return () => io.disconnect();
    }, [seen]);
    return (
        <div ref={ref} className={`reveal ${className}`} data-seen={seen} data-section={section} style={{ animationDelay: `${delay}s`, ...style }}>
            {children}
        </div>
    );
}

// Seção: fio na cor do capítulo, número em destaque na coluna auxiliar, título alinhado à coluna principal.
// `full` libera o conteúdo para usar o grid inteiro. `tone` transforma a seção num bloco de cor de ponta a ponta.
export function Section({
    id,
    aside,
    full = false,
    lead = false,
    tone,
    children,
}: {
    id: SectionId;
    aside?: ReactNode;
    full?: boolean;
    /** Primeira seção depois da faixa de números: começa mais perto, a mudança de cor já separa. */
    lead?: boolean;
    /** Fundo de ponta a ponta na cor do capítulo, com texto claro. */
    tone?: boolean;
    children: ReactNode;
}) {
    const { number, color } = sectionMeta(id);
    const title = useI18n().c.sectionTitles[id];
    const body = (
        <>
            <Reveal className="grid-ed pt-5 md:pt-7" style={{ borderTop: `3px solid ${tone ? 'currentColor' : color}` }}>
                <div className="col-aside flex items-center gap-3 md:pt-[0.45em]">
                    <span
                        className="num inline-grid h-9 w-9 place-items-center text-[13px]"
                        style={tone ? { background: 'var(--color-paper)', color } : { background: color, color: color.includes('mustard') ? 'var(--color-ink)' : 'var(--color-paper)' }}
                    >
                        {number}
                    </span>
                    <span aria-hidden className="h-px w-10" style={{ background: tone ? 'currentColor' : color }} />
                </div>
                <h2 className="title-mask t-display col-main m-0 mt-4 md:mt-0">
                    <span>{title}</span>
                </h2>
            </Reveal>
            <div className="grid-ed mt-(--head)">
                {full ? (
                    <div className="col-full">{children}</div>
                ) : (
                    <>
                        <div className="col-aside mb-8 md:mb-0">{aside}</div>
                        <div className="col-main">{children}</div>
                    </>
                )}
            </div>
        </>
    );
    const label = `§ ${number} · ${title}`;
    if (tone) {
        return (
            <section id={id} data-section={label} className="mt-(--section) py-(--section) text-paper" style={{ background: color }}>
                <div className="wrap">{body}</div>
            </section>
        );
    }
    return (
        <section id={id} data-section={label} className={`wrap ${lead ? 'pt-[calc(var(--section)*0.62)]' : 'section'}`}>
            {body}
        </section>
    );
}

export function MetaList({ items }: { items: { label: string; value: ReactNode }[] }) {
    return (
        <dl className="divide-y divide-rule border-y border-rule">
            {items.map((it) => (
                <div key={it.label} className="t-small grid grid-cols-[104px_1fr] gap-4 py-3">
                    <dt className="label pt-[2px]">{it.label}</dt>
                    <dd className="m-0 text-ink-soft">{it.value}</dd>
                </div>
            ))}
        </dl>
    );
}

// Indicadores em linguagem editorial: número em serif, fio fino sobre cada um.
export function KpiStrip({ items, highlight = 0 }: { items: { value: string; label: string }[]; highlight?: number }) {
    return (
        <div className="grid grid-cols-2 gap-x-(--gutter) gap-y-8 lg:grid-cols-4">
            {items.map((it, i) => (
                <div key={it.label} className="border-t border-ink pt-4">
                    <p className={`m-0 font-serif text-[clamp(38px,4.4vw,60px)] leading-none tracking-[-0.03em] whitespace-nowrap ${i === highlight ? 'text-signal' : ''}`}>
                        {it.value}
                    </p>
                    <p className="t-small mt-3 mb-0 text-muted">{it.label}</p>
                </div>
            ))}
        </div>
    );
}

export function Figure({ n, caption, children }: { n: string; caption: string; children: ReactNode }) {
    const { t } = useI18n();
    return (
        <figure className="m-0">
            <div className="border border-rule bg-paper-deep/60 p-4 sm:p-6">{children}</div>
            <figcaption className="t-caption mt-3 flex gap-3 text-muted">
                <span className="num shrink-0 text-ink">
                    {t.caseStudy.fig} {n}
                </span>
                <span>{caption}</span>
            </figcaption>
        </figure>
    );
}
