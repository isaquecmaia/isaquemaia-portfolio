import { useEffect, type ReactNode } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { readingMinutes } from '../content/sections';
import { buildFigures } from '../charts/figures';
import { useI18n } from '../i18n';
import { Figure, KpiStrip, MetaList, Reveal } from '../components/primitives';

function Block({ label, where, children }: { label: string; where: string; children: ReactNode }) {
    return (
        <Reveal className="grid-ed gap-y-4 border-t border-rule py-9 md:py-12" section={`${where} · ${label}`}>
            <h2 className="label col-aside m-0 pt-1.5 text-ink">{label}</h2>
            <div className="col-main">{children}</div>
        </Reveal>
    );
}

// Abertura de cada uma das três partes do case: número na cor do case e título grande.
function Part({ n, title, color, where }: { n: string; title: string; color: string; where: string }) {
    return (
        <Reveal className="grid-ed mt-(--head) gap-y-3 pt-6" style={{ borderTop: `3px solid ${color}` }} section={`${where} · ${title}`}>
            <p className="col-aside m-0 md:pt-[0.4em]">
                <span className="num inline-grid h-9 w-9 place-items-center text-[13px] text-paper" style={{ background: color }}>
                    {n}
                </span>
            </p>
            <h2 className="title-mask t-headline col-main m-0">
                <span>{title}</span>
            </h2>
        </Reveal>
    );
}

const prose = 't-body m-0 max-w-[62ch] text-[18px]';

export default function CaseStudy() {
    const { slug = '' } = useParams();
    const { t, c: content, to } = useI18n();
    const cases = content.cases;
    const c = cases.find((x) => x.slug === slug || x.aliases?.includes(slug));
    const L = t.caseStudy;
    const B = L.blocks;

    useEffect(() => {
        if (c) document.title = `${c.title} | Isaque Maia`;
        return () => {
            document.title = t.siteTitle;
        };
    }, [c, t.siteTitle]);

    if (!c) return <Navigate to={to('/')} replace />;

    const figures = buildFigures(content.figures);
    const where = `${L.case} ${c.number}`;
    const i = cases.indexOf(c);
    const prev = cases[(i - 1 + cases.length) % cases.length];
    const next = cases[(i + 1) % cases.length];

    return (
        <article className="wrap pt-[calc(var(--header-h)+28px)] md:pt-[calc(var(--header-h)+48px)]">
            <nav className="label mb-10 md:mb-14">
                <Link to={`${to('/')}#trabalho`} className="link">
                    ← {L.back}
                </Link>
                <span className="mx-2">/</span>
                <span>
                    {L.case} {c.number}
                </span>
            </nav>

            <header className="grid-ed gap-y-10" data-section={where}>
                <Reveal now className="md:col-span-8">
                    <p className="num m-0 text-[13px]" style={{ color: c.color }}>
                        {L.case} {c.number}
                    </p>
                    <h1 className="t-display mt-4 mb-0 text-[clamp(40px,5.6vw,80px)] text-balance">
                        {c.title}
                    </h1>
                    <p className="t-lead mt-6 mb-0 max-w-[40ch] text-ink-soft">{c.dek}</p>
                </Reveal>
                <Reveal now className="md:col-span-4 md:pt-2" delay={0.1}>
                    <MetaList
                        items={[
                            { label: L.meta.company, value: c.company },
                            { label: L.meta.period, value: c.period },
                            { label: L.meta.role, value: c.role },
                            { label: L.meta.stack, value: c.stack.join(', ') },
                            { label: L.meta.reading, value: `${readingMinutes(c)} min` },
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
                    {c.access && <p className="t-caption mt-4 mb-0 max-w-[38ch] text-muted">{c.access}</p>}
                </Reveal>
            </header>

            {/* Parte 1: o problema de negócio. */}
            <Part n="01" title={L.parts[0]} color={c.color} where={where} />
            <Block where={where} label={B.context}>
                <p className={prose}>{c.context}</p>
            </Block>
            <Block where={where} label={B.why}>
                <p className="t-lead m-0 max-w-[44ch]">{c.problem}</p>
            </Block>

            {/* Parte 2: a decisão técnica. */}
            <Part n="02" title={L.parts[1]} color={c.color} where={where} />
            {c.choice && (
                <Block where={where} label={B.choice}>
                    <p className="t-lead m-0 max-w-[44ch]">{c.choice}</p>
                </Block>
            )}
            <Block where={where} label={B.did}>
                <ol className="t-body m-0 max-w-[62ch] list-none space-y-3 p-0">
                    {c.actions.map((a, n) => (
                        <li key={a} className="grid grid-cols-[32px_1fr]">
                            <span className="num pt-0.5 text-[13px]" style={{ color: c.color }}>
                                {String(n + 1).padStart(2, '0')}
                            </span>
                            <span>{a}</span>
                        </li>
                    ))}
                </ol>
            </Block>
            {c.figures.map((f, n) => (
                <Block key={f.id} where={where} label={f.label ?? (n === 0 ? B.how : B.practice)}>
                    <Figure n={`${c.number}.${n + 1}`} caption={f.caption}>
                        {figures[f.id]}
                    </Figure>
                </Block>
            ))}
            <Block where={where} label={B.decisions}>
                <div className="grid gap-x-(--gutter) gap-y-10 lg:grid-cols-2">
                    {c.decisions.map((d) => (
                        <div key={d.title} className="border-t-2 pt-4" style={{ borderColor: c.color }}>
                            <h3 className="t-title m-0 text-[24px]">{d.title}</h3>
                            <p className="t-body mt-3 mb-0 text-[16px] text-ink-soft">{d.body}</p>
                        </div>
                    ))}
                </div>
            </Block>

            {/* Parte 3: o que mudou depois. */}
            <Part n="03" title={L.parts[2]} color={c.color} where={where} />
            <Block where={where} label={B.result}>
                {c.outcome && <p className="t-lead m-0 mb-10 max-w-[44ch]">{c.outcome}</p>}
                <KpiStrip items={c.results} highlight={0} />
            </Block>
            <Block where={where} label={B.retro}>
                <p className={prose}>{c.retro}</p>
            </Block>

            <p className="t-caption m-0 border-t border-rule pt-4 text-muted">
                {L.disclaimer}
            </p>

            <nav className="mt-(--head) grid gap-px border-y border-ink bg-rule sm:grid-cols-2">
                {[
                    { c: prev, dir: `← ${L.prev}` },
                    { c: next, dir: `${L.next} →` },
                ].map(({ c: x, dir }, k) => (
                    <Link key={dir} to={to(`/cases/${x.slug}`)} className={`group block bg-paper py-7 no-underline ${k === 1 ? 'sm:pl-6 sm:text-right' : 'sm:pr-6'}`}>
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
