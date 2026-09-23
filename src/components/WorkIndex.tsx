import { Link } from 'react-router-dom';
import { cases } from '../content/cases';
import { Spark } from '../charts/charts';
import { Reveal, Section } from './primitives';

const thumbs = { 'bi-pagaa': 'bars', 'reconciliacao-financeira': 'gap', 'dash-pagaa': 'grid' } as const;

export default function WorkIndex() {
    return (
        <Section id="trabalho" number="01" title="Trabalho selecionado">
            <p className="m-0 max-w-[60ch] text-[17px] text-ink-soft">
                Três projetos que mostram como eu trabalho: o problema de negócio, as decisões técnicas e o que mudou depois. Os
                dois primeiros são da operação real da Pagaa; os gráficos usam dados ilustrativos.
            </p>

            <ol className="m-0 mt-10 list-none border-t border-rule p-0">
                {cases.map((c, i) => (
                    <Reveal key={c.slug} delay={i * 0.05}>
                        <li className="border-b border-rule">
                            <Link
                                to={`/cases/${c.slug}`}
                                className="group grid grid-cols-[36px_1fr] gap-x-4 gap-y-3 py-7 no-underline sm:grid-cols-[48px_1fr_140px] sm:gap-x-6"
                            >
                                <span className="num pt-1 text-[14px] text-muted">{c.number}</span>
                                <div>
                                    <h3 className="m-0 font-serif text-[clamp(22px,2.6vw,30px)] leading-tight font-normal tracking-[-0.01em] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[6px]">
                                        {c.title}
                                    </h3>
                                    <p className="mt-2 mb-0 max-w-[58ch] text-[15.5px] text-ink-soft">{c.dek}</p>
                                    <p className="label mt-3 mb-0">
                                        {c.company} · {c.period} · {c.stack.slice(0, 3).join(', ')}
                                    </p>
                                </div>
                                <div className="col-start-2 max-w-[200px] sm:col-start-3 sm:max-w-none">
                                    <Spark variant={thumbs[c.slug as keyof typeof thumbs]} />
                                    <p className="label mt-2 mb-0 text-right !text-ink">Ler case →</p>
                                </div>
                            </Link>
                        </li>
                    </Reveal>
                ))}
            </ol>
        </Section>
    );
}
