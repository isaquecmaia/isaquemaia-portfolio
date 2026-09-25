import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion as reduced } from './A11yPanel';


// Nome em máscara: cada letra sobe com um pequeno atraso em relação à anterior.
export function LetterReveal({ text, delay = 0, step = 0.035 }: { text: string; delay?: number; step?: number }) {
    return (
        <span className="mask-line" aria-label={text}>
            {[...text].map((ch, i) => (
                <span key={i} aria-hidden className="letter" style={{ animationDelay: `${delay + i * step}s` }}>
                    {ch === ' ' ? ' ' : ch}
                </span>
            ))}
        </span>
    );
}

/**
 * Número que conta ao entrar na tela. Aceita texto com números no meio
 * ("3.102", "40 → 3", "D-1"): só os trechos numéricos animam, o resto fica parado.
 * O valor final é o que o primeiro render já mostra, para leitores de tela,
 * buscadores e prévias de link. A contagem a partir de 0 é só visual.
 */
export function CountUp({ value, lang = 'pt-BR', duration = 1400 }: { value: string; lang?: string; duration?: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    const fmt = new Intl.NumberFormat(lang);
    // Separadores de milhar variam por idioma: ponto (pt, es), vírgula (en), espaço (fr).
    const parts = value.split(/(\d(?:[\d.,\s\u00a0\u202f]*\d)?)/).filter(Boolean);
    const targets = parts.map((p) => (/^\d/.test(p) ? Number(p.replace(/\D/g, '')) : null));
    const [t, setT] = useState(1);

    useEffect(() => {
        if (reduced()) return;
        const el = ref.current;
        if (!el) return;
        let frame = 0;
        const io = new IntersectionObserver(
            ([e]) => {
                if (!e.isIntersecting) return;
                io.disconnect();
                setT(0);
                const start = performance.now();
                const tick = (now: number) => {
                    const k = Math.min(1, (now - start) / duration);
                    setT(1 - Math.pow(1 - k, 3));
                    if (k < 1) frame = requestAnimationFrame(tick);
                };
                frame = requestAnimationFrame(tick);
            },
            { threshold: 0.4 },
        );
        io.observe(el);
        return () => {
            io.disconnect();
            cancelAnimationFrame(frame);
        };
    }, [duration]);

    return (
        <span ref={ref}>
            <span className="sr-only">{value}</span>
            {parts.map((p, i) => {
                const n = targets[i];
                if (n === null) return <span key={i} aria-hidden>{p}</span>;
                const shown = Math.round(n * t);
                return (
                    <span key={i} aria-hidden className="tabular-nums">
                        {/* No fim, o número volta a ser exatamente o texto escrito. */}
                        {shown === n ? p : /\D/.test(p) ? fmt.format(shown) : shown}
                    </span>
                );
            })}
        </span>
    );
}

// Faixa rolante de jornal financeiro. O conteúdo vai duplicado para o laço não ter emenda.
// Tem botão de pausa (WCAG 2.2.2) e para sozinha com o mouse em cima ou com foco dentro.
export function Ticker({ items, pauseLabel, playLabel }: { items: { text: string; color: string }[]; pauseLabel: string; playLabel: string }) {
    const [paused, setPaused] = useState(false);
    const row = (dup: boolean) => (
        <span aria-hidden={dup} className="inline-flex items-center">
            {items.map((it) => (
                <span key={it.text} className="inline-flex items-center gap-4 px-5">
                    <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: it.color }} />
                    <span>{it.text}</span>
                </span>
            ))}
        </span>
    );
    return (
        <div className="flex items-center">
            <div className="ticker min-w-0 flex-1" data-paused={paused}>
                <div className="ticker-track">
                    {row(false)}
                    {row(true)}
                </div>
            </div>
            <button
                type="button"
                onClick={() => setPaused((v) => !v)}
                aria-pressed={paused}
                aria-label={paused ? playLabel : pauseLabel}
                title={paused ? playLabel : pauseLabel}
                className="mx-3 inline-grid h-7 w-7 shrink-0 cursor-pointer place-items-center border border-paper/40 text-paper transition-colors hover:bg-paper hover:text-ink"
            >
                <span aria-hidden>{paused ? '▶' : 'Ⅱ'}</span>
            </button>
        </div>
    );
}
