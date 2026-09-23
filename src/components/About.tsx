import { useState } from 'react';
import { profile } from '../content/profile';
import { recommendation as rec } from '../content/education';
import { Reveal, Section } from './primitives';

export default function About() {
    const [full, setFull] = useState(false);

    return (
        <Section id="sobre" number="04" title="Sobre">
            <div className="grid gap-10 lg:grid-cols-[1fr_220px]">
                <Reveal>
                    {profile.about.map((p) => (
                        <p key={p.slice(0, 20)} className="mt-0 mb-5 max-w-[62ch] text-[18px] leading-[1.65]">
                            {p}
                        </p>
                    ))}
                    <p className="label mt-6">
                        Idiomas —{' '}
                        {profile.languages.map((l, i) => (
                            <span key={l.name} className="!text-ink normal-case tracking-normal">
                                {i > 0 && ' · '}
                                {l.name}, {l.level}
                            </span>
                        ))}
                    </p>
                </Reveal>
                <Reveal delay={0.1}>
                    <figure className="m-0 max-w-[220px]">
                        <img
                            src={profile.photo}
                            alt={`Retrato de ${profile.fullName}`}
                            width={220}
                            height={220}
                            className="block aspect-square w-full object-cover grayscale-[35%]"
                        />
                        <figcaption className="mt-2 text-[13px] text-muted">
                            {profile.fullName}, {profile.city}
                        </figcaption>
                    </figure>
                </Reveal>
            </div>

            <Reveal className="mt-16">
                <figure className="m-0 border-t border-ink pt-8">
                    <p className="label mb-5">Recomendação</p>
                    <blockquote className="m-0 max-w-[40ch] font-serif text-[clamp(24px,3vw,34px)] leading-[1.25] tracking-[-0.01em]">
                        “{rec.excerpt}”
                    </blockquote>

                    {full && (
                        <div className="mt-6 max-w-[62ch] space-y-4 text-[16px] text-ink-soft">
                            {rec.full.slice(1).map((p) => (
                                <p key={p.slice(0, 20)} className="m-0">
                                    {p}
                                </p>
                            ))}
                        </div>
                    )}

                    <figcaption className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3">
                        <img src={rec.photo} alt="" width={40} height={40} className="h-10 w-10 object-cover grayscale" />
                        <div className="text-[14px] leading-snug">
                            <a href={rec.link} target="_blank" rel="noreferrer" className="link font-medium">
                                {rec.author}
                            </a>
                            <p className="m-0 text-muted">{rec.role}</p>
                            <p className="m-0 text-muted">{rec.relation}</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setFull((v) => !v)}
                            aria-expanded={full}
                            className="label link ml-auto cursor-pointer !text-ink"
                        >
                            {full ? 'Recolher' : 'Ler completa'}
                        </button>
                    </figcaption>
                </figure>
            </Reveal>
        </Section>
    );
}
