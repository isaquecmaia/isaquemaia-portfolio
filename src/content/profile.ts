export const profile = {
    name: 'Isaque Maia',
    fullName: 'Isaque Couto Maia',
    role: 'Inteligência de Negócios · BI, FP&A e Operações',
    city: 'Belo Horizonte, MG',
    email: 'isaquemaia2004@gmail.com',
    linkedin: 'https://linkedin.com/in/isaque-maia-8ab346268',
    github: 'https://github.com/isaquecmaia',
    cv: '/assets/curriculo-isaque-maia.pdf',
    photo: '/assets/images/profile.jpg',

    thesis:
        'Construo a infraestrutura de dados e as ferramentas internas de uma fintech de pagamentos: do pipeline diário ao DRE, do CRM ao painel da diretoria.',

    facts: [
        { label: 'Atualmente', value: 'Virtù Pagamentos (antiga Pagaa)' },
        { label: 'Foco', value: 'BI, FP&A, Customer Success e automação' },
        { label: 'Base', value: 'Belo Horizonte, MG' },
        { label: 'Status', value: 'Aberto a conversas' },
    ],

    // Números verificáveis do trabalho. Cada um carrega a sua nota de origem.
    kpis: [
        { value: '148', label: 'commits na plataforma interna', note: 'Sistema próprio que substituiu o Looker Studio, construído entre abril e setembro de 2026.' },
        { value: '3.102', label: 'de 3.102 linhas sem divergência', note: 'Motor de margem conferido contra o relatório oficial do adquirente, agosto de 2026.' },
        { value: 'D-1', label: 'atualização diária automatizada', note: 'Pipeline em Python que lê a API do adquirente e reconstrói DW, comissões e scorecard.' },
        { value: '40 → 3', label: 'minutos por monitoria, com IA', note: 'Projeto de automação de monitorias de atendimento no QuintoAndar, 2025.' },
    ],

    about: [
        'Comecei como aprendiz na Expertise, em rotinas administrativas, e foi lá que desenvolvi o inglês. No QuintoAndar, na área de Qualidade e Treinamento, participei do projeto que usou IA para automatizar monitorias de atendimento: cada análise caiu de cerca de 40 para 3 minutos.',
        'Hoje, na Virtù (antiga Pagaa), construí do zero a infraestrutura de BI da empresa e a plataforma interna que substituiu o Looker Studio. O escopo cresceu para FP&A: DRE da operação, projeções de caixa e recebíveis, margem e unit economics. Curso Análise e Desenvolvimento de Sistemas e sigo no caminho de FP&A com dados.',
        'O que me move vai além do cargo. Gosto de pensar em sistemas: entender como dados, produto, financeiro e operação se conectam, e transformar essa ligação em processos mais confiáveis e automatizados.',
    ],

    // `learning` marca o idioma em estudo, mostrado de forma mais discreta.
    languages: [
        { name: 'Português', level: 'Nativo', flag: 'br' as const },
        { name: 'Inglês', level: 'Fluente', flag: 'us' as const },
        { name: 'Espanhol', level: 'Estudando', flag: 'es' as const, learning: true },
    ],
};
