import type { ReactNode } from 'react';
import type { FigureId } from '../content/cases';
import { GapChart } from './charts';
import type { FigureText } from '../i18n';

type Stage = { title: string; nodes: string[]; accent?: boolean };

// Diagrama de fluxo em HTML: colunas a partir de 1280px, empilhado no celular.
function Flow({ stages }: { stages: Stage[] }) {
    return (
        <ol className="m-0 flex list-none flex-col gap-2 p-0 xl:flex-row xl:items-stretch xl:gap-0">
            {stages.map((st, i) => (
                <li key={st.title} className="flex min-w-0 flex-col xl:flex-1 xl:flex-row">
                    <div className={`min-w-0 flex-1 border bg-paper p-3 ${st.accent ? 'border-signal' : 'border-ink/70'}`}>
                        <p className={`label mb-2 ${st.accent ? '!text-signal' : ''}`}>
                            {String(i + 1).padStart(2, '0')} · {st.title}
                        </p>
                        <ul className="m-0 list-none space-y-1 p-0 text-[13.5px] leading-snug text-ink-soft">
                            {st.nodes.map((n) => (
                                <li key={n}>{n}</li>
                            ))}
                        </ul>
                    </div>
                    {i < stages.length - 1 && (
                        <span aria-hidden className="num self-center py-1 text-muted xl:px-2 xl:py-0">
                            <span className="xl:hidden">↓</span>
                            <span className="hidden xl:inline">→</span>
                        </span>
                    )}
                </li>
            ))}
        </ol>
    );
}

type Area = { title: string; items: string[]; accent?: boolean };

// Mapa das áreas da plataforma interna. Sem telas reais: o sistema é privado.
function PlatformMap({ areas }: { areas: Area[] }) {
    return (
        <div className="grid gap-px border border-ink/70 bg-ink/70 sm:grid-cols-2 xl:grid-cols-3">
            {areas.map((a, i) => (
                <div key={a.title} className="bg-paper p-4">
                    <p className={`label mb-3 ${a.accent ? '!text-signal' : '!text-ink'}`}>
                        {String(i + 1).padStart(2, '0')} · {a.title}
                    </p>
                    <ul className="m-0 list-none space-y-1 p-0 text-[13.5px] leading-snug text-ink-soft">
                        {a.items.map((it) => (
                            <li key={it}>{it}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

// Radar de CS: atingimento da meta de TPV (x) contra o da meta de margem (y). Pontos ilustrativos.
function CsRadar({ text }: { text: FigureText['radar'] }) {
    const W = 520;
    const H = 320;
    const P = { l: 56, r: 16, t: 16, b: 44 };
    const x = (v: number) => P.l + (v / 140) * (W - P.l - P.r);
    const y = (v: number) => H - P.b - (v / 140) * (H - P.t - P.b);
    const dots: [number, number][] = [
        [118, 124], [96, 108], [84, 131], [128, 97], [104, 118], [76, 101],
        [52, 112], [61, 128], [112, 64], [92, 72], [38, 58], [55, 44], [24, 70], [66, 81],
    ];
    const bucket = (tpv: number, mg: number) => (tpv >= 70 && mg >= 90 ? 'ok' : tpv < 70 && mg < 90 ? 'alerta' : 'atencao');
    const fill = { ok: 'var(--color-ink)', atencao: '#9A958A', alerta: 'var(--color-signal)' } as const;
    const label = (tx: number, ty: number, t: string, anchor: 'start' | 'middle' | 'end' = 'start', color = 'var(--color-muted)') => (
        <text x={tx} y={ty} textAnchor={anchor} className="num" fontSize="11" letterSpacing="0.06em" fill={color}>
            {t}
        </text>
    );
    const legend = text.legend;
    return (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_200px]">
            <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label={text.aria}>
                <rect x={x(0)} y={y(90)} width={x(70) - x(0)} height={y(0) - y(90)} fill="var(--color-signal)" opacity="0.07" />
                <line x1={x(0)} x2={x(140)} y1={y(0)} y2={y(0)} stroke="var(--color-ink)" />
                <line x1={x(0)} x2={x(0)} y1={y(0)} y2={y(140)} stroke="var(--color-ink)" />
                <line x1={x(70)} x2={x(70)} y1={y(0)} y2={y(140)} stroke="var(--color-rule)" strokeDasharray="4 4" />
                <line x1={x(0)} x2={x(140)} y1={y(90)} y2={y(90)} stroke="var(--color-rule)" strokeDasharray="4 4" />
                {label(x(70), y(0) + 16, '70%', 'middle')}
                {label(x(0) - 6, y(90) + 4, '90%', 'end')}
                {label(x(140) - 4, y(140) + 26, text.ok, 'end', 'var(--color-ink)')}
                {label(x(4), y(140) + 26, text.attention)}
                {label(x(140) - 4, y(0) - 8, text.attention, 'end')}
                {label(x(4), y(0) - 8, text.alert, 'start', 'var(--color-signal)')}
                {dots.map(([tpv, mg], i) => (
                    <circle key={i} cx={x(tpv)} cy={y(mg)} r="4.5" fill={fill[bucket(tpv, mg)]} />
                ))}
                {label(x(140), H - 8, text.xAxis, 'end')}
                <text transform={`translate(${P.l - 38} ${y(0)}) rotate(-90)`} className="num" fontSize="11" letterSpacing="0.06em" fill="var(--color-muted)">
                    {text.yAxis}
                </text>
            </svg>
            <dl className="t-small m-0 space-y-3 self-end">
                {legend.map(([k, v], i) => (
                    <div key={k} className="border-t border-rule pt-2">
                        <dt className={`label ${i === 2 ? '!text-signal' : '!text-ink'}`}>{k}</dt>
                        <dd className="m-0 mt-1 text-muted">{v}</dd>
                    </div>
                ))}
            </dl>
        </div>
    );
}

// Tela real da plataforma, capturada com dados fictícios.
function Screenshot({ src, alt }: { src: string; alt: string }) {
    return <img src={src} alt={alt} width={1440} height={900} loading="lazy" decoding="async" className="block h-auto w-full border border-ink/80" />;
}

// As figuras de cada case, montadas com os textos do idioma atual.
export function buildFigures(t: FigureText): Record<FigureId, ReactNode> {
    return {
        'bi-architecture': <Flow stages={t.biFlow} />,
        'recon-flow': <Flow stages={t.reconFlow} />,
        'recon-gap': <GapChart text={t.gap} />,
        'platform-map': <PlatformMap areas={t.platformMap} />,
        'cs-radar': <CsRadar text={t.radar} />,
        'shot-cs': <Screenshot src="/assets/work/plataforma-radar-cs.webp" alt={t.shots.cs} />,
        'shot-acoes': <Screenshot src="/assets/work/plataforma-acoes-hoje.webp" alt={t.shots.acoes} />,
        'shot-weekly': <Screenshot src="/assets/work/plataforma-weekly.webp" alt={t.shots.weekly} />,
        'shot-performance': <Screenshot src="/assets/work/plataforma-performance.webp" alt={t.shots.performance} />,
    };
}
