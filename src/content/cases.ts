export type FigureId =
    | 'bi-architecture'
    | 'bi-tpv'
    | 'recon-flow'
    | 'recon-gap'
    | 'platform-map'
    | 'cs-radar'
    | 'shot-cs'
    | 'shot-acoes'
    | 'shot-weekly'
    | 'shot-performance';

export type CaseStudy = {
    slug: string;
    /** Endereços antigos que continuam levando ao case. */
    aliases?: string[];
    number: string;
    /** Cor de capa do case (lista, página e partes). */
    color: string;
    title: string;
    dek: string;
    company: string;
    period: string;
    role: string;
    stack: string[];
    links?: { label: string; href: string }[];
    /** Aviso curto sobre acesso ou confidencialidade, exibido na ficha do case. */
    access?: string;
    /** Parte 1, o problema de negócio: o cenário e por que importava. */
    context: string;
    problem: string;
    /** Parte 2, a decisão técnica: o que escolhi fazer e por quê, antes do detalhe. */
    choice?: string;
    actions: string[];
    decisions: { title: string; body: string }[];
    /** `label` nomeia o bloco na coluna auxiliar; sem ele, o primeiro é 'Como funciona' e os demais 'Na prática'. */
    figures: { id: FigureId; caption: string; label?: string }[];
    /** Parte 3, o que mudou depois. */
    outcome?: string;
    results: { value: string; label: string }[];
    retro: string;
};

export const cases: CaseStudy[] = [
    {
        slug: 'infraestrutura-bi',
        aliases: ['bi-pagaa'],
        number: '01',
        color: 'var(--color-cobalt)',
        title: 'A infraestrutura de BI de uma fintech PayFac, do zero',
        dek: 'Um pipeline diário que lê o adquirente, limpa o histórico e entrega três bases prontas antes do expediente.',
        company: 'Virtù Pagamentos',
        period: 'Desde 2025',
        role: 'Desenho e implementação, de ponta a ponta',
        stack: ['Python', 'SQL', 'PostgreSQL (Supabase)', 'API do adquirente', 'Google Sheets'],
        context:
            'Quando cheguei, a operação dependia de planilhas que cada adquirente mandava num formato diferente e de relatórios de comissão montados à mão. Os painéis ficavam no Looker Studio, e cada atualização exigia alguém subir arquivo.',
        problem:
            'Diretoria, comercial e CS decidiam sobre números que chegavam atrasados e mudavam conforme quem montava a planilha. Sem uma base diária confiável, não dava para acompanhar TPV, receita ou a saúde de cada cliente.',
        choice:
            'Em vez de automatizar as planilhas, tirei elas do caminho. Um pipeline em Python lê direto a API do adquirente toda manhã e reconstrói as bases que os painéis consomem. E troquei o Looker Studio por uma plataforma própria em React, que lê essas bases sem intermediário.',
        actions: [
            'Escrevi o pipeline em Python com paginação e controle de limite de requisições da API, execução diária (D-1) às 6h e reprocessamento de janelas retroativas quando o adquirente corrige algo.',
            'Montei o data warehouse transacional como base só de acréscimo, deduplicada pelo identificador de cada transação.',
            'Gerei a base de comissões com os recebíveis futuros dos próximos 365 dias e o scorecard de clientes, recalculado do zero a cada execução.',
            'Apliquei regras de receita por método de pagamento (crédito, débito, PIX e boleto) a partir da base de taxas de cada cliente.',
            'Migrei os painéis do Looker Studio para a plataforma própria em React, Tailwind e Recharts, lendo as mesmas bases no PostgreSQL (Supabase).',
        ],
        decisions: [
            {
                title: 'Só acrescentar, nunca sobrescrever',
                body: 'O data warehouse cresce por acréscimo e deduplica pelo identificador da transação. Assim dá para reprocessar os últimos sete dias quando o adquirente corrige algo, sem duplicar nada e sem mexer no resto do histórico.',
            },
            {
                title: 'Regra no pipeline, não no painel',
                body: 'Receita por método, status do cliente e comissões são calculados uma vez, no pipeline. Os painéis só leem. Assim duas telas nunca mostram números diferentes para a mesma pergunta.',
            },
            {
                title: 'Status do cliente por regra explícita',
                body: 'Onboarding, ramp-up e ativo são definidos por limiares documentados de volume e de tempo desde a primeira venda. Quando alguém pergunta por que um cliente mudou de faixa, a resposta está na regra.',
            },
            {
                title: 'Publicação atômica',
                body: 'A carga no banco substitui a base inteira ou não substitui nada. Uma falha no meio do upload deixou de apagar o painel até o próximo reprocessamento.',
            },
        ],
        figures: [
            { id: 'bi-architecture', caption: 'Fluxo diário: da API do adquirente às bases consumidas pela plataforma interna.' },
            { id: 'shot-performance', label: 'Na tela', caption: 'Performance consolidada, alimentada pelas bases do pipeline. Tela real da plataforma com dados fictícios, gerados só para esta demonstração.' },
        ],
        outcome:
            'O upload manual acabou. Todo dia, antes do expediente, data warehouse, comissões e scorecard estão atualizados com o dia anterior, e os painéis leem direto dessas bases. O Looker Studio saiu de cena, e a plataforma própria virou o lugar onde a empresa acompanha a operação.',
        results: [
            { value: 'D-1', label: 'atualização diária, sem upload manual' },
            { value: '3', label: 'bases reconstruídas por execução' },
            { value: '365', label: 'dias de recebíveis projetados' },
        ],
        retro:
            'Eu faria a publicação atômica desde o primeiro dia. Por um período, uma carga que falhava no meio deixava o painel vazio até o reprocessamento, e isso custou confiança que poderia ter sido poupada.',
    },
    {
        slug: 'reconciliacao-financeira',
        number: '02',
        color: 'var(--color-bottle)',
        title: 'Reconciliação financeira e o motor de margem',
        dek: 'Vários adquirentes, um só número de receita, e uma fórmula herdada da planilha que ninguém tinha conferido contra a fonte.',
        company: 'Virtù Pagamentos',
        period: '2025 e 2026',
        role: 'Investigação, desenho e implementação',
        stack: ['Python', 'SQL', 'TypeScript', 'Google Sheets'],
        context:
            'Quando assumi a área, o P&L dependia de juntar à mão, todo dia, os relatórios dos adquirentes com a base interna. A margem por transação vinha de uma planilha com abas encadeadas, montada antes da minha chegada, e os números de TPV mudavam depois de reportados.',
        problem:
            'Margem e receita sustentam decisões de preço e de carteira. Se o número muda depois de fechado, ou não bate com o que o adquirente faturou, ninguém sabe em qual versão confiar.',
        choice:
            'Tirei a regra de margem da planilha e escrevi um motor de cálculo isolado e testável. E, em vez de conferir o motor contra a planilha herdada, conferi contra a única fonte que não pode estar errada: o relatório oficial do adquirente.',
        actions: [
            'Automatizei a consolidação dos adquirentes com validação de integridade de schema e relatórios estruturados para a análise de P&L.',
            'Investiguei as discrepâncias de volume e encontrei chargebacks processados com data retroativa, que alteravam o TPV de dias já reportados.',
            'Recalibrei as métricas e ajustei o processo de reporting para refletir os dados corrigidos.',
            'Portei a regra de margem, que vivia em abas de planilha, para um motor de cálculo isolado e testável.',
            'Conferi o motor contra o relatório oficial do adquirente de agosto de 2026 e corrigi a fórmula que vinha da planilha herdada, que divergia da conta real.',
        ],
        decisions: [
            {
                title: 'Conferir contra a fonte oficial, não contra a planilha',
                body: 'A primeira versão do motor reproduzia fielmente a planilha herdada e batia com ela em todas as linhas. Mesmo assim estava errada: a fórmula original aplicava um fator que o adquirente não aplica. Validar contra o relatório oficial trocou essa conta por uma subtração simples, com 3.102 de 3.102 linhas sem divergência.',
            },
            {
                title: 'Falhar alto, não corrigir em silêncio',
                body: 'Um lote fora do schema é rejeitado e aparece como alerta, em vez de ser consertado automaticamente. Custa um passo a mais, mas ninguém descobre semanas depois que um número foi inventado.',
            },
            {
                title: 'Chargeback no mês do evento',
                body: 'Chargebacks e disputas entram no mês em que aconteceram, não no mês da venda. Essa convenção, aplicada igual em todas as telas, acabou com a sensação de que o passado mudava sozinho.',
            },
        ],
        figures: [
            { id: 'recon-flow', caption: 'Pipeline de reconciliação com validação e classificação de divergências.' },
            { id: 'recon-gap', caption: 'TPV reportado contra ajustado após chargebacks retroativos. Dados ilustrativos.' },
        ],
        outcome:
            'O processamento manual diário acabou, e a margem calculada passou a ser a margem que o adquirente de fato faturou: 3.102 de 3.102 linhas do relatório de agosto de 2026 sem divergência. Com chargebacks contados no mês do evento, o TPV já reportado parou de mudar sozinho.',
        results: [
            { value: '3.102', label: 'de 3.102 linhas sem divergência' },
            { value: '0', label: 'processamento manual diário' },
            { value: '1', label: 'convenção de chargeback em todas as telas' },
        ],
        retro:
            'Eu validaria contra o relatório oficial do adquirente já na primeira versão do motor. A planilha herdada parecia certa justamente porque todo mundo a usava havia tempo.',
    },
    {
        slug: 'plataforma-interna',
        aliases: ['dash-pagaa'],
        number: '03',
        color: 'var(--color-signal)',
        title: 'Da planilha ao sistema: a plataforma interna da Virtù',
        dek: 'Começou como a troca do Looker Studio por dashboards próprios. Em cinco meses, virou o sistema onde a empresa opera.',
        company: 'Virtù Pagamentos',
        period: 'Abr a set de 2026',
        role: 'Produto, design e desenvolvimento',
        stack: ['React', 'TypeScript', 'Tailwind', 'Recharts', 'Express', 'Supabase', 'Python', 'Vercel'],
        access: 'Sistema interno com acesso restrito e código privado. As telas abaixo rodam com dados fictícios, sem nenhuma informação de clientes.',
        context:
            'A empresa acompanhava performance em painéis do Looker Studio alimentados por planilhas, e o CRM vivia no Notion, sem ligação com o que cada cliente de fato transacionava. Toda pergunta nova da diretoria ou do comercial virava mais uma planilha.',
        problem:
            'Reunir num só lugar os números da operação e o trabalho do dia a dia: performance, clientes, comissões, caixa e funil comercial, sobre dados em que o time pudesse confiar.',
        actions: [
            'Painéis de TPV, receita e margem por cliente, vendedor e adquirente, com leituras semanais e mensais e forecast com metas editáveis.',
            'Customer Success com radar de risco em quatro quadrantes e alertas diários automáticos para as contas que pedem atenção.',
            'CRM próprio: esteira de etapas, kanban de ativação, ficha do cliente com o transacionado e a margem real, parcerias com comissão por negociação e a fila de ações do dia.',
            'Weekly Review ligada ao CRM, com Pipe Report e composição de TPV e margem.',
            'Área financeira com comissões, caixa com o repasse do adquirente execução a execução e o motor de margem.',
            'Segurança de sistema interno: tokens de acesso de curta duração, proteção CSRF, RLS no banco e limite de tentativas de login.',
        ],
        decisions: [
            {
                title: 'Regra de negócio pura, banco nas bordas',
                body: 'O motor de margem, a régua do CRM e o radar de CS são funções sem acesso a banco, testáveis com dados de exemplo. As rotas só leem e gravam. Mudar uma regra não exige mexer na infraestrutura.',
            },
            {
                title: 'Reconciliar em vez de acumular',
                body: 'A régua do CRM não cria tarefas: descreve as que deveriam existir e grava só a diferença. Rodar duas vezes seguidas cria zero tarefas na segunda, e esse é o teste principal do motor.',
            },
            {
                title: 'Semana parcial contra semana parcial',
                body: 'A comparação semanal olha a semana anterior só até o mesmo dia da semana de hoje. Uma segunda-feira não é mais comparada com uma semana cheia e ninguém toma susto à toa.',
            },
        ],
        figures: [
            { id: 'platform-map', caption: 'Mapa da plataforma: as áreas do sistema e o que cada uma resolve.' },
            { id: 'shot-cs', label: 'Customer Success', caption: 'Radar de risco: Alerta, Atenção, Silêncio, Pré-churn e OK, com a carteira detalhada logo abaixo. Tela real da plataforma com dados fictícios, gerados só para esta demonstração.' },
            { id: 'cs-radar', label: 'A regra do radar', caption: 'Os quadrantes cruzam o atingimento da meta de TPV com o da meta de margem. Pontos ilustrativos.' },
            { id: 'shot-acoes', label: 'CRM', caption: 'Ações de hoje: a fila montada pela régua do CRM, ordenada por prazo, escalonamento e receita em risco. Tela real da plataforma com dados fictícios, gerados só para esta demonstração.' },
            { id: 'shot-weekly', label: 'Rituais', caption: 'Leitura semanal de receita e margem contra a semana anterior comparável e a meta. Tela real da plataforma com dados fictícios, gerados só para esta demonstração.' },
        ],
        results: [
            { value: '148', label: 'commits em cinco meses' },
            { value: '20+', label: 'telas em produção' },
            { value: '5', label: 'áreas: performance, CS, CRM, financeiro e dados' },
        ],
        retro:
            'Eu separaria desde o início as regras que a tela e o servidor compartilham. Hoje o radar de CS e a leitura semanal existem em duas cópias, uma para cada lado, e toda mudança de regra precisa ser espelhada à mão.',
    },
];

export const getCase = (slug: string) => cases.find((c) => c.slug === slug || c.aliases?.includes(slug));
