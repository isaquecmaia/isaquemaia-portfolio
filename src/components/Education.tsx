import { useI18n } from '../i18n';
import { Reveal, Section } from './primitives';

export default function Education() {
    const { t, c } = useI18n();
    const { degrees, certificates } = c;
    return (
        <Section id="formacao">
            <div className="grid gap-x-(--gutter) gap-y-12 sm:grid-cols-2">
                <Reveal>
                    <h3 className="label m-0 border-b border-ink pb-3 text-ink">{t.education.academic}</h3>
                    {degrees.map((d) => (
                        <div key={d.title} className="border-b border-rule py-4">
                            <p className="t-small m-0 font-medium">{d.title}</p>
                            <p className="t-small m-0 text-ink-soft">{d.school}</p>
                            <p className="t-caption mt-1.5 mb-0 text-muted">{d.status}</p>
                        </div>
                    ))}
                </Reveal>
                <Reveal delay={0.05}>
                    <h3 className="label m-0 border-b border-ink pb-3 text-ink">{t.education.certificates}</h3>
                    {certificates.map((c) => (
                        <a key={c.title} href={c.href} target="_blank" rel="noreferrer" className="group block border-b border-rule py-4 no-underline">
                            <p className="t-small m-0 flex justify-between gap-4 font-medium">
                                <span className="group-hover:underline group-hover:underline-offset-4">{c.title}</span>
                                <span className="num shrink-0 text-[13px] font-normal text-muted">{c.date}</span>
                            </p>
                            <p className="t-small m-0 text-ink-soft">{c.issuer}</p>
                            <p className="label mt-1.5 mb-0">{t.education.see} ↗</p>
                        </a>
                    ))}
                </Reveal>
            </div>
        </Section>
    );
}
