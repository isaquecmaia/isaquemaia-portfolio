// Cada ferramenta aponta onde foi usada, em vez de uma nota de 0 a 100.
export type Capability = { name: string; where: string };
export type CapabilityGroup = { title: string; items: Capability[] };

export const capabilities: CapabilityGroup[] = [
    {
        title: 'Dados',
        items: [
            { name: 'SQL · PostgreSQL', where: 'Data warehouse e bases no Supabase' },
            { name: 'Python', where: 'Pipeline D-1 e reconstrução das bases' },
            { name: 'APIs de adquirente', where: 'Extração paginada e diária' },
            { name: 'Modelagem de dados', where: 'DW transacional, scorecard, CRM' },
            { name: 'Qualidade de dados', where: 'Validação de schema antes dos painéis' },
        ],
    },
    {
        title: 'BI & FP&A',
        items: [
            { name: 'Dashboards próprios', where: 'Plataforma interna em React e Recharts' },
            { name: 'DRE e fluxo de caixa', where: 'FP&A da operação, recebíveis' },
            { name: 'Margem e unit economics', where: 'Motor de margem, análises para a diretoria' },
            { name: 'Excel · Google Sheets', where: 'Análises e rotinas da operação' },
            { name: 'Looker Studio', where: 'Painéis anteriores, QuintoAndar' },
        ],
    },
    {
        title: 'Automação & IA',
        items: [
            { name: 'IA em monitorias', where: 'QuintoAndar, de 40 para 3 minutos' },
            { name: 'Alertas automáticos', where: 'Radar diário de Customer Success' },
            { name: 'Meta Ad Library', where: 'Pipeline de leads para PayFac' },
            { name: 'Notion', where: 'CRM e CS antes do sistema próprio' },
        ],
    },
    {
        title: 'Código',
        items: [
            { name: 'React · TypeScript', where: 'Plataforma interna, este site' },
            { name: 'Express · Vercel', where: 'API própria e deploy' },
            { name: 'Supabase · RLS', where: 'Banco e permissões por perfil' },
            { name: 'Git', where: '148 commits na plataforma' },
        ],
    },
];
