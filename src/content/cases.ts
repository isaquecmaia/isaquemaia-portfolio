export type FigureId =
    | 'bi-architecture'
    | 'bi-tpv'
    | 'recon-flow'
    | 'recon-gap'
    | 'dash-mock';

export type CaseStudy = {
    slug: string;
    number: string;
    title: string;
    dek: string;
    company: string;
    period: string;
    role: string;
    stack: string[];
    links?: { label: string; href: string }[];
    context: string;
    problem: string;
    actions: string[];
    decisions: { title: string; body: string }[];
    figures: { id: FigureId; caption: string }[];
    results: { value: string; label: string }[];
    retro: string;
};

export const cases: CaseStudy[] = [
    {
        slug: 'bi-pagaa',
        number: '01',
        title: 'A operação de BI de uma fintech de pagamentos',
        dek: 'Do extrato de três adquirentes ao painel que a diretoria abre toda manhã.',
        company: 'Pagaa',
        period: 'Desde 2025',
        role: 'Analista responsável, de ponta a ponta',
        stack: ['SQL', 'Python', 'Google Sheets', 'Looker Studio', 'Make', 'Notion'],
        context:
            'A Pagaa processa pagamentos por mais de um adquirente. Cada um entrega os dados num formato, num horário e com uma granularidade diferentes. Antes, a visão de volume e receita saía de planilhas montadas à mão, e dois relatórios podiam dar números diferentes para o mesmo dia.',
        problem:
            'A diretoria precisava de uma leitura única e diária de TPV, receita e saúde de cada cliente, com números em que desse para confiar sem conferir no braço.',
        actions: [
            'Montei um data warehouse com carga incremental diária, que normaliza os extratos dos 3 adquirentes num esquema único de transação.',
            'Defini a camada de métricas (TPV, receita, MDR efetivo, ticket médio, recorrência) com uma fonte de verdade por indicador.',
            'Construí o dashboard executivo de 6 páginas no Looker Studio, com comparação DoD, WoW e MoM.',
            'Criei o scorecard de 64 métricas por cliente ativo, que sustenta as análises de margem, churn e saúde da carteira.',
            'Remodelei a base que alimenta os painéis: de 46 colunas para 12, sem perder informação usada.',
        ],
        decisions: [
            {
                title: 'Carga incremental em vez de recarga total',
                body: 'Reprocessar o histórico todo dia deixava o painel lento e mais sujeito a erro. Processar só o delta, com uma chave idempotente por transação, manteve a atualização diária barata e permitiu reprocessar um dia isolado quando um adquirente corrige dados.',
            },
            {
                title: 'Menos colunas, mais métricas calculadas',
                body: 'Metade das 46 colunas eram variações pré-calculadas do mesmo número. Passei esses cálculos para campos derivados no BI, o que deixou a base menor e acabou com as divergências entre páginas.',
            },
            {
                title: 'Scorecard com peso explícito',
                body: 'Cada uma das 64 métricas tem definição e peso documentados. Quando alguém pergunta por que um cliente caiu de faixa, a resposta está na própria tabela.',
            },
        ],
        figures: [
            { id: 'bi-architecture', caption: 'Fluxo da operação: dos extratos brutos ao painel executivo.' },
            { id: 'bi-tpv', caption: 'Leitura diária de TPV com média móvel de 7 dias, como no painel. Dados ilustrativos.' },
        ],
        results: [
            { value: 'R$3,5M+', label: 'em TPV monitorado' },
            { value: '6', label: 'páginas no painel executivo' },
            { value: '64', label: 'métricas por cliente' },
            { value: '46 → 12', label: 'colunas na base' },
        ],
        retro:
            'Eu teria versionado as definições de métrica desde o primeiro dia, num repositório e não só na documentação. Hoje, mudar uma regra exige disciplina manual para manter o histórico comparável.',
    },
    {
        slug: 'reconciliacao-financeira',
        number: '02',
        title: 'Reconciliação financeira automatizada',
        dek: 'Três adquirentes, um só número de receita, e uma correção retroativa que mudou a leitura dos KPIs.',
        company: 'Pagaa',
        period: '2025',
        role: 'Desenho e implementação',
        stack: ['Python', 'pandas', 'SQL', 'Google Sheets'],
        context:
            'O P&L dependia de juntar os relatórios dos adquirentes com a base interna de transações. O processo era manual, levava horas e só mostrava as diferenças depois de o mês fechar.',
        problem:
            'Consolidar as fontes com validação automática, apontar divergências antes de elas chegarem ao P&L e explicar por que os números de TPV mudavam depois de fechados.',
        actions: [
            'Escrevi validações de schema por adquirente: tipos, campos obrigatórios, datas e moeda, com rejeição explícita do lote inválido.',
            'Casei transação a transação entre adquirente e base interna, com classificação de cada divergência (valor, data, status, ausente).',
            'Investiguei as divergências recorrentes e encontrei chargebacks lançados com data retroativa, que alteravam o TPV de dias já reportados.',
            'Recalibrei os KPIs para separar o TPV do dia do TPV ajustado, com as duas leituras lado a lado no painel.',
        ],
        decisions: [
            {
                title: 'Falhar alto, não corrigir em silêncio',
                body: 'Um lote fora do schema é rejeitado e aparece como alerta, em vez de ser "consertado" automaticamente. Custa um passo a mais, mas ninguém descobre semanas depois que um número foi inventado.',
            },
            {
                title: 'Duas leituras de TPV em vez de uma',
                body: 'Sobrescrever o número original escondia o efeito dos chargebacks retroativos. Manter o TPV reportado e o TPV ajustado deixa a diferença visível e auditável.',
            },
            {
                title: 'Regra determinística antes de qualquer heurística',
                body: 'O casamento de transações usa chave exata sempre que possível e só cai para correspondência aproximada (valor + janela de data) de forma explícita e marcada. Assim cada divergência tem uma explicação rastreável.',
            },
        ],
        figures: [
            { id: 'recon-flow', caption: 'Pipeline de reconciliação com validação e classificação de divergências.' },
            { id: 'recon-gap', caption: 'TPV reportado vs. ajustado após chargebacks retroativos. Dados ilustrativos.' },
        ],
        results: [
            { value: '3', label: 'adquirentes consolidados' },
            { value: '2', label: 'leituras de TPV: reportado e ajustado' },
        ],
        retro:
            'Eu mediria desde o início o tempo gasto por fechamento. Sei que o processo manual deixou de existir, mas não tenho a série histórica para mostrar o ganho em horas.',
    },
    {
        slug: 'dash-pagaa',
        number: '03',
        title: 'Dash Pagaa: um painel comercial em código',
        dek: 'Quando o Looker Studio não bastou, escrevi o painel do zero.',
        company: 'Projeto aberto',
        period: '2025',
        role: 'Design e desenvolvimento',
        stack: ['React', 'TypeScript', 'Tailwind', 'Supabase', 'Recharts'],
        links: [
            { label: 'Código no GitHub', href: 'https://github.com/isaquecmaia/dash-pagaa' },
            { label: 'Demo ao vivo', href: 'https://dash-pagaa.vercel.app' },
        ],
        context:
            'O time comercial precisava subir planilhas de vendas e ver a performance na hora, com filtros que o BI tradicional deixava lentos ou rígidos.',
        problem:
            'Transformar uploads de Excel em um painel interativo de KPIs comerciais, com persistência e sem depender de alguém do BI para cada pergunta.',
        actions: [
            'Parser de Excel no navegador, com validação de colunas antes do envio.',
            'Persistência no Supabase, com os dados organizados por período e cliente.',
            'Gráficos interativos em Recharts para volume, receita, ticket e ranking de clientes.',
            'Interface em React + TypeScript, com componentes tipados de ponta a ponta.',
        ],
        decisions: [
            {
                title: 'Validar no cliente antes de gravar',
                body: 'A maior parte dos erros vinha de planilha com coluna trocada. Checar isso no upload evita lixo na base e dá ao usuário um erro que ele entende.',
            },
            {
                title: 'Supabase em vez de backend próprio',
                body: 'Para um painel interno, autenticação e banco prontos entregam 90% do valor com uma fração da manutenção.',
            },
        ],
        figures: [
            { id: 'dash-mock', caption: 'Estrutura da tela principal do Dash Pagaa. Representação esquemática.' },
        ],
        results: [
            { value: 'Público', label: 'código e demo abertos para inspeção' },
            { value: 'TS strict', label: 'tipagem de ponta a ponta' },
        ],
        retro:
            'Eu escreveria testes para o parser de Excel antes da interface. É a parte mais frágil do sistema e a única que recebe dados de fora.',
    },
];

export const getCase = (slug: string) => cases.find((c) => c.slug === slug);
