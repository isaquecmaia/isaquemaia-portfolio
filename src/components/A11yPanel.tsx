import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../i18n';

// Preferências de leitura: gravadas no navegador e aplicadas como atributos no <html>
// (ver os seletores :root[data-*] em index.css e o script inline em index.html).
export type A11yPrefs = { text: 0 | 1 | 2; contrast: boolean; motion: boolean; links: boolean };

const KEY = 'a11y-prefs';
const DEFAULTS: A11yPrefs = { text: 0, contrast: false, motion: false, links: false };

export function readPrefs(): A11yPrefs {
    try {
        return { ...DEFAULTS, ...JSON.parse(localStorage.getItem(KEY) ?? '{}') };
    } catch {
        return DEFAULTS;
    }
}

export function applyPrefs(p: A11yPrefs) {
    const root = document.documentElement;
    root.dataset.text = String(p.text);
    root.dataset.contrast = p.contrast ? 'high' : '';
    root.dataset.motion = p.motion ? 'reduce' : '';
    root.dataset.links = p.links ? 'underline' : '';
}

/** Movimento reduzido: pedido no sistema ou no painel. */
export const prefersReducedMotion = () =>
    typeof window !== 'undefined' && (window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.dataset.motion === 'reduce');

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
    return (
        <label className="flex cursor-pointer items-center justify-between gap-4 border-b border-rule py-3">
            <span className="t-small">{label}</span>
            <span className="relative inline-flex h-6 w-11 shrink-0 items-center">
                <input type="checkbox" role="switch" checked={checked} onChange={(e) => onChange(e.target.checked)} className="peer sr-only" />
                <span className="absolute inset-0 border border-ink bg-paper transition-colors peer-checked:bg-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-signal" />
                <span className="relative ml-1 h-4 w-4 bg-ink transition-transform peer-checked:translate-x-5 peer-checked:bg-paper" />
            </span>
        </label>
    );
}

export default function A11yPanel({ onClose }: { onClose: () => void }) {
    const { t } = useI18n();
    const [prefs, setPrefs] = useState(readPrefs);
    const panel = useRef<HTMLDivElement>(null);

    useEffect(() => {
        applyPrefs(prefs);
        try {
            localStorage.setItem(KEY, JSON.stringify(prefs));
        } catch {
            /* navegação privada: as preferências valem só nesta visita */
        }
    }, [prefs]);

    useEffect(() => {
        const previous = document.activeElement as HTMLElement | null;
        panel.current?.querySelector<HTMLElement>('button, input')?.focus();
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
        const onClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (panel.current && !panel.current.contains(target) && !target.closest('[data-a11y-toggle]')) onClose();
        };
        document.addEventListener('keydown', onKey);
        document.addEventListener('mousedown', onClick);
        return () => {
            document.removeEventListener('keydown', onKey);
            document.removeEventListener('mousedown', onClick);
            previous?.focus();
        };
    }, [onClose]);

    const set = <K extends keyof A11yPrefs>(k: K, v: A11yPrefs[K]) => setPrefs((p) => ({ ...p, [k]: v }));

    return (
        <div
            ref={panel}
            role="dialog"
            aria-label={t.a11y.title}
            className="index-overlay absolute top-[calc(100%+8px)] right-(--gutter) z-50 w-[min(340px,calc(100vw-2*var(--gutter)))] border border-ink bg-paper p-5 text-ink shadow-[6px_6px_0_var(--color-ink)]"
        >
            <p className="label m-0 text-ink">{t.a11y.title}</p>

            <fieldset className="m-0 mt-4 border-0 border-b border-rule p-0 pb-4">
                <legend className="t-small mb-3 p-0">{t.a11y.text}</legend>
                <div className="grid grid-cols-3 gap-2">
                    {t.a11y.sizes.map((label, i) => (
                        <button
                            key={label}
                            type="button"
                            aria-pressed={prefs.text === i}
                            onClick={() => set('text', i as A11yPrefs['text'])}
                            className={`cursor-pointer border border-ink py-2 font-serif transition-colors ${prefs.text === i ? 'bg-ink text-paper' : 'hover:bg-paper-deep'}`}
                            style={{ fontSize: 14 + i * 3 }}
                        >
                            <span aria-hidden>A</span>
                            <span className="sr-only">{label}</span>
                        </button>
                    ))}
                </div>
            </fieldset>

            <Toggle label={t.a11y.contrast} checked={prefs.contrast} onChange={(v) => set('contrast', v)} />
            <Toggle label={t.a11y.motion} checked={prefs.motion} onChange={(v) => set('motion', v)} />
            <Toggle label={t.a11y.links} checked={prefs.links} onChange={(v) => set('links', v)} />

            <button type="button" onClick={() => setPrefs(DEFAULTS)} className="label link mt-4 cursor-pointer text-ink">
                {t.a11y.reset}
            </button>
            <p className="t-caption mt-3 mb-0 text-muted">{t.a11y.note}</p>
        </div>
    );
}
