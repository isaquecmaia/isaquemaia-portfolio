import { profile } from '../content/profile';
import { MetaList, Reveal, container } from './primitives';

export default function Opening() {
    return (
        <>
            <section className={`${container} pt-24 md:pt-28`}>
                <Reveal now className="flex flex-wrap justify-between gap-x-6 gap-y-1 border-b-2 border-ink pb-3">
                    <p className="label m-0 !text-ink">{profile.role}</p>
                    <p className="label m-0">{profile.city} · Portfólio 2026</p>
                </Reveal>

                <Reveal now delay={0.05}>
                    <h1 className="m-0 mt-4 font-serif text-[clamp(60px,14.6vw,214px)] leading-[0.86] font-normal tracking-[-0.05em] whitespace-nowrap">
                        {profile.name}
                    </h1>
                </Reveal>

                <div className="mt-10 grid gap-10 border-t border-rule pt-8 md:mt-14 md:grid-cols-12">
                    <Reveal now className="md:col-span-5" delay={0.1}>
                        <p className="m-0 font-serif text-[clamp(24px,2.4vw,32px)] leading-[1.2] tracking-[-0.01em] text-balance">
                            {profile.thesis}
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3 text-[15px]">
                            <a href="#trabalho" className="bg-ink px-5 py-3 text-paper no-underline transition-colors hover:bg-signal">
                                Ver os cases ↓
                            </a>
                            <a href={`mailto:${profile.email}`} className="border border-ink px-5 py-3 no-underline transition-colors hover:bg-ink hover:text-paper">
                                Falar comigo
                            </a>
                        </div>
                    </Reveal>
                    <Reveal now className="md:col-span-4" delay={0.15}>
                        <MetaList items={profile.facts} />
                    </Reveal>
                    <Reveal now className="md:col-span-3" delay={0.2}>
                        <figure className="m-0 max-w-[280px]">
                            <img
                                src={profile.photo}
                                alt={`Retrato de ${profile.fullName}`}
                                width={280}
                                height={280}
                                className="block aspect-square w-full object-cover"
                            />
                            <figcaption className="label mt-2">{profile.fullName}</figcaption>
                        </figure>
                    </Reveal>
                </div>
            </section>

            {/* Faixa de indicadores: os números reais são o protagonista. */}
            <section className="mt-16 bg-signal text-paper md:mt-24">
                <div className={`${container} py-12 md:py-16`}>
                    <p className="label m-0 !text-paper/75">Em números · Pagaa, 2025</p>
                    <div className="mt-6 grid grid-cols-2 gap-y-10 lg:grid-cols-4">
                        {profile.kpis.map((k, i) => (
                            <Reveal key={k.label} delay={i * 0.05} className={`pr-4 ${i % 2 === 1 ? 'border-l border-paper/30 pl-4' : ''} ${i > 0 ? 'lg:border-l lg:border-paper/30 lg:pl-6' : ''}`}>
                                <p className="num m-0 text-[clamp(30px,3.9vw,54px)] leading-none whitespace-nowrap">{k.value}</p>
                                <p className="mt-3 mb-0 text-[15px] font-medium">{k.label}</p>
                                <p className="mt-2 mb-0 max-w-[30ch] text-[13px] leading-snug text-paper/75">{k.note}</p>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
