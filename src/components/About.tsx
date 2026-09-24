import { useI18n } from '../i18n';
import { Flag } from './Flag';
import { Reveal, Section } from './primitives';

export default function About() {
    const { t, c } = useI18n();
    const profile = c.profile;
    return (
        <Section
            id="sobre"
            aside={
                <p className="label m-0">
                    {t.about.aside[0]}
                    <br />
                    {t.about.aside[1]}
                </p>
            }
        >
            <Reveal>
                {profile.about.map((p) => (
                    <p key={p.slice(0, 20)} className="t-lead mt-0 mb-6 max-w-[46ch] last:mb-0">
                        {p}
                    </p>
                ))}
                <p className="label mt-10 mb-0">{t.about.languages}</p>
                <ul className="t-small m-0 mt-3 grid max-w-[46ch] list-none gap-3 border-t border-rule p-0 pt-4 sm:grid-cols-3">
                    {profile.languages.map((l) => (
                        <li key={l.name} className={`flex items-center gap-3 ${'learning' in l ? 'opacity-70' : ''}`}>
                            <Flag code={l.flag} />
                            <span>
                                <span className="block font-medium">{l.name}</span>
                                <span className="label block normal-case tracking-normal">{l.level}</span>
                            </span>
                        </li>
                    ))}
                </ul>
            </Reveal>
        </Section>
    );
}
