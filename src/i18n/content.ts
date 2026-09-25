import { profile } from '../content/profile';
import { experience } from '../content/experience';
import { cases } from '../content/cases';
import { capabilities } from '../content/capabilities';
import { certificates, recommendations } from '../content/education';
import type { SectionId } from '../content/sections';
import type { Locale } from './locales';
import { en } from './content/en';
import { es } from './content/es';
import { fr } from './content/fr';

// Textos das figuras dos cases (diagramas e gráficos desenhados no site).
const figures = {
    biFlow: [
        { title: 'Fontes', nodes: ['API do adquirente', 'Base de taxas por cliente', 'Cadastro de clientes'] },
        { title: 'Pipeline D-1', nodes: ['Extração paginada', 'Deduplicação por transação', 'Receita por método'] },
        { title: 'Bases', nodes: ['DW transacional', 'Comissões e recebíveis', 'Scorecard de clientes'] },
        { title: 'Banco', nodes: ['PostgreSQL no Supabase', 'Publicação atômica', 'Permissões por perfil'] },
        { title: 'Consumo', nodes: ['Plataforma interna', 'Customer Success', 'FP&A e diretoria'], accent: true },
    ],
    reconFlow: [
        { title: 'Entrada', nodes: ['Relatórios dos adquirentes', 'Base interna'] },
        { title: 'Validação', nodes: ['Tipos e campos', 'Datas e moeda', 'Lote inválido → alerta'] },
        { title: 'Casamento', nodes: ['Chave exata', 'Aproximado, marcado', 'Transação a transação'] },
        { title: 'Divergências', nodes: ['Valor', 'Data', 'Status', 'Ausente'] },
        { title: 'Saída', nodes: ['P&L consolidado', 'TPV reportado + ajustado'], accent: true },
    ],
    platformMap: [
        { title: 'Performance', items: ['TPV, receita e margem', 'Leituras semanais e mensais', 'Forecast com metas'] },
        { title: 'Customer Success', items: ['Radar de risco', 'Alertas diários', 'Visão por cliente'], accent: true },
        { title: 'CRM', items: ['Esteira e ativação', 'Ficha do cliente', 'Parcerias e ações do dia'] },
        { title: 'Rituais', items: ['Weekly Review', 'Pipe Report', 'Ajustes da semana'] },
        { title: 'Financeiro', items: ['Comissões', 'Caixa e repasses', 'Motor de margem'] },
        { title: 'Dados', items: ['Transações', 'Glossário de métricas', 'Uploads atômicos'] },
    ],
    radar: {
        aria: 'Esquema do radar de Customer Success em quatro quadrantes',
        ok: 'OK',
        attention: 'ATENÇÃO',
        alert: 'ALERTA',
        xAxis: 'META DE TPV ATINGIDA →',
        yAxis: 'META DE MARGEM →',
        legend: [
            ['OK', 'Metas de TPV e de margem atingidas.'],
            ['Atenção', 'Uma das duas metas fora do alvo.'],
            ['Alerta', 'As duas abaixo do alvo: ação imediata.'],
            ['Silêncio', 'De 5 a 20 dias sem transação.'],
            ['Pré-churn', '21 dias ou mais sem transação.'],
        ] as [string, string][],
    },
    gap: { aria: 'Gráfico ilustrativo de TPV reportado contra ajustado', reported: 'TPV reportado no dia', adjusted: 'TPV ajustado', day: 'dia' },
    shots: {
        cs: 'Tela de Customer Success com o radar de risco e a tabela da carteira',
        acoes: 'Tela de Ações de hoje do CRM com a fila de tarefas por cliente',
        weekly: 'Dashboard semanal de receita e margem com a meta da semana',
        performance: 'Tela de Performance consolidada com TPV, receita, margem e taxa de aprovação',
    },
};

// Conteúdo base, em português. Os outros idiomas sobrepõem só os textos.
const pt = {
    profile,
    experience,
    cases,
    capabilities,
    certificates,
    recommendations,
    sectionTitles: {
        trabalho: 'Trabalho selecionado',
        experiencia: 'Experiência',
        ferramentas: 'Como trabalho',
        sobre: 'Sobre',
        correspondencias: 'Correspondências',
        formacao: 'Formação',
    } as Record<SectionId, string>,
    ticker: ['Pipeline D-1', 'Data warehouse', 'DRE da operação', 'Radar de Customer Success', 'Motor de margem', 'CRM próprio', 'Fluxo de caixa e recebíveis', 'Weekly Review', 'Automação com IA', 'Unit economics'],
    figures,
};

export type Content = typeof pt;
export type FigureText = Content['figures'];

// Sobreposição parcial: listas de objetos são casadas item a item; o resto substitui.
type DeepPartial<T> = T extends (infer U)[]
    ? U extends object
        ? DeepPartial<U>[]
        : T
    : T extends object
      ? { [K in keyof T]?: DeepPartial<T[K]> }
      : T;
export type ContentOverride = DeepPartial<Content>;

const isObject = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);

function merge<T>(base: T, over: unknown): T {
    if (over === undefined) return base;
    if (Array.isArray(base) && Array.isArray(over)) {
        // Listas de texto são trocadas inteiras; listas de objetos, casadas por posição.
        if (!base.some(isObject)) return over as T;
        return base.map((item, i) => merge(item, over[i])) as T;
    }
    if (isObject(base) && isObject(over)) {
        const out: Record<string, unknown> = { ...base };
        for (const k of Object.keys(over)) out[k] = merge((base as Record<string, unknown>)[k], over[k]);
        return out as T;
    }
    return over as T;
}

const overrides: Record<Exclude<Locale, 'pt'>, ContentOverride> = { en, es, fr };
const cache = new Map<Locale, Content>();

export function getContent(locale: Locale): Content {
    if (locale === 'pt') return pt;
    let c = cache.get(locale);
    if (!c) {
        c = merge(pt, overrides[locale]);
        cache.set(locale, c);
    }
    return c;
}
