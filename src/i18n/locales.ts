// Idiomas do site. Português é o padrão e mora na raiz; os outros ganham um prefixo na URL.
export const locales = ['pt', 'en', 'es', 'fr'] as const;
export type Locale = (typeof locales)[number];

export const localeMeta: Record<Locale, { label: string; name: string; html: string; og: string }> = {
    pt: { label: 'PT', name: 'Português', html: 'pt-BR', og: 'pt_BR' },
    en: { label: 'EN', name: 'English', html: 'en', og: 'en_US' },
    es: { label: 'ES', name: 'Español', html: 'es', og: 'es_ES' },
    fr: { label: 'FR', name: 'Français', html: 'fr', og: 'fr_FR' },
};

const prefixed = locales.filter((l) => l !== 'pt');

/** Idioma a partir do caminho: "/en/cases/x" vira "en"; sem prefixo, português. */
export function localeFromPath(pathname: string): Locale {
    const seg = pathname.split('/')[1] as Locale;
    return (prefixed as readonly string[]).includes(seg) ? seg : 'pt';
}

/** Caminho sem o prefixo de idioma: "/en/cases/x" vira "/cases/x". */
export function stripLocale(pathname: string) {
    const l = localeFromPath(pathname);
    if (l === 'pt') return pathname || '/';
    const rest = pathname.slice(l.length + 1);
    return rest || '/';
}

/** Monta o caminho no idioma pedido: ("/cases/x", "en") vira "/en/cases/x". */
export function withLocale(path: string, locale: Locale) {
    if (locale === 'pt') return path;
    return path === '/' ? `/${locale}` : `/${locale}${path.startsWith('/') ? path : `/${path}`}`;
}
