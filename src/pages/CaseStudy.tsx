import { useEffect, type ReactNode } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { cases, getCase } from '../content/cases';
import { figures } from '../charts/figures';
import { Figure, KpiStrip, MetaList, Reveal, container } from '../components/primitives';

function Block({ label, children }: { label: string; children: ReactNode }) {
    return (
        <Reveal className="grid gap-3 border-t border-rule py-8 md:grid-cols-12 md:gap-10">
            <h2 className="label m-0 pt-1.5 !text-ink md:col-span-3">{label}</h2>
            <div className="md:col-span-9">{children}</div>
        </Reveal>
    );
}

const prose = 'm-0 max-w-[64ch] text-[18px] leading-[1.65]';

export default function CaseStudy() {
    const { slug = '' } = useParams();
    const c = getCase(slug);

    useEffect(() => {
        if (c) document.title = `${c.title} — Isaque Maia`;
        return () => {
            document.title = 'Isaque Maia — Dados, BI e IA aplicada';
        };
    }, [c]);

    if (!c) return <Navigate to="/" replace />;

    const i = cases.indexOf(c);
    const prev = cases[(i - 1 + cases.length) % cases.length];
    const next = cases[(i + 1) % cases.length];

    return (
        <article className={`${container} pt-24 pb-16 md:pt-32`}>
            <nav className="label mb-10">
                <Link to="/#trabalho" className="link">
                    ← Trabalho
                </Link>
                <span className="mx-2">/</span>
                <span>Case {c.number}</span>
            </nav>

            <header className="grid gap-10 md:grid-cols-12">
                <Reveal className="md:col-span-8">
                    <p className="num m-0 text-[14px] text-signal">{c.number}</p>
                    <h1 className="mt-3 mb-0 font-serif text-[clamp(34px,5vw,60px)] leading-[1.05] font-normal tracking-[-0.02em] text-balance">
                        {c.title}
                    </h1>
                    <p className="mt-5 mb-0 max-w-[48ch] font-serif text-[22px] leading-snug text-ink-soft">{c.dek}</p>
                </Reveal>
                <Reveal className="md:col-span-4 md:pt-8" delay={0.1}>
                    <MetaList
                        items={[
                            { label: 'Empresa', value: c.company },
                            { label: 'Período', value: c.period },
                            { label: 'Papel', value: c.role },
                            { label: 'Stack', value: c.stack.join(', ') },
                        ]}
                    />
                    {c.links && (
                        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[15px]">
                            {c.links.map((l) => (
                                <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="link">
                                    {l.label} ↗
                                </a>
                            ))}
                        </div>
                    )}
                </Reveal>
            </header>

            <Reveal className="mt-14">
                <KpiStrip items={c.results} highlight={0} />
            </Reveal>

            <div className="mt-14">
                <Block label="Contexto">
                    <p className={prose}>{c.context}</p>
                </Block>
                <Block label="Problema">
                    <p className={`${prose} font-serif text-[22px] leading-snug`}>{c.problem}</p>
                </Block>
                <Block label="O que fiz">
                    <ol className="m-0 max-w-[64ch] list-none space-y-3 p-0 text-[17px]">
                        {c.actions.map((a, n) => (
                            <li key={a} className="grid grid-cols-[32px_1fr]">
                                <span className="num pt-0.5 text-[13px] text-muted">{String(n + 1).padStart(2, '0')}</span>
                                <span>{a}</span>
                            </li>
                        ))}
                    </ol>
                </Block>

                {c.figures.map((f, n) => (
                    <Block key={f.id} label={n === 0 ? 'Como funciona' : 'Na prática'}>
                        <Figure n={`${c.number}.${n + 1}`} caption={f.caption}>
                            {figures[f.id]}
                        </Figure>
                    </Block>
                ))}

                <Block label="Decisões">
                    <div className="grid gap-8 lg:grid-cols-2">
                        {c.decisions.map((d) => (
                            <div key={d.title}>
                                <h3 className="m-0 font-serif text-[21px] leading-snug font-normal">{d.title}</h3>
                                <p className="mt-2 mb-0 text-[16px] text-ink-soft">{d.body}</p>
                            </div>
                        ))}
                    </div>
                </Block>
                <Block label="O que eu faria diferente">
                    <p className={prose}>{c.retro}</p>
                </Block>
            </div>

            <p className="mt-2 border-t border-rule pt-4 text-[13px] text-muted">
                Gráficos e diagramas com dados ilustrativos. Números reais aparecem apenas nos indicadores citados.
            </p>

            <nav className="mt-16 grid gap-px border-y border-ink bg-rule sm:grid-cols-2">
                {[
                    { c: prev, dir: '← Anterior' },
                    { c: next, dir: 'Próximo →' },
                ].map(({ c: x, dir }, k) => (
                    <Link key={dir} to={`/cases/${x.slug}`} className={`group block bg-paper py-6 no-underline ${k === 1 ? 'sm:pl-6 sm:text-right' : 'sm:pr-6'}`}>
                        <p className="label m-0">{dir}</p>
                        <p className="mt-2 mb-0 font-serif text-[22px] leading-snug group-hover:underline group-hover:underline-offset-4">
                            {x.number} · {x.title}
                        </p>
                    </Link>
                ))}
            </nav>
        </article>
    );
}
