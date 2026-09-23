import { useState } from 'react';
import { profile } from '../content/profile';
import { recommendation as rec } from '../content/education';
import { Reveal, Section } from './primitives';

export default function About() {
    const [full, setFull] = useState(false);

    return (
        <Section id="sobre" number="04" title="Sobre" aside={<p className="label m-0">De Expertise a Pagaa,<br />2021 — hoje</p>}>
            <div>
                <Reveal>
                    {profile.about.map((p) => (
                        <p key={p.slice(0, 20)} className="mt-0 mb-6 max-w-[58ch] font-serif text-[clamp(20px,1.9vw,25px)] leading-[1.45]">
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
            </div>

            <Reveal className="mt-16">
                <figure className="m-0 border-t border-ink pt-8">
                    <p className="label mb-5">Recomendação</p>
                    <blockquote className="m-0 max-w-[26ch] font-serif text-[clamp(30px,4.2vw,56px)] leading-[1.08] tracking-[-0.025em]">
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
