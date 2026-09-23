import { profile } from '../content/profile';
import { MetaList, Reveal } from './primitives';

export default function Opening() {
    return (
        <>
            <section className="wrap pt-[calc(var(--header-h)+28px)] md:pt-[calc(var(--header-h)+44px)]">
                <Reveal now className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b-2 border-ink pb-3">
                    <p className="label m-0 text-ink">{profile.role}</p>
                    <p className="label m-0">{profile.city} · Portfólio 2026</p>
                </Reveal>

                <Reveal now delay={0.05}>
                    <h1 className="m-0 mt-4 font-serif text-[clamp(52px,15.4vw,236px)] leading-[0.86] font-normal tracking-[-0.05em] whitespace-nowrap md:mt-5">
                        {profile.name}
                    </h1>
                </Reveal>

                {/* Tese, ficha e foto seguem as mesmas colunas da faixa de números abaixo. */}
                <div className="grid-ed mt-10 gap-y-10 border-t border-rule pt-7 md:mt-14 md:pt-9">
                    <Reveal now delay={0.1} className="md:col-span-7 md:row-span-2 lg:col-span-6 lg:row-span-1">
                        <p className="t-lead m-0 max-w-[30ch] text-[clamp(24px,2.3vw,31px)] leading-[1.24]">{profile.thesis}</p>
                        <div className="mt-8 flex flex-wrap gap-3 text-[15px]">
                            <a href="#trabalho" className="bg-ink px-5 py-3 text-paper no-underline transition-colors duration-300 hover:bg-signal">
                                Ver os cases ↓
                            </a>
                            <a href={`mailto:${profile.email}`} className="border border-ink px-5 py-3 no-underline transition-colors duration-300 hover:bg-ink hover:text-paper">
                                Falar comigo
                            </a>
                        </div>
                    </Reveal>
                    <Reveal now delay={0.15} className="md:col-span-5 lg:col-span-3">
                        <MetaList items={profile.facts} />
                    </Reveal>
                    <Reveal now delay={0.2} className="md:col-span-3 lg:col-span-3">
                        <figure className="m-0 max-w-[176px] md:max-w-none">
                            <img
                                src={profile.photo}
                                alt={`Retrato de ${profile.fullName}`}
                                width={280}
                                height={280}
                                className="block aspect-square w-full object-cover"
                            />
                            <figcaption className="label mt-3">{profile.fullName}</figcaption>
                        </figure>
                    </Reveal>
                </div>
            </section>

            {/* Faixa de indicadores: os números reais tratados como dados de uma matéria. */}
            <section aria-label="Em números" className="mt-[calc(var(--section)*0.6)] bg-signal text-paper">
                <div className="wrap pt-10 pb-12 md:pt-12 md:pb-14 lg:pt-14 lg:pb-16">
                    <p className="label m-0 text-paper/75">Em números · 2025 e 2026</p>
                    <div className="mt-6 grid grid-cols-2 gap-x-(--gutter) gap-y-10 md:mt-8 lg:grid-cols-12">
                        {profile.kpis.map((k, i) => (
                            <Reveal key={k.label} delay={i * 0.06} className="border-t border-paper/35 pt-4 lg:col-span-3">
                                <p className="m-0 font-serif text-[clamp(38px,4.2vw,60px)] leading-[0.95] tracking-[-0.035em] whitespace-nowrap">{k.value}</p>
                                <p className="t-small mt-4 mb-0 font-medium">{k.label}</p>
                                <p className="t-caption mt-1.5 mb-0 max-w-[32ch] text-paper/75">{k.note}</p>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
