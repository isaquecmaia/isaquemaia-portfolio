export const profile = {
    name: 'Isaque Maia',
    fullName: 'Isaque Couto Maia',
    role: 'Analista de Dados · BI & IA aplicada',
    city: 'Belo Horizonte, MG',
    email: 'isaquemaia2004@gmail.com',
    linkedin: 'https://linkedin.com/in/isaque-maia-8ab346268',
    github: 'https://github.com/isaquecmaia',
    cv: '/assets/curriculo-isaque-maia.pdf',
    photo: '/assets/images/profile.jpg',

    thesis:
        'Construo a camada de dados de uma fintech de pagamentos, do data warehouse ao painel da diretoria, e uso IA onde ela elimina trabalho manual.',

    facts: [
        { label: 'Atualmente', value: 'Pagaa, desde 2025' },
        { label: 'Foco', value: 'BI, pagamentos, automação com IA' },
        { label: 'Base', value: 'Belo Horizonte, MG' },
        { label: 'Status', value: 'Aberto a conversas' },
    ],

    // Números reais do trabalho na Pagaa. Cada um carrega a sua nota.
    kpis: [
        { value: 'R$3,5M+', label: 'TPV monitorado', note: 'Volume processado nos 3 adquirentes cobertos pelo dashboard, 2025.' },
        { value: '11 mil+', label: 'transações', note: 'Registros tratados no data warehouse com carga incremental diária.' },
        { value: '64', label: 'métricas no scorecard', note: 'Indicadores por cliente ativo: volume, recorrência, margem, churn.' },
        { value: '46 → 12', label: 'colunas na base', note: 'Redução após remodelar a camada que alimenta os dashboards.' },
    ],

    about: [
        'Comecei validando pesquisas na Expertise, onde aprendi que um dado errado na origem contamina todo o relatório. No QuintoAndar, fui além da monitoria de qualidade: automatizei planilhas, montei análises no Looker Studio e fui indicado à promoção para Inteligência Conversacional.',
        'Hoje, na Pagaa, respondo pela operação de BI inteira. Consolido dados de adquirentes diferentes, defino as métricas que a diretoria usa para decidir e automatizo o que antes era copiar e colar. Curso Análise e Desenvolvimento de Sistemas e escrevo código quando a ferramenta pronta não resolve.',
    ],

    languages: [
        { name: 'Português', level: 'nativo' },
        { name: 'Inglês', level: 'avançado' },
    ],
};
