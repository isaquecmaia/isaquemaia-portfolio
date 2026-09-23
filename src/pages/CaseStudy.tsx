import { useEffect, type ReactNode } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { cases, getCase } from '../content/cases';
import { figures } from '../charts/figures';
import { Figure, KpiStrip, MetaList, Reveal } from '../components/primitives';

function Block({ label, children }: { label: string; children: ReactNode }) {
    return (
        <Reveal className="grid-ed gap-y-4 border-t border-rule py-9 md:py-12">
            <h2 className="label col-aside m-0 pt-1.5 text-ink">{label}</h2>
            <div className="col-main">{children}</div>
        </Reveal>
    );
}

const prose = 't-body m-0 max-w-[62ch] text-[18px]';

export default function CaseStudy() {
    const { slug = '' } = useParams();
    const c = getCase(slug);

    useEffect(() => {
        if (c) document.title = `${c.title} | Isaque Maia`;
        return () => {
            document.title = 'Isaque Maia | Dados, BI e IA aplicada';
        };
    }, [c]);

    if (!c) return <Navigate to="/" replace />;

    const i = cases.indexOf(c);
    const prev = cases[(i - 1 + cases.length) % cases.length];
    const next = cases[(i + 1) % cases.length];

    return (
        <article className="wrap pt-[calc(var(--header-h)+28px)] md:pt-[calc(var(--header-h)+48px)]">
            <nav className="label mb-10 md:mb-14">
                <Link to="/#trabalho" className="link">
                    ← Trabalho
                </Link>
                <span className="mx-2">/</span>
                <span>Case {c.number}</span>
            </nav>

            <header className="grid-ed gap-y-10">
                <Reveal now className="md:col-span-8">
                    <p className="num m-0 text-[13px] text-signal">Case {c.number}</p>
                    <h1 className="t-display mt-4 mb-0 text-[clamp(40px,5.6vw,80px)] text-balance">
                        {c.title}
                    </h1>
                    <p className="t-lead mt-6 mb-0 max-w-[40ch] text-ink-soft">{c.dek}</p>
                </Reveal>
                <Reveal now className="md:col-span-4 md:pt-2" delay={0.1}>
                    <MetaList
                        items={[
                            { label: 'Empresa', value: c.company },
                            { label: 'Período', value: c.period },
                            { label: 'Papel', value: c.role },
                            { label: 'Stack', value: c.stack.join(', ') },
                        ]}
                    />
                    {c.links && (
                        <div className="t-small mt-5 flex flex-wrap gap-x-5 gap-y-2">
                            {c.links.map((l) => (
                                <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="link">
                                    {l.label} ↗
                                </a>
                            ))}
                        </div>
                    )}
                </Reveal>
            </header>

            <Reveal className="mt-(--head)">
                <KpiStrip items={c.results} highlight={0} />
            </Reveal>

            <div className="mt-(--head)">
                <Block label="Contexto">
                    <p className={prose}>{c.context}</p>
                </Block>
                <Block label="Problema">
                    <p className="t-lead m-0 max-w-[44ch]">{c.problem}</p>
                </Block>
                <Block label="O que fiz">
                    <ol className="t-body m-0 max-w-[62ch] list-none space-y-3 p-0">
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
                    <div className="grid gap-x-(--gutter) gap-y-10 lg:grid-cols-2">
                        {c.decisions.map((d) => (
                            <div key={d.title}>
                                <h3 className="t-title m-0 text-[24px]">{d.title}</h3>
                                <p className="t-body mt-3 mb-0 text-[16px] text-ink-soft">{d.body}</p>
                            </div>
                        ))}
                    </div>
                </Block>
                <Block label="O que eu faria diferente">
                    <p className={prose}>{c.retro}</p>
                </Block>
            </div>

            <p className="t-caption m-0 border-t border-rule pt-4 text-muted">
                Gráficos e diagramas com dados ilustrativos. Números reais aparecem apenas nos indicadores citados.
            </p>

            <nav className="mt-(--head) grid gap-px border-y border-ink bg-rule sm:grid-cols-2">
                {[
                    { c: prev, dir: '← Anterior' },
                    { c: next, dir: 'Próximo →' },
                ].map(({ c: x, dir }, k) => (
                    <Link key={dir} to={`/cases/${x.slug}`} className={`group block bg-paper py-7 no-underline ${k === 1 ? 'sm:pl-6 sm:text-right' : 'sm:pr-6'}`}>
                        <p className="label m-0">{dir}</p>
                        <p className="t-title mt-2 mb-0 text-[22px] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
                            {x.number} · {x.title}
                        </p>
                    </Link>
                ))}
            </nav>
        </article>
    );
}
