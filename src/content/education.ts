export const certificates = [
    {
        title: 'Data Analytics Basics',
        issuer: 'Mate Academy',
        date: 'out/2025',
        href: '/assets/certificates/data-analytics-basic-mate-academy.pdf',
    },
    {
        title: 'Análise de Dados',
        issuer: 'Product & Tech School · QuintoAndar',
        date: 'ago/2025',
        href: '/assets/certificates/analise-dados-quintoandar.png',
    },
];

export type Recommendation = {
    author: string;
    role: string;
    company: string;
    relation: string;
    date: string;
    link: string;
    /** Logo usado no selo da carta. */
    logo?: string;
    excerpt: string;
    full: string[];
};

// Cartas de recomendação. Para adicionar outra, basta incluir um item aqui.
export const recommendations: Recommendation[] = [
    {
        author: 'Vitor Nogueira',
        role: 'Team Leader, Efficiency Ops',
        company: 'QuintoAndar',
        relation: 'Supervisor direto',
        date: 'nov/2025',
        link: 'https://www.linkedin.com/in/vitor-nogueira-11a800199/',
        logo: '/assets/logos/quintoandar.webp',
        excerpt:
            'Isaque é um profissional exemplar, extremamente organizado, comprometido com prazos e com entregas sempre consistentes.',
        full: [
            'Demonstra grande interesse por inovação e criatividade, sendo uma pessoa naturalmente curiosa, o que o destaca entre os demais.',
            'Possui uma energia positiva contagiante e uma postura colaborativa admirável, sempre disposto a compartilhar conhecimentos e contribuir para o desenvolvimento do time.',
            'Suas principais skills incluem: comunicação clara e eficaz; flexibilidade diante de mudanças; abertura e compreensão frente a feedbacks construtivos; forte domínio de processos, documentação, qualidade, melhoria contínua e treinamentos.',
            'Em resumo, Isaque é um profissional completo, com mentalidade de crescimento e um espírito de equipe que faz a diferença em qualquer ambiente de trabalho.',
        ],
    },
];
