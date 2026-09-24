import type { CaseStudy } from './cases';

// Seções da home, na ordem da página. O header, o índice e cada <Section> leem daqui.
// `color` é a cor do capítulo: número, fio e detalhes da seção.
export const sections = [
    { id: 'trabalho', number: '01', title: 'Trabalho selecionado', color: 'var(--color-signal)' },
    { id: 'experiencia', number: '02', title: 'Experiência', color: 'var(--color-cobalt)' },
    { id: 'ferramentas', number: '03', title: 'Como trabalho', color: 'var(--color-bottle)' },
    { id: 'sobre', number: '04', title: 'Sobre', color: 'var(--color-mustard)' },
    { id: 'correspondencias', number: '05', title: 'Correspondências', color: 'var(--color-cobalt)' },
    { id: 'formacao', number: '06', title: 'Formação', color: 'var(--color-bottle)' },
] as const;

export type SectionId = (typeof sections)[number]['id'];

export const sectionMeta = (id: SectionId) => sections.find((s) => s.id === id)!;

// Leitura de um case a 200 palavras por minuto, arredondada para cima.
const words = (s: string) => s.split(/\s+/).filter(Boolean).length;
export function readingMinutes(c: CaseStudy) {
    const text = [
        c.title,
        c.dek,
        c.context,
        c.problem,
        c.choice ?? '',
        c.outcome ?? '',
        c.retro,
        ...c.actions,
        ...c.decisions.flatMap((d) => [d.title, d.body]),
        ...c.figures.map((f) => f.caption),
    ].join(' ');
    return Math.max(1, Math.ceil(words(text) / 200));
}
