import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Masthead from './components/Masthead';
import Contact from './components/Contact';
import Home from './pages/Home';
import CaseStudy from './pages/CaseStudy';

// Ao trocar de rota, vai para a âncora pedida ou para o topo.
function ScrollManager() {
    const { pathname, hash } = useLocation();
    useEffect(() => {
        if (hash) {
            const el = document.querySelector(hash);
            if (el) {
                el.scrollIntoView();
                return;
            }
        }
        window.scrollTo(0, 0);
    }, [pathname, hash]);
    return null;
}

export default function App() {
    return (
        <>
            <ScrollManager />
            <Masthead />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cases/:slug" element={<CaseStudy />} />
                    <Route path="*" element={<Home />} />
                </Routes>
            </main>
            <Contact />
        </>
    );
}
