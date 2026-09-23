import type { CaseStudy } from './cases';

// Seções da home, na ordem da página. O header, o índice e cada <Section> leem daqui.
export const sections = [
    { id: 'trabalho', number: '01', title: 'Trabalho selecionado' },
    { id: 'experiencia', number: '02', title: 'Experiência' },
    { id: 'ferramentas', number: '03', title: 'Como trabalho' },
    { id: 'sobre', number: '04', title: 'Sobre' },
    { id: 'correspondencias', number: '05', title: 'Correspondências' },
    { id: 'formacao', number: '06', title: 'Formação' },
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
        c.retro,
        ...c.actions,
        ...c.decisions.flatMap((d) => [d.title, d.body]),
        ...c.figures.map((f) => f.caption),
    ].join(' ');
    return Math.max(1, Math.ceil(words(text) / 200));
}
