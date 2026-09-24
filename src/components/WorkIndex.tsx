import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { Spark } from '../charts/charts';
import { Reveal, Section } from './primitives';
import { readingMinutes } from '../content/sections';
import { useI18n } from '../i18n';
import { prefersReducedMotion } from './A11yPanel';

// Cada case tem uma cor de capa, um teaser e um print para a prévia.
const look = {
    'infraestrutura-bi': { spark: 'bars', shot: '/assets/work/plataforma-performance.webp' },
    'reconciliacao-financeira': { spark: 'gap', shot: '/assets/work/plataforma-weekly.webp' },
    'plataforma-interna': { spark: 'grid', shot: '/assets/work/plataforma-radar-cs.webp' },
} as const;

// Prévia que segue o cursor com um pequeno atraso (lerp), só com mouse.
function useFollow(active: boolean) {
    const el = useRef<HTMLDivElement>(null);
    const target = useRef({ x: 0, y: 0 });
    // A posição do mouse é sempre registrada; o laço de animação só roda com um case ativo.
    useEffect(() => {
        const move = (e: PointerEvent) => {
            target.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('pointermove', move, { passive: true });
        return () => window.removeEventListener('pointermove', move);
    }, []);
    useEffect(() => {
        if (!active) return;
        let { x, y } = target.current;
        let frame = 0;
        const loop = () => {
            x += (target.current.x - x) * 0.14;
            y += (target.current.y - y) * 0.14;
            if (el.current) el.current.style.transform = `translate3d(${x + 28}px, ${y - 110}px, 0)`;
            frame = requestAnimationFrame(loop);
        };
        frame = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(frame);
    }, [active]);
    return el;
}

export default function WorkIndex() {
    const { t, c: content, to } = useI18n();
    const cases = content.cases;
    const [hover, setHover] = useState<string | null>(null);
    const follow = useFollow(hover !== null);

    return (
        <Section
            id="trabalho"
            lead
            aside={
                <p className="t-small m-0 max-w-[30ch] text-ink-soft">
                    {t.work.aside}
                </p>
            }
        >
            {/* Lista editorial: todas as linhas têm a mesma estrutura e o mesmo comportamento (ver .case-row). */}
            <ol className="m-0 list-none border-t border-ink p-0" onPointerLeave={() => setHover(null)}>
                {cases.map((c, i) => {
                    const l = look[c.slug as keyof typeof look];
                    return (
                        <li key={c.slug} className="border-b border-ink/20">
                            <Reveal delay={i * 0.06}>
                                <Link
                                    to={to(`/cases/${c.slug}`)}
                                    className="case-row py-8 md:py-10 lg:py-12"
                                    style={{ '--case': c.color } as CSSProperties}
                                    onPointerEnter={(e) => e.pointerType === 'mouse' && !prefersReducedMotion() && setHover(c.slug)}
                                >
                                    <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-[minmax(0,1fr)_152px] sm:gap-x-(--gutter) lg:grid-cols-[minmax(0,1fr)_176px]">
                                        <div>
                                            <p className="num m-0 flex items-center gap-3 text-[13px]">
                                                <span className="case-number">{c.number}</span>
                                                <span aria-hidden className="case-mark block h-px w-8" />
                                                <span className="case-meta">
                                                    {c.company} · {c.period} · {readingMinutes(c)} {t.work.reading}
                                                </span>
                                            </p>
                                            <h3 className="case-title t-headline mt-4 mb-0">{c.title}</h3>
                                            <p className="case-dek t-body mt-4 mb-0 max-w-[50ch]">{c.dek}</p>
                                        </div>
                                        <div className="flex max-w-[168px] flex-col justify-between gap-5 sm:max-w-none sm:pt-7">
                                            <div className="case-spark">
                                                <Spark variant={l.spark} />
                                            </div>
                                            <p className="case-cta label m-0">
                                                {t.work.read} <span className="case-cta-arrow inline-block">→</span>
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </Reveal>
                        </li>
                    );
                })}
            </ol>

            <div ref={follow} aria-hidden className="case-preview" data-on={hover !== null}>
                <div className="case-preview-inner border border-paper/40 bg-ink p-2">
                    {cases.map((c) => (
                        <img
                            key={c.slug}
                            src={look[c.slug as keyof typeof look].shot}
                            alt=""
                            width={1440}
                            height={900}
                            className={`h-auto w-full ${hover === c.slug ? 'block' : 'hidden'}`}
                        />
                    ))}
                </div>
            </div>
        </Section>
    );
}
