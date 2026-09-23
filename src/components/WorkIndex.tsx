import { Link } from 'react-router-dom';
import { cases } from '../content/cases';
import { Spark } from '../charts/charts';
import { Reveal, Section } from './primitives';

const thumbs = { 'bi-pagaa': 'bars', 'reconciliacao-financeira': 'gap', 'dash-pagaa': 'grid' } as const;

export default function WorkIndex() {
    return (
        <Section
            id="trabalho"
            number="01"
            title="Trabalho selecionado"
            aside={
                <p className="m-0 max-w-[34ch] text-[15px] text-ink-soft">
                    Três projetos, cada um com o problema de negócio, as decisões técnicas e o que mudou depois.
                </p>
            }
        >
            <ol className="m-0 list-none border-t-2 border-ink p-0">
                {cases.map((c, i) => (
                    <li key={c.slug} className="border-b border-ink/25">
                        <Reveal delay={i * 0.05}>
                            <Link
                                to={`/cases/${c.slug}`}
                                className="group -mx-4 grid grid-cols-[1fr] gap-6 px-4 py-9 no-underline transition-colors duration-200 hover:bg-ink hover:text-paper sm:grid-cols-[1fr_160px] md:py-12"
                            >
                                <div>
                                    <p className="num m-0 text-[14px] text-signal">
                                        {c.number} <span className="text-muted group-hover:text-paper/60">/ {c.company} · {c.period}</span>
                                    </p>
                                    <h3 className="mt-3 mb-0 font-serif text-[clamp(30px,4vw,54px)] leading-[1.02] font-normal tracking-[-0.025em] text-balance">
                                        {c.title}
                                    </h3>
                                    <p className="mt-4 mb-0 max-w-[52ch] text-[16px] text-ink-soft group-hover:text-paper/80">{c.dek}</p>
                                </div>
                                <div className="flex max-w-[220px] flex-col justify-between gap-4 sm:max-w-none">
                                    <div className="transition-opacity group-hover:opacity-90">
                                        <Spark variant={thumbs[c.slug as keyof typeof thumbs]} />
                                    </div>
                                    <p className="label m-0 !text-current">Ler case →</p>
                                </div>
                            </Link>
                        </Reveal>
                    </li>
                ))}
            </ol>
        </Section>
    );
}
