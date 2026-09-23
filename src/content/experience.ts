export type Experience = {
    period: string;
    company: string;
    sector: string;
    role: string;
    summary: string;
    outcomes: string[];
    cases?: string[];
};

export const experience: Experience[] = [
    {
        period: 'Desde 2025',
        company: 'Pagaa',
        sector: 'Fintech de pagamentos',
        role: 'Analista de Dados e Operações',
        summary: 'Responsável pela operação de Business Intelligence, do data warehouse aos dashboards executivos.',
        outcomes: [
            'Dashboard de 6 páginas no Looker Studio cobrindo R$3,5M+ em TPV de 3 adquirentes, com leitura DoD, WoW e MoM.',
            'Scorecard com 64 métricas por cliente ativo, usado pela diretoria em análises de margem, churn e saúde da carteira.',
            'Simulações de MDR e CET para propostas comerciais e automação do relatório de receita.',
            'Fluxo de vendas com Fireflies AI + Make + Notion: a reunião gravada vira registro no CRM sem digitação.',
        ],
        cases: ['bi-pagaa', 'reconciliacao-financeira'],
    },
    {
        period: '2024 a 2025',
        company: 'Grupo QuintoAndar',
        sector: 'PropTech',
        role: 'Efficiency Ops, Qualidade e Treinamento',
        summary: 'Qualidade de atendimento e análise de dados, com entregas acima do escopo do cargo.',
        outcomes: [
            'Indicado formalmente para promoção a Analista de Inteligência Conversacional.',
            'Indicadores de qualidade no Looker Studio e automações em Google Sheets que tiraram etapas manuais do processo.',
            'Mapeamento e documentação de bugs da plataforma e participação em reuniões estratégicas com a gestão.',
        ],
    },
    {
        period: '2021 a 2023',
        company: 'Expertise Pesquisas',
        sector: 'Pesquisa de mercado',
        role: 'Auxiliar Administrativo',
        summary: 'Onde começou o trabalho com qualidade de dados.',
        outcomes: [
            'Validação e controle de qualidade de pesquisas antes da análise.',
            'Tratamento de bases e elaboração de relatórios analíticos.',
        ],
    },
];
