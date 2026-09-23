import { profile } from '../content/profile';
import { container } from './primitives';

export default function Contact() {
    const year = new Date().getFullYear();
    return (
        <footer id="contato" className="mt-8 bg-ink text-paper">
            <section className={`${container} pt-20 pb-10 md:pt-28`}>
                <p className="label !text-paper/60">Contato</p>
                <p className="mt-4 mb-0 max-w-[22ch] font-serif text-[clamp(38px,6.4vw,92px)] leading-[0.98] tracking-[-0.035em]">
                    Se o seu time precisa confiar nos próprios números, vale uma conversa.
                </p>
                <a
                    href={`mailto:${profile.email}`}
                    className="mt-10 inline-block font-serif text-[clamp(22px,3.4vw,40px)] break-all underline decoration-paper/30 decoration-1 underline-offset-[8px] transition-colors hover:decoration-paper"
                >
                    {profile.email}
                </a>

                <div className="mt-16 grid gap-8 border-t border-paper/20 pt-6 text-[14px] sm:grid-cols-3">
                    <ul className="m-0 list-none space-y-1.5 p-0">
                        <li>
                            <a className="text-paper/80 hover:text-paper" href={profile.linkedin} target="_blank" rel="noreferrer">
                                LinkedIn ↗
                            </a>
                        </li>
                        <li>
                            <a className="text-paper/80 hover:text-paper" href={profile.github} target="_blank" rel="noreferrer">
                                GitHub ↗
                            </a>
                        </li>
                        <li>
                            <a className="text-paper/80 hover:text-paper" href={profile.cv} download>
                                Currículo em PDF ↓
                            </a>
                        </li>
                    </ul>
                    <p className="m-0 text-paper/60">
                        {profile.fullName}
                        <br />
                        {profile.city}
                    </p>
                    <p className="m-0 text-paper/60 sm:text-right">
                        Composto em Newsreader, Inter Tight e IBM Plex Mono.
                        <br />
                        Feito à mão em React · © {year}
                    </p>
                </div>
            </section>
        </footer>
    );
}
