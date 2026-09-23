import { certificates, degrees } from '../content/education';
import { Reveal, Section } from './primitives';

export default function Education() {
    return (
        <Section id="formacao" number="05" title="Formação">
            <div className="grid gap-12 sm:grid-cols-2">
                <Reveal>
                    <h3 className="label m-0 border-b border-ink pb-2 !text-ink">Acadêmica</h3>
                    {degrees.map((d) => (
                        <div key={d.title} className="border-b border-rule py-4">
                            <p className="m-0 font-medium">{d.title}</p>
                            <p className="m-0 text-[15px] text-ink-soft">{d.school}</p>
                            <p className="m-0 mt-1 text-[13px] text-muted">{d.status}</p>
                        </div>
                    ))}
                </Reveal>
                <Reveal delay={0.05}>
                    <h3 className="label m-0 border-b border-ink pb-2 !text-ink">Certificados</h3>
                    {certificates.map((c) => (
                        <a key={c.title} href={c.href} target="_blank" rel="noreferrer" className="group block border-b border-rule py-4 no-underline">
                            <p className="m-0 flex justify-between gap-4 font-medium">
                                <span className="group-hover:underline group-hover:underline-offset-4">{c.title}</span>
                                <span className="num shrink-0 text-[13px] font-normal text-muted">{c.date}</span>
                            </p>
                            <p className="m-0 text-[15px] text-ink-soft">{c.issuer}</p>
                            <p className="label m-0 mt-1">Ver certificado ↗</p>
                        </a>
                    ))}
                </Reveal>
            </div>
        </Section>
    );
}
