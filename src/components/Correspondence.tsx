import { useState } from 'react';
import type { Recommendation } from '../content/education';
import { useI18n, type UIText } from '../i18n';
import { Reveal, Section } from './primitives';

const pad = (n: number) => String(n).padStart(2, '0');

// Carimbo postal: anel duplo com a cidade e a data, mais as ondas de cancelamento.
function Postmark({ date, place }: { date: string; place: string }) {
    const id = `pm-${date.replace(/\W/g, '')}`;
    return (
        <svg viewBox="0 0 160 110" className="postmark pointer-events-none absolute -top-3 right-0 w-24 sm:-top-2 sm:right-16 sm:w-40" aria-hidden>
            <defs>
                <path id={id} d="M55,55 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
            </defs>
            <g fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="55" cy="55" r="46" />
                <circle cx="55" cy="55" r="30" />
                {[0, 1, 2, 3].map((i) => (
                    <path key={i} d={`M88,${30 + i * 14} q9,-6 18,0 t18,0 t18,0 t18,0`} />
                ))}
            </g>
            <text className="num" fontSize="9.5" letterSpacing="2" fill="currentColor">
                <textPath href={`#${id}`}>{place}</textPath>
            </text>
            <text x="55" y="53" textAnchor="middle" className="num" fontSize="10" fill="currentColor">
                {date.toUpperCase()}
            </text>
            <text x="55" y="66" textAnchor="middle" className="num" fontSize="7.5" letterSpacing="1" fill="currentColor">
                LINKEDIN
            </text>
        </svg>
    );
}

// Selo com a marca de quem escreveu, com borda serrilhada de selo postal.
function Stamp({ logo, company }: { logo?: string; company: string }) {
    return (
        <div className="stamp absolute top-5 right-5 w-[74px] p-2 sm:top-6 sm:right-6 sm:w-[84px]" aria-hidden>
            <div className="flex aspect-[4/5] flex-col items-center justify-between border border-ink/25 bg-paper p-1.5">
                {logo ? <img src={logo} alt="" width={40} height={40} className="h-9 w-9 object-cover sm:h-10 sm:w-10" /> : <span className="num text-[18px]">✉</span>}
                <span className="num text-center text-[7px] leading-tight tracking-[0.08em] uppercase">{company}</span>
            </div>
        </div>
    );
}

function Letter({ r, open, t }: { r: Recommendation; open: boolean; t: UIText['letters'] }) {
    return (
        // Borda de correio aéreo: faixas diagonais vermelhas e azuis em volta do papel.
        <div className="airmail p-2 sm:p-2.5">
            <div className="relative bg-paper px-5 pt-6 pb-8 text-ink sm:px-10 sm:pt-9 sm:pb-11">
                <Stamp logo={r.logo} company={r.company} />
                <Postmark date={r.date} place={t.postmark} />

                <dl className="t-small m-0 grid max-w-[calc(100%-120px)] grid-cols-[44px_1fr] gap-x-3 gap-y-1.5 sm:max-w-[calc(100%-200px)] sm:grid-cols-[52px_1fr]">
                    <dt className="label pt-[2px]">{t.from}</dt>
                    <dd className="m-0">
                        {r.author}, {r.role} · {r.company}
                    </dd>
                    <dt className="label pt-[2px]">{t.to}</dt>
                    <dd className="m-0">Isaque Maia</dd>
                    <dt className="label pt-[2px]">{t.on}</dt>
                    <dd className="m-0">
                        {r.date} · {r.relation}
                    </dd>
                </dl>

                <div className="mt-8 border-t border-dashed border-ink/25 pt-8 sm:mt-10 sm:pt-10">
                    <blockquote className="m-0 max-w-[30ch] font-serif text-[clamp(26px,3.2vw,42px)] leading-[1.14] tracking-[-0.02em] text-balance">
                        <span aria-hidden className="text-signal">“</span>
                        {r.excerpt}
                        <span aria-hidden className="text-signal">”</span>
                    </blockquote>

                    {open && (
                        <div className="t-lead mt-8 max-w-[46ch] space-y-5 text-ink-soft">
                            {r.full.map((p) => (
                                <p key={p.slice(0, 24)} className="m-0">
                                    {p}
                                </p>
                            ))}
                        </div>
                    )}

                    <p className="mt-10 mb-0 font-serif text-[30px] leading-none italic">{r.author}</p>
                    {t.translated && <p className="t-caption mt-3 mb-0 text-muted italic">{t.translated}</p>}
                    <a href={r.link} target="_blank" rel="noreferrer" className="label link mt-3 inline-block">
                        {t.linkedin} ↗
                    </a>
                </div>
            </div>
        </div>
    );
}

// Recomendações como cartas: cada uma chega deslizando, e o carimbo bate em seguida.
export default function Correspondence() {
    const { t: ui, c } = useI18n();
    const t = ui.letters;
    const recommendations = c.recommendations;
    const [index, setIndex] = useState(0);
    const [open, setOpen] = useState(false);
    const total = recommendations.length;
    const go = (step: number) => {
        setOpen(false);
        setIndex((i) => (i + step + total) % total);
    };

    return (
        <Section id="correspondencias" tone aside={<p className="label m-0 text-paper/85">{t.aside}</p>}>
            <Reveal className="letter-arrive">
                {/* Todas as cartas empilhadas na mesma célula: a troca não muda a altura do bloco. */}
                <div className="stack">
                    {recommendations.map((r, i) => (
                        <article key={r.author} aria-hidden={i !== index} inert={i !== index} className="max-w-[860px]">
                            <Letter r={r} open={open && i === index} t={t} />
                        </article>
                    ))}
                </div>

                <nav aria-label={t.nav} className="mt-8 flex max-w-[860px] items-center justify-between">
                    <p className="num m-0 text-[13px]" aria-live="polite">
                        <span className="text-paper">{t.count(pad(index + 1), pad(total))[0]}</span>
                        <span className="text-paper/80">{t.count(pad(index + 1), pad(total))[1]}</span>
                    </p>
                    <div className="flex gap-6">
                        <button
                            type="button"
                            onClick={() => setOpen((v) => !v)}
                            aria-expanded={open}
                            className="label cursor-pointer text-paper transition-colors hover:text-mustard"
                        >
                            {open ? t.fold : t.open}
                        </button>
                        {total > 1 && (
                            <>
                                <button type="button" onClick={() => go(-1)} className="label cursor-pointer text-paper transition-colors hover:text-mustard">
                                    ← {t.prev}
                                </button>
                                <button type="button" onClick={() => go(1)} className="label cursor-pointer text-paper transition-colors hover:text-mustard">
                                    {t.next} →
                                </button>
                            </>
                        )}
                    </div>
                </nav>
            </Reveal>
        </Section>
    );
}
