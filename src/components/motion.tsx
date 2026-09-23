import { useEffect, useRef, useState } from 'react';

const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

const fmt = new Intl.NumberFormat('pt-BR');

/**
 * Número que conta ao entrar na tela. Aceita texto com números no meio
 * ("3.102", "40 → 3", "D-1"): só os trechos numéricos animam, o resto fica parado.
 */
export function CountUp({ value, duration = 1400 }: { value: string; duration?: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    const parts = value.split(/(\d[\d.]*)/).filter(Boolean);
    const targets = parts.map((p) => (/^\d/.test(p) ? Number(p.replace(/\./g, '')) : null));
    const [t, setT] = useState(0);

    useEffect(() => {
        if (reduced()) {
            setT(1);
            return;
        }
        const el = ref.current;
        if (!el) return;
        let frame = 0;
        const io = new IntersectionObserver(
            ([e]) => {
                if (!e.isIntersecting) return;
                io.disconnect();
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
        <span ref={ref} aria-label={value}>
            {parts.map((p, i) => {
                const n = targets[i];
                if (n === null) return <span key={i} aria-hidden>{p}</span>;
                const shown = Math.round(n * t);
                return (
                    <span key={i} aria-hidden className="tabular-nums">
                        {p.includes('.') ? fmt.format(shown) : shown}
                    </span>
                );
            })}
        </span>
    );
}

// Faixa rolante de jornal financeiro. O conteúdo vai duplicado para o laço não ter emenda.
export function Ticker({ items }: { items: { text: string; color: string }[] }) {
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
        <div className="ticker">
            <div className="ticker-track">
                {row(false)}
                {row(true)}
            </div>
        </div>
    );
}
