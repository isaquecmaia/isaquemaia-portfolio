import { Link } from 'react-router-dom';
import { cases } from '../content/cases';
import { Spark } from '../charts/charts';
import { Reveal, Section } from './primitives';

const thumbs = { 'infraestrutura-bi': 'bars', 'reconciliacao-financeira': 'gap', 'plataforma-interna': 'grid' } as const;

export default function WorkIndex() {
    return (
        <Section
            id="trabalho"
            number="01"
            title="Trabalho selecionado"
            lead
            aside={
                <p className="t-small m-0 max-w-[30ch] text-ink-soft">
                    Três matérias sobre projetos reais: o problema de negócio, as decisões técnicas e o que mudou depois.
                </p>
            }
        >
            {/* Lista editorial: todas as linhas têm a mesma estrutura e o mesmo comportamento (ver .case-row). */}
            <ol className="m-0 list-none border-t border-ink p-0">
                {cases.map((c, i) => (
                    <li key={c.slug} className="border-b border-ink/20">
                        <Reveal delay={i * 0.06}>
                            <Link to={`/cases/${c.slug}`} className="case-row py-8 md:py-10 lg:py-12">
                                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-[minmax(0,1fr)_152px] sm:gap-x-(--gutter) lg:grid-cols-[minmax(0,1fr)_176px]">
                                    <div>
                                        <p className="num m-0 flex items-center gap-3 text-[13px]">
                                            <span className="text-signal">{c.number}</span>
                                            <span aria-hidden className="case-mark block h-px w-8" />
                                            <span className="case-meta">
                                                {c.company} · {c.period}
                                            </span>
                                        </p>
                                        <h3 className="case-title t-headline mt-4 mb-0">{c.title}</h3>
                                        <p className="case-dek t-body mt-4 mb-0 max-w-[50ch]">{c.dek}</p>
                                    </div>
                                    <div className="flex max-w-[168px] flex-col justify-between gap-5 sm:max-w-none sm:pt-7">
                                        <div className="case-spark">
                                            <Spark variant={thumbs[c.slug as keyof typeof thumbs]} />
                                        </div>
                                        <p className="case-cta label m-0">
                                            Ler case <span className="case-cta-arrow inline-block">→</span>
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </Reveal>
                    </li>
                ))}
            </ol>
        </Section>
    );
}
