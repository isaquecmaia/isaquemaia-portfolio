import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

export const container = 'mx-auto w-full max-w-[1200px] px-4 sm:px-6 md:px-10';

// Entrada discreta: 8px e opacidade. Desligada com prefers-reduced-motion (MotionConfig).
export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: [0.2, 0, 0, 1], delay }}
        >
            {children}
        </motion.div>
    );
}

// Seção de relatório: fio no topo, número e título à esquerda, conteúdo à direita.
export function Section({
    id,
    number,
    title,
    children,
}: {
    id?: string;
    number: string;
    title: string;
    children: ReactNode;
}) {
    return (
        <section id={id} className={`${container} py-16 md:py-24`}>
            <div className="border-t border-ink pt-5 md:grid md:grid-cols-12 md:gap-10">
                <header className="mb-10 md:col-span-3 md:mb-0">
                    <div className="md:sticky md:top-24">
                        <p className="label">§ {number}</p>
                        <h2 className="mt-2 font-serif text-[28px] leading-tight font-normal tracking-[-0.01em]">{title}</h2>
                    </div>
                </header>
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
