import { dailyTpv, movingAverage, reportedVsAdjusted } from './data';

const W = 720;
const H = 280;
const PAD = { t: 16, r: 12, b: 28, l: 40 };

function scale(values: number[], min = 0) {
    const max = Math.max(...values) * 1.08;
    const iw = W - PAD.l - PAD.r;
    const ih = H - PAD.t - PAD.b;
    return {
        max,
        x: (i: number, n: number) => PAD.l + (i / (n - 1)) * iw,
        y: (v: number) => PAD.t + ih - ((v - min) / (max - min)) * ih,
        bw: iw / values.length,
    };
}

const anchors = ['start', 'middle', 'end'] as const;

const path = (pts: [number, number][]) => pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join('');

function Grid({ max, y }: { max: number; y: (v: number) => number }) {
    const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => Math.round(max * t));
    return (
        <g>
            {ticks.map((t) => (
                <g key={t}>
                    <line x1={PAD.l} x2={W - PAD.r} y1={y(t)} y2={y(t)} stroke="var(--color-rule)" strokeWidth={t === 0 ? 1.2 : 0.8} />
                    <text x={PAD.l - 8} y={y(t) + 4} textAnchor="end" className="num" fontSize="11" fill="var(--color-muted)">
                        {t}
                    </text>
                </g>
            ))}
        </g>
    );
}

function Legend({ items }: { items: { label: string; color: string; kind: 'bar' | 'line' | 'dash' }[] }) {
    return (
        <div className="mb-4 flex flex-wrap gap-x-5 gap-y-1 text-[12.5px] text-muted">
            {items.map((it) => (
                <span key={it.label} className="flex items-center gap-2">
                    <svg width="18" height="10" aria-hidden>
                        {it.kind === 'bar' ? (
                            <rect x="5" y="0" width="8" height="10" fill={it.color} />
                        ) : (
                            <line x1="0" x2="18" y1="5" y2="5" stroke={it.color} strokeWidth="2" strokeDasharray={it.kind === 'dash' ? '3 3' : undefined} />
                        )}
                    </svg>
                    {it.label}
                </span>
            ))}
        </div>
    );
}

export function TpvChart() {
    const data = dailyTpv();
    const ma = movingAverage(data);
    const s = scale(data);
    return (
        <div>
            <Legend
                items={[
                    { label: 'TPV diário (mil R$)', color: '#CFC8B8', kind: 'bar' },
                    { label: 'Média móvel 7 dias', color: 'var(--color-signal)', kind: 'line' },
                ]}
            />
            <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Gráfico ilustrativo de TPV diário com média móvel">
                <Grid max={s.max} y={s.y} />
                {data.map((v, i) => (
                    <rect key={i} x={PAD.l + i * s.bw + 1} y={s.y(v)} width={Math.max(1, s.bw - 2)} height={s.y(0) - s.y(v)} fill="#CFC8B8" />
                ))}
                <path d={path(ma.map((v, i) => [PAD.l + i * s.bw + s.bw / 2, s.y(v)]))} fill="none" stroke="var(--color-signal)" strokeWidth="2" />
                {['dia 1', 'dia 30', 'dia 60'].map((t, i) => (
                    <text key={t} x={PAD.l + [0, 0.5, 1][i] * (W - PAD.l - PAD.r)} y={H - 8} textAnchor={anchors[i]} className="num" fontSize="11" fill="var(--color-muted)">
                        {t}
                    </text>
                ))}
            </svg>
        </div>
    );
}

export function GapChart() {
    const { reported, adjusted } = reportedVsAdjusted();
    const n = reported.length;
    const s = scale(reported);
    const rp = reported.map((v, i) => [s.x(i, n), s.y(v)] as [number, number]);
    const ap = adjusted.map((v, i) => [s.x(i, n), s.y(v)] as [number, number]);
    const area = path(rp) + ap.slice().reverse().map((p) => `L${p[0].toFixed(1)},${p[1].toFixed(1)}`).join('') + 'Z';
    return (
        <div>
            <Legend
                items={[
                    { label: 'TPV reportado no dia', color: 'var(--color-ink)', kind: 'dash' },
                    { label: 'TPV ajustado', color: 'var(--color-signal)', kind: 'line' },
                ]}
            />
            <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Gráfico ilustrativo de TPV reportado contra ajustado">
                <Grid max={s.max} y={s.y} />
                <path d={area} fill="var(--color-signal)" opacity="0.1" />
                <path d={path(rp)} fill="none" stroke="var(--color-ink)" strokeWidth="1.4" strokeDasharray="4 4" />
                <path d={path(ap)} fill="none" stroke="var(--color-signal)" strokeWidth="2" />
                {['dia 1', 'dia 15', 'dia 30'].map((t, i) => (
                    <text key={t} x={PAD.l + [0, 0.5, 1][i] * (W - PAD.l - PAD.r)} y={H - 8} textAnchor={anchors[i]} className="num" fontSize="11" fill="var(--color-muted)">
                        {t}
                    </text>
                ))}
            </svg>
        </div>
    );
}

// Miniatura para o índice de trabalhos.
export function Spark({ variant }: { variant: 'bars' | 'gap' | 'grid' }) {
    if (variant === 'grid') {
        return (
            <svg viewBox="0 0 120 64" className="block h-auto w-full" aria-hidden>
                <rect x="0.5" y="0.5" width="119" height="63" fill="none" stroke="var(--color-rule)" />
                <rect x="6" y="6" width="22" height="52" fill="var(--color-rule)" />
                {[0, 1, 2].map((i) => (
                    <rect key={i} x={34 + i * 28} y="6" width="24" height="12" fill="none" stroke="var(--color-muted)" strokeWidth="0.8" />
                ))}
                <path d="M34,52 L50,42 L66,46 L82,32 L98,36 L114,24" fill="none" stroke="var(--color-signal)" strokeWidth="1.6" />
            </svg>
        );
    }
    const gap = reportedVsAdjusted(24, 5);
    const d = variant === 'bars' ? movingAverage(dailyTpv(30, 3), 3) : gap.adjusted;
    const max = Math.max(...(variant === 'bars' ? d : gap.reported));
    return (
        <svg viewBox="0 0 120 64" className="block h-auto w-full" aria-hidden>
            <line x1="0" x2="120" y1="63.5" y2="63.5" stroke="var(--color-rule)" />
            {variant === 'bars'
                ? d.map((v, i) => <rect key={i} x={i * 4} y={64 - (v / max) * 56} width="3" height={(v / max) * 56} fill={i === d.length - 1 ? 'var(--color-signal)' : '#CFC8B8'} />)
                : (
                    <>
                        <path d={path(gap.reported.map((v, i) => [i * 5.2, 64 - (v / max) * 52]))} fill="none" stroke="var(--color-muted)" strokeWidth="1" strokeDasharray="2 2" />
                        <path d={path(d.map((v, i) => [i * 5.2, 64 - (v / max) * 52]))} fill="none" stroke="var(--color-signal)" strokeWidth="1.6" />
                    </>
                )}
        </svg>
    );
}
