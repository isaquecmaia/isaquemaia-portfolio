import { useEffect, useRef, useState, type ReactNode } from 'react';

export const container = 'mx-auto w-full max-w-[1200px] px-4 sm:px-6 md:px-10';

// Entrada discreta: 8px e opacidade, em CSS (ver .reveal em index.css).
// `now` anima ao montar (primeira dobra); o resto anima ao entrar na tela.
export function Reveal({ children, className = '', delay = 0, now = false }: { children: ReactNode; className?: string; delay?: number; now?: boolean }) {
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
        <div ref={ref} className={`reveal ${className}`} data-seen={seen} style={{ animationDelay: `${delay}s` }}>
            {children}
        </div>
    );
}

// Seção: título grande de ponta a ponta, número em destaque, conteúdo recuado à direita.
export function Section({
    id,
    number,
    title,
    aside,
    children,
}: {
    id?: string;
    number: string;
    title: string;
    aside?: ReactNode;
    children: ReactNode;
}) {
    return (
        <section id={id} className={`${container} py-20 md:py-32`}>
            <header className="border-t-2 border-ink pt-6 md:pt-8">
                <Reveal className="flex items-start gap-4 md:gap-8">
                    <span className="num pt-[0.6em] text-[13px] text-signal md:text-[15px]">{number}</span>
                    <h2 className="m-0 font-serif text-[clamp(44px,8vw,112px)] leading-[0.95] font-normal tracking-[-0.035em]">{title}</h2>
                </Reveal>
            </header>
            <div className="mt-12 md:mt-16 md:grid md:grid-cols-12 md:gap-10">
                <div className="mb-8 md:col-span-3 md:mb-0">{aside}</div>
                <div className="md:col-span-9">{children}</div>
            </div>
        </section>
    );
}

export function MetaList({ items }: { items: { label: string; value: ReactNode }[] }) {
    return (
        <dl className="divide-y divide-rule border-y border-rule">
            {items.map((it) => (
                <div key={it.label} className="grid grid-cols-[110px_1fr] gap-4 py-2.5 text-[15px]">
                    <dt className="label pt-[3px]">{it.label}</dt>
                    <dd className="m-0 text-ink-soft">{it.value}</dd>
                </div>
            ))}
        </dl>
    );
}

// Faixa de indicadores com notas de rodapé numeradas, como numa tabela de relatório.
export function KpiStrip({
    items,
    highlight = 0,
}: {
    items: { value: string; label: string; note?: string }[];
    highlight?: number;
}) {
    const hasNotes = items.some((i) => i.note);
    return (
        <div>
            <div className="grid grid-cols-2 border-t border-ink lg:grid-cols-4">
                {items.map((it, i) => (
                    <div
                        key={it.label}
                        className={`border-b border-rule py-5 pr-4 ${i % 2 === 1 ? 'border-l pl-4' : ''} ${
                            i > 0 ? 'lg:border-l lg:pl-5' : ''
                        }`}
                    >
                        <p className={`num text-[clamp(28px,4vw,44px)] leading-none ${i === highlight ? 'text-signal' : 'text-ink'}`}>
                            {it.value}
                        </p>
                        <p className="mt-2 text-[14px] text-muted">
                            {it.label}
                            {it.note && <sup className="num ml-0.5 text-[10px]">{i + 1}</sup>}
                        </p>
                    </div>
                ))}
            </div>
            {hasNotes && (
                <ol className="mt-4 grid gap-x-8 gap-y-1 text-[12.5px] leading-snug text-muted sm:grid-cols-2">
                    {items.map((it, i) =>
                        it.note ? (
                            <li key={it.label} className="flex gap-2">
                                <span className="num">{i + 1}</span>
                                <span>{it.note}</span>
                            </li>
                        ) : null,
                    )}
                </ol>
            )}
        </div>
    );
}

export function Figure({ n, caption, children }: { n: string; caption: string; children: ReactNode }) {
    return (
        <figure className="m-0">
            <div className="border border-rule bg-paper-deep/60 p-4 sm:p-6">{children}</div>
            <figcaption className="mt-3 flex gap-3 text-[13px] leading-snug text-muted">
                <span className="num shrink-0 text-ink">Fig. {n}</span>
                <span>{caption}</span>
            </figcaption>
        </figure>
    );
}
