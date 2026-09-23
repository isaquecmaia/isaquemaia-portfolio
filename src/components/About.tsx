import { profile } from '../content/profile';
import { Reveal, Section } from './primitives';

export default function About() {
    return (
        <Section
            id="sobre"
            aside={
                <p className="label m-0">
                    De Expertise a Virtù
                    <br />
                    2021 até hoje
                </p>
            }
        >
            <Reveal>
                {profile.about.map((p) => (
                    <p key={p.slice(0, 20)} className="t-lead mt-0 mb-6 max-w-[46ch] last:mb-0">
                        {p}
                    </p>
                ))}
                <dl className="t-small mt-10 grid max-w-[46ch] grid-cols-[104px_1fr] gap-y-3 border-t border-rule pt-4">
                    {profile.languages.map((l) => (
                        <div key={l.name} className="contents">
                            <dt className="label pt-[2px]">{l.name}</dt>
                            <dd className="m-0 capitalize">{l.level}</dd>
                        </div>
                    ))}
                </dl>
            </Reveal>
        </Section>
    );
}
