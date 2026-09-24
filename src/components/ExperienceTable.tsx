import { useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import type { Experience } from '../content/experience';
import { useI18n } from '../i18n';
import { Reveal, Section } from './primitives';

// Mostra as três entregas principais; o resto abre sob demanda para não virar uma parede de texto.
const VISIBLE = 3;

function Role({ e, first, last }: { e: Experience; first: boolean; last: boolean }) {
    const { t, c: content, to } = useI18n();
    const [open, setOpen] = useState(false);
    const extra = e.outcomes.length - VISIBLE;
    const shown = open ? e.outcomes : e.outcomes.slice(0, VISIBLE);
    return (
        <Reveal className={`${first ? '' : 'border-t border-rule'}`}>
            <div className={`role-row grid-ed gap-y-3 ${last ? 'pb-2' : 'pb-9 md:pb-11'} ${first ? 'pt-2' : 'pt-9 md:pt-11'}`} style={{ '--brand': e.brand.color } as CSSProperties}>
            <div className="col-aside">
                <p className="num m-0 inline-block px-2 py-1 text-[12px]" style={{ background: e.brand.color, color: e.brand.on }}>
                    {e.period}
                </p>
                <p className="label mt-3 mb-0">{e.sector}</p>
            </div>
            <div className="col-main">
                <div className="flex items-center gap-4">
                    <img src={e.logo} alt={`${t.experience.logo} ${e.company}`} width={48} height={48} loading="lazy" className="h-12 w-12 shrink-0 object-cover ring-1 ring-ink/10" />
                    <h3 className="t-title m-0">{e.company}</h3>
                </div>
                <p className="t-small mt-2 mb-0 font-medium">{e.role}</p>
                <p className="t-body mt-4 mb-0 max-w-[60ch] text-ink-soft">{e.summary}</p>
                <ul className="t-body mt-5 mb-0 max-w-[64ch] list-none space-y-2.5 p-0">
                    {shown.map((o, k) => (
                        <li key={o} className={`grid grid-cols-[20px_1fr] ${k >= VISIBLE ? 'reveal' : ''}`} data-seen={k >= VISIBLE ? 'true' : undefined}>
                            <span aria-hidden className="mt-[0.72em] block h-[5px] w-[5px] ring-1 ring-ink/15" style={{ background: e.brand.color }} />
                            <span>{o}</span>
                        </li>
                    ))}
                </ul>
                {extra > 0 && (
                    <button
                        type="button"
                        onClick={() => setOpen((v) => !v)}
                        aria-expanded={open}
                        className="label link mt-4 cursor-pointer text-ink"
                    >
                        {open ? t.experience.less : t.experience.more(extra)}
                    </button>
                )}
                {e.cases && (
                    <p className="label mt-6 mb-0">
                        {t.experience.cases}{' '}
                        {e.cases.map((slug, k) => {
                            const c = content.cases.find((x) => x.slug === slug)!;
                            return (
                                <span key={slug}>
                                    {k > 0 && ' · '}
                                    <Link to={to(`/cases/${slug}`)} className="link text-ink">
                                        {c.number} {c.title}
                                    </Link>
                                </span>
                            );
                        })}
                    </p>
                )}
            </div>
            </div>
        </Reveal>
    );
}

export default function ExperienceTable() {
    const experience = useI18n().c.experience;
    return (
        <Section id="experiencia" full>
            {/* Cada cargo usa o grid da página: período na coluna auxiliar, conteúdo na principal. */}
            {experience.map((e, i) => (
                <Role key={e.company} e={e} first={i === 0} last={i === experience.length - 1} />
            ))}
        </Section>
    );
}
