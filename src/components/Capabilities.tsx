import { capabilities } from '../content/capabilities';
import { Reveal, Section } from './primitives';

export default function Capabilities() {
    return (
        <Section id="ferramentas" number="03" title="Como trabalho">
            <p className="m-0 max-w-[60ch] text-[17px] text-ink-soft">
                Não dou nota para as minhas ferramentas. Em vez disso, cada uma aponta onde eu a usei.
            </p>
            <div className="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2">
                {capabilities.map((g, gi) => (
                    <Reveal key={g.title} delay={gi * 0.05}>
                        <h3 className="label m-0 border-b border-ink pb-2 !text-ink">{g.title}</h3>
                        <dl className="m-0">
                            {g.items.map((it) => (
                                <div key={it.name} className="grid grid-cols-[minmax(120px,42%)_1fr] gap-4 border-b border-rule py-2.5 text-[15px]">
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
