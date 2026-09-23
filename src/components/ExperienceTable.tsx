import { Link } from 'react-router-dom';
import { experience } from '../content/experience';
import { cases } from '../content/cases';
import { Reveal, Section } from './primitives';

export default function ExperienceTable() {
    return (
        <Section id="experiencia" number="02" title="Experiência">
            <div className="border-t border-rule">
                {experience.map((e) => (
                    <Reveal key={e.company}>
                        <article className="grid gap-x-8 gap-y-3 border-b border-rule py-8 md:grid-cols-[150px_1fr]">
                            <p className="num m-0 pt-1 text-[14px] text-muted">{e.period}</p>
                            <div>
                                <h3 className="m-0 font-serif text-[clamp(28px,3vw,40px)] leading-[1.05] font-normal tracking-[-0.02em]">
                                    {e.company} <span className="text-muted">— {e.sector}</span>
                                </h3>
                                <p className="mt-1 mb-0 text-[15px] font-medium">{e.role}</p>
                                <p className="mt-3 mb-0 max-w-[62ch] text-[15.5px] text-ink-soft">{e.summary}</p>
                                <ul className="mt-4 mb-0 max-w-[66ch] list-none space-y-2 p-0 text-[15.5px]">
                                    {e.outcomes.map((o) => (
                                        <li key={o} className="grid grid-cols-[16px_1fr]">
                                            <span className="text-muted">–</span>
                                            <span>{o}</span>
                                        </li>
                                    ))}
                                </ul>
                                {e.cases && (
                                    <p className="label mt-5 mb-0">
                                        Casos:{' '}
                                        {e.cases.map((slug, i) => {
                                            const c = cases.find((x) => x.slug === slug)!;
                                            return (
                                                <span key={slug}>
                                                    {i > 0 && ' · '}
                                                    <Link to={`/cases/${slug}`} className="link !text-ink">
                                                        {c.number} {c.title.split(':')[0]}
                                                    </Link>
                                                </span>
                                            );
                                        })}
                                    </p>
                                )}
                            </div>
                        </article>
                    </Reveal>
                ))}
            </div>
        </Section>
    );
}
