import { Link } from 'react-router-dom';
import { experience } from '../content/experience';
import { cases } from '../content/cases';
import { Reveal, Section } from './primitives';

export default function ExperienceTable() {
    return (
        <Section id="experiencia" number="02" title="Experiência" full>
            {/* Cada cargo usa o grid da página: período na coluna auxiliar, conteúdo na principal. */}
            {experience.map((e, i) => (
                <Reveal key={e.company} className={`grid-ed gap-y-3 ${i < experience.length - 1 ? 'pb-9 md:pb-11' : ''} ${i > 0 ? 'border-t border-rule pt-9 md:pt-11' : ''}`}>
                    <div className="col-aside">
                        <p className="num m-0 text-[13px] text-ink">{e.period}</p>
                        <p className="label mt-2 mb-0">{e.sector}</p>
                    </div>
                    <div className="col-main">
                        <h3 className="t-title m-0">{e.company}</h3>
                        <p className="t-small mt-2 mb-0 font-medium">{e.role}</p>
                        <p className="t-body mt-4 mb-0 max-w-[60ch] text-ink-soft">{e.summary}</p>
                        <ul className="t-body mt-5 mb-0 max-w-[64ch] list-none space-y-2.5 p-0">
                            {e.outcomes.map((o) => (
                                <li key={o} className="grid grid-cols-[20px_1fr]">
                                    <span aria-hidden className="mt-[0.72em] block h-[5px] w-[5px] bg-ink" />
                                    <span>{o}</span>
                                </li>
                            ))}
                        </ul>
                        {e.cases && (
                            <p className="label mt-6 mb-0">
                                Leia os casos:{' '}
                                {e.cases.map((slug, k) => {
                                    const c = cases.find((x) => x.slug === slug)!;
                                    return (
                                        <span key={slug}>
                                            {k > 0 && ' · '}
                                            <Link to={`/cases/${slug}`} className="link text-ink">
                                                {c.number} {c.title.split(':')[0]}
                                            </Link>
                                        </span>
                                    );
                                })}
                            </p>
                        )}
                    </div>
                </Reveal>
            ))}
        </Section>
    );
}
