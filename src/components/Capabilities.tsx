import { capabilities } from '../content/capabilities';
import { Reveal, Section } from './primitives';

export default function Capabilities() {
    return (
        <Section
            id="ferramentas"
            aside={
                <p className="t-small m-0 max-w-[30ch] text-ink-soft">
                    Não dou nota para as minhas ferramentas. Cada uma aponta onde foi usada.
                </p>
            }
        >
            <div className="grid gap-x-(--gutter) gap-y-12 sm:grid-cols-2">
                {capabilities.map((g, gi) => (
                    <Reveal key={g.title} delay={gi * 0.05}>
                        <h3 className="label m-0 border-b border-ink pb-3 text-ink">{g.title}</h3>
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
