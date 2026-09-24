import { useLocation } from 'react-router-dom';
import { getContent } from './content';
import { localeFromPath, localeMeta, withLocale } from './locales';
import { ui } from './ui';

export * from './locales';
export type { Content, FigureText } from './content';
export type { UI as UIText } from './ui';

// Idioma atual (tirado da URL), textos da interface, conteúdo traduzido e um helper de caminhos.
export function useI18n() {
    const { pathname } = useLocation();
    const locale = localeFromPath(pathname);
    return {
        locale,
        lang: localeMeta[locale].html,
        t: ui[locale],
        c: getContent(locale),
        to: (path: string) => withLocale(path, locale),
    };
}
