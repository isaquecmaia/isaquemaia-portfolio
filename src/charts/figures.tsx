import type { ReactNode } from 'react';
import type { FigureId } from '../content/cases';
import { GapChart, TpvChart } from './charts';

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
function CsRadar() {
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
    const legend: [string, string][] = [
        ['OK', 'Metas de TPV e de margem atingidas.'],
        ['Atenção', 'Uma das duas metas fora do alvo.'],
        ['Alerta', 'As duas abaixo do alvo: ação imediata.'],
        ['Silêncio', 'De 5 a 20 dias sem transação.'],
        ['Pré-churn', '21 dias ou mais sem transação.'],
    ];
    return (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_200px]">
            <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Esquema do radar de Customer Success em quatro quadrantes">
                <rect x={x(0)} y={y(90)} width={x(70) - x(0)} height={y(0) - y(90)} fill="var(--color-signal)" opacity="0.07" />
                <line x1={x(0)} x2={x(140)} y1={y(0)} y2={y(0)} stroke="var(--color-ink)" />
                <line x1={x(0)} x2={x(0)} y1={y(0)} y2={y(140)} stroke="var(--color-ink)" />
                <line x1={x(70)} x2={x(70)} y1={y(0)} y2={y(140)} stroke="var(--color-rule)" strokeDasharray="4 4" />
                <line x1={x(0)} x2={x(140)} y1={y(90)} y2={y(90)} stroke="var(--color-rule)" strokeDasharray="4 4" />
                {label(x(70), y(0) + 16, '70%', 'middle')}
                {label(x(0) - 6, y(90) + 4, '90%', 'end')}
                {label(x(140) - 4, y(140) + 26, 'OK', 'end', 'var(--color-ink)')}
                {label(x(4), y(140) + 26, 'ATENÇÃO')}
                {label(x(140) - 4, y(0) - 8, 'ATENÇÃO', 'end')}
                {label(x(4), y(0) - 8, 'ALERTA', 'start', 'var(--color-signal)')}
                {dots.map(([tpv, mg], i) => (
                    <circle key={i} cx={x(tpv)} cy={y(mg)} r="4.5" fill={fill[bucket(tpv, mg)]} />
                ))}
                {label(x(140), H - 8, 'META DE TPV ATINGIDA →', 'end')}
                <text transform={`translate(${P.l - 38} ${y(0)}) rotate(-90)`} className="num" fontSize="11" letterSpacing="0.06em" fill="var(--color-muted)">
                    META DE MARGEM →
                </text>
            </svg>
            <dl className="t-small m-0 space-y-3 self-end">
                {legend.map(([k, v]) => (
                    <div key={k} className="border-t border-rule pt-2">
                        <dt className={`label ${k === 'Alerta' ? '!text-signal' : '!text-ink'}`}>{k}</dt>
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

export const figures: Record<FigureId, ReactNode> = {
    'bi-architecture': (
        <Flow
            stages={[
                { title: 'Fontes', nodes: ['API do adquirente', 'Base de taxas por cliente', 'Cadastro de clientes'] },
                { title: 'Pipeline D-1', nodes: ['Extração paginada', 'Deduplicação por transação', 'Receita por método'] },
                { title: 'Bases', nodes: ['DW transacional', 'Comissões e recebíveis', 'Scorecard de clientes'] },
                { title: 'Banco', nodes: ['PostgreSQL no Supabase', 'Publicação atômica', 'Permissões por perfil'] },
                { title: 'Consumo', nodes: ['Plataforma interna', 'Customer Success', 'FP&A e diretoria'], accent: true },
            ]}
        />
    ),
    'bi-tpv': <TpvChart />,
    'recon-flow': (
        <Flow
            stages={[
                { title: 'Entrada', nodes: ['Relatórios dos adquirentes', 'Base interna'] },
                { title: 'Validação', nodes: ['Tipos e campos', 'Datas e moeda', 'Lote inválido → alerta'] },
                { title: 'Casamento', nodes: ['Chave exata', 'Aproximado, marcado', 'Transação a transação'] },
                { title: 'Divergências', nodes: ['Valor', 'Data', 'Status', 'Ausente'] },
                { title: 'Saída', nodes: ['P&L consolidado', 'TPV reportado + ajustado'], accent: true },
            ]}
        />
    ),
    'recon-gap': <GapChart />,
    'platform-map': (
        <PlatformMap
            areas={[
                { title: 'Performance', items: ['TPV, receita e margem', 'Leituras semanais e mensais', 'Forecast com metas'] },
                { title: 'Customer Success', items: ['Radar de risco', 'Alertas diários', 'Visão por cliente'], accent: true },
                { title: 'CRM', items: ['Esteira e ativação', 'Ficha do cliente', 'Parcerias e ações do dia'] },
                { title: 'Rituais', items: ['Weekly Review', 'Pipe Report', 'Ajustes da semana'] },
                { title: 'Financeiro', items: ['Comissões', 'Caixa e repasses', 'Motor de margem'] },
                { title: 'Dados', items: ['Transações', 'Glossário de métricas', 'Uploads atômicos'] },
            ]}
        />
    ),
    'cs-radar': <CsRadar />,
    'shot-cs': <Screenshot src="/assets/work/plataforma-radar-cs.webp" alt="Tela de Customer Success com o radar de risco e a tabela da carteira" />,
    'shot-acoes': <Screenshot src="/assets/work/plataforma-acoes-hoje.webp" alt="Tela de Ações de hoje do CRM com a fila de tarefas por cliente" />,
    'shot-weekly': <Screenshot src="/assets/work/plataforma-weekly.webp" alt="Dashboard semanal de receita e margem com a meta da semana" />,
    'shot-performance': <Screenshot src="/assets/work/plataforma-performance.webp" alt="Tela de Performance consolidada com TPV, receita, margem e taxa de aprovação" />,
};
