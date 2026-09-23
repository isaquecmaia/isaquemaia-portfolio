// Cada ferramenta aponta onde foi usada, em vez de uma nota de 0 a 100.
export type Capability = { name: string; where: string };
export type CapabilityGroup = { title: string; items: Capability[] };

export const capabilities: CapabilityGroup[] = [
    {
        title: 'Dados',
        items: [
            { name: 'SQL', where: 'Data warehouse da Pagaa, reconciliação' },
            { name: 'Python · pandas', where: 'Tratamento e validação de extratos' },
            { name: 'Modelagem de dados', where: 'Remodelagem 46 → 12 colunas' },
            { name: 'ETL incremental', where: 'Carga diária do DW' },
            { name: 'Power Query', where: 'Consolidação de planilhas legadas' },
        ],
    },
    {
        title: 'BI & métricas',
        items: [
            { name: 'Looker Studio', where: 'Dashboard executivo, QuintoAndar' },
            { name: 'Scorecards', where: '64 métricas por cliente' },
            { name: 'Definição de KPIs', where: 'TPV, MDR, CET, churn, margem' },
            { name: 'Excel · Google Sheets', where: 'Simulações comerciais, automações' },
            { name: 'Data storytelling', where: 'Análises para a diretoria' },
        ],
    },
    {
        title: 'Automação & IA',
        items: [
            { name: 'Make · n8n', where: 'Fluxos de vendas e operação' },
            { name: 'Claude API', where: 'Análise semântica de atendimentos (MaIA)' },
            { name: 'Prompt engineering', where: 'Critérios de avaliação reproduzíveis' },
            { name: 'Fireflies AI · Notion', where: 'Reunião → CRM sem digitação' },
            { name: 'Google Apps Script', where: 'Rotinas em planilhas' },
        ],
    },
    {
        title: 'Código',
        items: [
            { name: 'React · TypeScript', where: 'Dash Pagaa, este site' },
            { name: 'Supabase', where: 'Backend do Dash Pagaa' },
            { name: 'Git · Vercel', where: 'Versionamento e deploy' },
        ],
    },
];
