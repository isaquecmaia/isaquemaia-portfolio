import { profile } from '../content/profile';
import { KpiStrip, MetaList, Reveal, container } from './primitives';

export default function Opening() {
    return (
        <section className={`${container} pt-28 pb-12 md:pt-36 md:pb-16`}>
            <Reveal>
                <p className="label">
                    {profile.role} · {profile.city}
                </p>
            </Reveal>

            <div className="mt-6 grid gap-10 md:grid-cols-12 md:gap-10">
                <Reveal className="md:col-span-8">
                    <h1 className="m-0 font-serif text-[clamp(34px,5.2vw,64px)] leading-[1.06] font-normal tracking-[-0.02em] text-balance">
                        {profile.thesis}
                    </h1>
                </Reveal>
                <Reveal className="md:col-span-4 md:pt-3" delay={0.1}>
                    <MetaList items={profile.facts} />
                    <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[15px]">
                        <a className="link" href="#trabalho">
                            Ver os cases ↓
                        </a>
                        <a className="link" href={`mailto:${profile.email}`}>
                            Escrever para mim
                        </a>
                    </div>
                </Reveal>
            </div>

            <Reveal className="mt-16 md:mt-24" delay={0.15}>
                <p className="label mb-3">Em números · Pagaa, 2025</p>
                <KpiStrip items={profile.kpis} />
            </Reveal>
        </section>
    );
}
