import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Masthead from './components/Masthead';
import Contact from './components/Contact';
import Home from './pages/Home';
import CaseStudy from './pages/CaseStudy';
import { locales, stripLocale, useI18n } from './i18n';

// Ao trocar de página, vai para a âncora pedida ou para o topo.
// Trocar só o idioma mantém o leitor onde ele estava.
function ScrollManager() {
    const { pathname, hash } = useLocation();
    const page = stripLocale(pathname);
    useEffect(() => {
        if (hash) {
            const el = document.querySelector(hash);
            if (el) {
                el.scrollIntoView();
                return;
            }
        }
        window.scrollTo(0, 0);
    }, [page, hash]);
    return null;
}

// Idioma da página para leitores de tela, tradutores e buscadores.
function LocaleEffects() {
    const { lang, t } = useI18n();
    useEffect(() => {
        document.documentElement.lang = lang;
        document.title = t.siteTitle;
    }, [lang, t.siteTitle]);
    return null;
}

const prefixes = locales.filter((l) => l !== 'pt');

export default function App() {
    return (
        <>
            <ScrollManager />
            <LocaleEffects />
            <Masthead />
            <main id="conteudo" tabIndex={-1} className="outline-none">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cases/:slug" element={<CaseStudy />} />
                    {prefixes.map((l) => (
                        <Route key={l} path={`/${l}`}>
                            <Route index element={<Home />} />
                            <Route path="cases/:slug" element={<CaseStudy />} />
                        </Route>
                    ))}
                    <Route path="*" element={<Home />} />
                </Routes>
            </main>
            <Contact />
        </>
    );
}
