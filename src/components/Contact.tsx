import { profile } from '../content/profile';

export default function Contact() {
    const year = new Date().getFullYear();
    return (
        <footer id="contato" className="mt-(--section) bg-ink text-paper">
            <div className="wrap pt-(--section) pb-10">
                <div className="grid-ed">
                    <p className="num col-aside m-0 text-[13px] text-signal md:pt-[0.55em]">§ Contato</p>
                    <div className="col-main">
                        <p className="t-display m-0 mt-3 max-w-[16ch] md:mt-0">Se o seu time precisa confiar nos próprios números, vale uma conversa.</p>
                        <a
                            href={`mailto:${profile.email}`}
                            className="t-title mt-10 inline-block break-all underline decoration-paper/30 decoration-1 underline-offset-[8px] transition-colors duration-300 hover:decoration-paper md:mt-14"
                        >
                            {profile.email}
                        </a>
                    </div>
                </div>

                <div className="grid-ed t-small mt-(--head) gap-y-8 border-t border-paper/20 pt-6">
                    <ul className="col-aside m-0 list-none space-y-1.5 p-0">
                        <li>
                            <a className="text-paper/80 no-underline hover:text-paper" href={profile.linkedin} target="_blank" rel="noreferrer">
                                LinkedIn ↗
                            </a>
                        </li>
                        <li>
                            <a className="text-paper/80 no-underline hover:text-paper" href={profile.github} target="_blank" rel="noreferrer">
                                GitHub ↗
                            </a>
                        </li>
                        <li>
                            <a className="text-paper/80 no-underline hover:text-paper" href={profile.cv} download>
                                Currículo em PDF ↓
                            </a>
                        </li>
                    </ul>
                    <p className="m-0 text-paper/60 md:col-span-4">
                        {profile.fullName}
                        <br />
                        {profile.city}
                    </p>
                    <p className="m-0 text-paper/60 md:col-span-5 md:text-right">
                        Composto em Newsreader, Inter Tight e IBM Plex Mono.
                        <br />
                        Feito à mão em React · © {year}
                    </p>
                </div>
            </div>
        </footer>
    );
}
