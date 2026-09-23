export type FigureId = 'bi-architecture' | 'bi-tpv' | 'recon-flow' | 'recon-gap' | 'platform-map' | 'cs-radar';

export type CaseStudy = {
    slug: string;
    /** Endereços antigos que continuam levando ao case. */
    aliases?: string[];
    number: string;
    title: string;
    dek: string;
    company: string;
    period: string;
    role: string;
    stack: string[];
    links?: { label: string; href: string }[];
    /** Aviso curto sobre acesso ou confidencialidade, exibido na ficha do case. */
    access?: string;
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
        slug: 'infraestrutura-bi',
        aliases: ['bi-pagaa'],
        number: '01',
        title: 'A infraestrutura de BI de uma fintech PayFac, do zero',
        dek: 'Um pipeline diário que lê o adquirente, limpa o histórico e entrega três bases prontas antes do expediente.',
        company: 'Virtù Pagamentos',
        period: 'Desde 2025',
        role: 'Desenho e implementação, de ponta a ponta',
        stack: ['Python', 'SQL', 'PostgreSQL (Supabase)', 'API do adquirente', 'Google Sheets'],
        context:
            'A operação dependia de uploads manuais de planilhas de cada adquirente e de relatórios de comissão montados à mão. Cada base tinha o seu formato, e a base histórica acumulava duplicidades e clientes ligados ao CNPJ errado.',
        problem:
            'Ter todo dia, sem intervenção manual, uma leitura única e confiável das transações, das comissões e da saúde de cada cliente.',
        actions: [
            'Escrevi um pipeline em Python que lê a API do adquirente com paginação e controle de limite de requisições, com execução diária (D-1) e reprocessamento de janelas retroativas.',
            'Montei o data warehouse transacional como base só de acréscimo, deduplicada pelo identificador de cada transação.',
            'Gerei a base de comissões com os recebíveis futuros dos próximos 365 dias e o scorecard de clientes, recalculado do zero a cada execução.',
            'Apliquei regras de receita por método de pagamento (crédito, débito, PIX e boleto) a partir da base de taxas de cada cliente.',
            'Corrigi as inconsistências estruturais do histórico, como duplicidades e mapeamentos errados de cliente e CNPJ, antes de qualquer painel ler esses dados.',
        ],
        decisions: [
            {
                title: 'Só acrescentar, nunca sobrescrever',
                body: 'O data warehouse cresce por acréscimo e deduplica pelo identificador da transação. Assim dá para reprocessar os últimos sete dias quando o adquirente corrige algo, sem duplicar nada e sem mexer no resto do histórico.',
            },
            {
                title: 'Integridade antes de visualização',
                body: 'Um gráfico bonito sobre uma base com CNPJ trocado só espalha o erro mais rápido. A limpeza do histórico veio antes dos painéis, e as regras de mapeamento ficaram no pipeline, não em cada relatório.',
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
            { id: 'bi-tpv', caption: 'Leitura diária de TPV com média móvel de 7 dias. Dados ilustrativos.' },
        ],
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
        title: 'Reconciliação financeira e o motor de margem',
        dek: 'Vários adquirentes, um só número de receita, e uma fórmula de planilha que estava errada desde o início.',
        company: 'Virtù Pagamentos',
        period: '2025 e 2026',
        role: 'Investigação, desenho e implementação',
        stack: ['Python', 'SQL', 'TypeScript', 'Google Sheets'],
        context:
            'O P&L dependia de juntar os relatórios dos adquirentes com a base interna, num processamento manual diário. A margem por transação vinha de uma planilha com abas encadeadas, e os números de TPV mudavam depois de reportados.',
        problem:
            'Consolidar as fontes com validação automática, explicar por que o TPV mudava depois de fechado e garantir que a margem calculada fosse a margem que o adquirente de fato faturou.',
        actions: [
            'Automatizei a consolidação dos adquirentes com validação de integridade de schema e relatórios estruturados para a análise de P&L.',
            'Investiguei as discrepâncias de volume e encontrei chargebacks processados com data retroativa, que alteravam o TPV de dias já reportados.',
            'Recalibrei as métricas e ajustei o processo de reporting para refletir os dados corrigidos.',
            'Portei a regra de margem, que vivia em abas de planilha, para um motor de cálculo isolado e testável.',
            'Conferi o motor contra o relatório oficial do adquirente e corrigi a fórmula herdada da planilha, que divergia da conta real.',
        ],
        decisions: [
            {
                title: 'Conferir contra a fonte oficial, não contra a planilha',
                body: 'O motor batia com a planilha em todas as linhas testadas, e mesmo assim estava errado: a planilha aplicava um fator que o adquirente não aplica. Validar contra o relatório oficial trocou a fórmula por uma subtração simples, com 3.102 de 3.102 linhas sem divergência.',
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
        results: [
            { value: '3.102', label: 'de 3.102 linhas sem divergência' },
            { value: '0', label: 'processamento manual diário' },
            { value: '1', label: 'convenção de chargeback em todas as telas' },
        ],
        retro:
            'Eu teria validado contra o relatório oficial do adquirente desde a primeira versão do motor. Conferir contra a planilha dava a sensação de estar certo justamente porque repetia o mesmo erro.',
    },
    {
        slug: 'plataforma-interna',
        aliases: ['dash-pagaa'],
        number: '03',
        title: 'Da planilha ao sistema: a plataforma interna da Virtù',
        dek: 'Começou como a troca do Looker Studio por dashboards próprios. Em cinco meses, virou o sistema onde a empresa opera.',
        company: 'Virtù Pagamentos',
        period: 'Abr a set de 2026',
        role: 'Produto, design e desenvolvimento',
        stack: ['React', 'TypeScript', 'Tailwind', 'Recharts', 'Express', 'Supabase', 'Python', 'Vercel'],
        access: 'Sistema interno com acesso restrito. Código privado; telas mostradas de forma esquemática.',
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
            {
                title: 'Ler pelo rótulo, nunca pela posição',
                body: 'O importador de simuladores de taxa procura o cabeçalho certo em vez de uma coluna fixa, porque os layouts antigos guardavam outro valor na mesma posição e um erro ali passaria em silêncio.',
            },
        ],
        figures: [
            { id: 'platform-map', caption: 'Mapa da plataforma: as áreas do sistema e o que cada uma resolve.' },
            { id: 'cs-radar', caption: 'Radar de Customer Success: cada conta posicionada pelo atingimento das metas de TPV e de margem. Representação esquemática, sem dados reais.' },
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
