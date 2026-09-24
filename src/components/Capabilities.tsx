import { useI18n } from '../i18n';
import { Reveal, Section } from './primitives';

// Um tom por grupo, tirado da paleta de capítulos.
const tones = ['var(--color-signal)', 'var(--color-cobalt)', 'var(--color-bottle)', 'var(--color-mustard)'];

export default function Capabilities() {
    const { t, c } = useI18n();
    const capabilities = c.capabilities;
    return (
        <Section
            id="ferramentas"
            aside={
                <p className="t-small m-0 max-w-[30ch] text-ink-soft">
                    {t.capabilities.aside}
                </p>
            }
        >
            <div className="grid gap-x-(--gutter) gap-y-12 sm:grid-cols-2">
                {capabilities.map((g, gi) => (
                    <Reveal key={g.title} delay={gi * 0.05}>
                        <h3 className="label m-0 flex items-center gap-2.5 pb-3 text-ink" style={{ borderBottom: `2px solid ${tones[gi % tones.length]}` }}>
                            <span aria-hidden className="inline-block h-2.5 w-2.5" style={{ background: tones[gi % tones.length] }} />
                            {g.title}
                        </h3>
                        <dl className="m-0">
                            {g.items.map((it) => (
                                <div key={it.name} className="t-small grid grid-cols-[minmax(116px,42%)_1fr] gap-4 border-b border-rule py-3">
                                    <dt className="font-medium">{it.name}</dt>
                                    <dd className="m-0 text-muted">{it.where}</dd>
                                </div>
                            ))}
                        </dl>
                    </Reveal>
                ))}
            </div>
        </Section>
    );
}
