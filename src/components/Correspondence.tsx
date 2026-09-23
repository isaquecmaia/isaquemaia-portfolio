import { useState } from 'react';
import { recommendations } from '../content/education';
import { Reveal, Section } from './primitives';

const pad = (n: number) => String(n).padStart(2, '0');

// Recomendações tratadas como cartas publicadas: trecho em serif, assinatura em mono, navegação discreta.
export default function Correspondence() {
    const [index, setIndex] = useState(0);
    const [open, setOpen] = useState(false);
    const total = recommendations.length;
    const go = (step: number) => {
        setOpen(false);
        setIndex((i) => (i + step + total) % total);
    };

    return (
        <Section
            id="correspondencias"
            tone
            aside={<p className="label m-0 text-paper/70">O que dizem sobre o trabalho</p>}
        >
            <Reveal>
                <div className="border-t border-paper/40 pt-8 md:pt-10">
                    {/* Todas as cartas empilhadas na mesma célula: a troca não muda a altura do bloco. */}
                    <div className="stack">
                        {recommendations.map((r, i) => (
                            <article key={r.author} aria-hidden={i !== index} inert={i !== index} className="max-w-[62ch]">
                                <blockquote className="m-0 font-serif text-[clamp(28px,3.6vw,48px)] leading-[1.12] tracking-[-0.022em] text-balance">
                                    <span aria-hidden className="text-mustard">“</span>
                                    {r.excerpt}
                                    <span aria-hidden className="text-mustard">”</span>
                                </blockquote>

                                {open && i === index && (
                                    <div className="t-lead mt-8 max-w-[44ch] space-y-5 text-paper/80">
                                        {r.full.map((p) => (
                                            <p key={p.slice(0, 24)} className="m-0">
                                                {p}
                                            </p>
                                        ))}
                                    </div>
                                )}

                                <footer className="mt-10">
                                    <a href={r.link} target="_blank" rel="noreferrer" className="t-small link font-medium">
                                        {r.author}
                                    </a>
                                    <p className="label mt-1.5 mb-0 text-paper/70">
                                        {r.role} · {r.company}
                                    </p>
                                    <p className="label mt-1 mb-0 text-paper/70">
                                        {r.relation} · LinkedIn, {r.date}
                                    </p>
                                </footer>
                            </article>
                        ))}
                    </div>

                    <nav aria-label="Navegar entre recomendações" className="mt-10 flex items-center justify-between border-t border-paper/30 pt-4">
                        <p className="num m-0 text-[13px]" aria-live="polite">
                            <span className="text-paper">{pad(index + 1)}</span>
                            <span className="text-paper/60"> / {pad(total)}</span>
                        </p>
                        <div className="flex gap-6">
                            <button
                                type="button"
                                onClick={() => setOpen((v) => !v)}
                                aria-expanded={open}
                                className="label cursor-pointer text-paper transition-colors hover:text-mustard"
                            >
                                {open ? 'Recolher carta' : 'Ler carta completa'}
                            </button>
                            {total > 1 && (
                                <>
                                    <button type="button" onClick={() => go(-1)} className="label cursor-pointer text-paper transition-colors hover:text-mustard">
                                        ← Anterior
                                    </button>
                                    <button type="button" onClick={() => go(1)} className="label cursor-pointer text-paper transition-colors hover:text-mustard">
                                        Próxima →
                                    </button>
                                </>
                            )}
                        </div>
                    </nav>
                </div>
            </Reveal>
        </Section>
    );
}
