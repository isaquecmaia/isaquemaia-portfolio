export type Experience = {
    period: string;
    company: string;
    sector: string;
    role: string;
    /** Logo quadrado da empresa, em /public. */
    logo: string;
    summary: string;
    outcomes: string[];
    cases?: string[];
};

export const experience: Experience[] = [
    {
        period: 'Desde 2025',
        company: 'Virtù Pagamentos',
        sector: 'PayFac · antiga Pagaa',
        role: 'Analista de Inteligência de Negócios (PJ)',
        logo: '/assets/logos/virtu.webp',
        summary: 'Infraestrutura de BI, ferramentas internas e FP&A numa fintech de processamento de pagamentos.',
        outcomes: [
            'Infraestrutura de BI construída do zero: data warehouse, base de scorecard e pipeline diário (D-1) que consolida os dados transacionais de múltiplos adquirentes.',
            'Migração do Looker Studio para uma plataforma própria de dashboards em React, Tailwind e Recharts.',
            'Dashboard de Customer Success com radar de risco em quatro quadrantes, usado pelo comercial para priorizar contas.',
            'FP&A: DRE da operação (receita bruta, custo do serviço, receita líquida), projeções de fluxo de caixa e recebíveis, análises de margem e unit economics.',
            'Pipeline de geração de leads com a Meta Ad Library e arquitetura de CRM e CS no Notion.',
        ],
        cases: ['infraestrutura-bi', 'reconciliacao-financeira', 'plataforma-interna'],
    },
    {
        period: 'Mar a nov de 2025',
        company: 'QuintoAndar',
        sector: 'PropTech · 9 meses',
        role: 'Aprendiz, Efficiency Ops',
        logo: '/assets/logos/quintoandar.webp',
        summary: 'Qualidade e Treinamento: monitorias de atendimento, análises de qualidade e acompanhamento operacional.',
        outcomes: [
            'Projeto de automação de monitorias com IA: cada análise caiu de cerca de 40 para 3 minutos, com mais volume monitorado e mais visão analítica do processo.',
            'Monitorias, análises de qualidade, mapeamento de bugs da plataforma e relatórios e dashboards de acompanhamento.',
            'Melhorias de processo, automações e controles internos com Google Planilhas, Looker Studio, Notion e formulários automatizados.',
        ],
    },
    {
        period: 'Out/2021 a mar/2023',
        company: 'Expertise',
        sector: '1 ano e 6 meses',
        role: 'Aprendiz, Assistente Administrativo',
        logo: '/assets/logos/expertise.webp',
        summary: 'Suporte administrativo e rotinas operacionais, com o inglês desenvolvido como segunda língua.',
        outcomes: [
            'Suporte administrativo geral e apoio às rotinas operacionais da empresa.',
            'Desenvolvimento do inglês como segunda língua.',
        ],
    },
];
