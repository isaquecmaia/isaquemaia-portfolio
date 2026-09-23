import type { ReactNode } from 'react';
import type { FigureId } from '../content/cases';
import { GapChart, TpvChart } from './charts';

type Stage = { title: string; nodes: string[]; accent?: boolean };

// Diagrama de fluxo em HTML: colunas no desktop, empilhado no celular.
function Flow({ stages }: { stages: Stage[] }) {
    return (
        <ol className="m-0 flex list-none flex-col gap-2 p-0 md:flex-row md:items-stretch md:gap-0">
            {stages.map((st, i) => (
                <li key={st.title} className="flex flex-col md:flex-1 md:flex-row">
                    <div className={`flex-1 border bg-paper p-3 ${st.accent ? 'border-signal' : 'border-ink/70'}`}>
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
                        <span aria-hidden className="num self-center py-1 text-muted md:px-2 md:py-0">
                            <span className="md:hidden">↓</span>
                            <span className="hidden md:inline">→</span>
                        </span>
                    )}
                </li>
            ))}
        </ol>
    );
}

function DashMock() {
    const box = 'border border-ink/60 bg-paper';
    return (
        <div className="grid grid-cols-[64px_1fr] gap-3 text-[11px] sm:grid-cols-[120px_1fr]">
            <div className={`${box} space-y-2 p-2`}>
                <p className="label !text-[10px]">Menu</p>
                {['Visão geral', 'Clientes', 'Upload', 'Relatórios'].map((m, i) => (
                    <p key={m} className={`truncate ${i === 0 ? 'text-ink' : 'text-muted'}`}>
                        {m}
                    </p>
                ))}
            </div>
            <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {['Volume', 'Receita', 'Ticket médio', 'Clientes'].map((k, i) => (
                        <div key={k} className={`${box} p-2`}>
                            <p className="label !text-[10px]">{k}</p>
                            <div className={`mt-2 h-2 w-3/5 ${i === 0 ? 'bg-signal' : 'bg-ink/70'}`} />
                        </div>
                    ))}
                </div>
                <div className="grid gap-3 sm:grid-cols-[2fr_1fr]">
                    <div className={`${box} p-2`}>
                        <p className="label !text-[10px]">Evolução mensal</p>
                        <svg viewBox="0 0 200 60" className="mt-2 block h-auto w-full" aria-hidden>
                            <path d="M0,50 L25,44 L50,46 L75,34 L100,36 L125,26 L150,28 L175,16 L200,12" fill="none" stroke="var(--color-signal)" strokeWidth="1.8" />
                            <line x1="0" x2="200" y1="59.5" y2="59.5" stroke="var(--color-rule)" />
                        </svg>
                    </div>
                    <div className={`${box} space-y-1.5 p-2`}>
                        <p className="label !text-[10px]">Ranking</p>
                        {[90, 72, 55, 40, 28].map((w) => (
                            <div key={w} className="h-1.5 bg-ink/60" style={{ width: `${w}%` }} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export const figures: Record<FigureId, ReactNode> = {
    'bi-architecture': (
        <Flow
            stages={[
                { title: 'Fontes', nodes: ['Adquirente A', 'Adquirente B', 'Adquirente C', 'Base interna'] },
                { title: 'Ingestão', nodes: ['Extração diária', 'Normalização de schema', 'Chave idempotente'] },
                { title: 'Data warehouse', nodes: ['Transações unificadas', 'Carga incremental', 'Reprocesso por dia'] },
                { title: 'Métricas', nodes: ['TPV, receita, MDR', 'Scorecard · 64 métricas', 'DoD · WoW · MoM'] },
                { title: 'Consumo', nodes: ['Painel executivo · 6 págs.', 'Análises da diretoria'], accent: true },
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
    'dash-mock': <DashMock />,
};
