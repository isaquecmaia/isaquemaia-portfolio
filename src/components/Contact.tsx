import { useEffect, useState } from 'react';
import { profile } from '../content/profile';

const horaBH = () =>
    new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Sao_Paulo' }).format(new Date());

// Horário local ao vivo: quem escreve sabe se é horário comercial aqui.
function LocalTime() {
    const [hora, setHora] = useState(horaBH);
    useEffect(() => {
        const t = setInterval(() => setHora(horaBH()), 30_000);
        return () => clearInterval(t);
    }, []);
    return <span className="num">{hora}</span>;
}

function CopyEmail() {
    const [copiado, setCopiado] = useState(false);
    useEffect(() => {
        if (!copiado) return;
        const t = setTimeout(() => setCopiado(false), 2200);
        return () => clearTimeout(t);
    }, [copiado]);
    const copiar = async () => {
        try {
            await navigator.clipboard.writeText(profile.email);
            setCopiado(true);
        } catch {
            window.location.href = `mailto:${profile.email}`;
        }
    };
    return (
        <button type="button" onClick={copiar} className="label cursor-pointer text-paper/70 transition-colors hover:text-paper">
            <span aria-live="polite">{copiado ? 'E-mail copiado ✓' : 'Copiar e-mail'}</span>
        </button>
    );
}

export default function Contact() {
    const year = new Date().getFullYear();
    return (
        <footer id="contato" data-section="§ Contato" className="mt-(--section) bg-ink text-paper">
            <div className="wrap pt-(--section) pb-10">
                <div className="grid-ed">
                    <p className="num col-aside m-0 flex items-center gap-3 self-start text-[13px] md:pt-[0.45em]"><span className="inline-grid h-9 w-9 place-items-center bg-signal text-paper">§</span> Contato</p>
                    <div className="col-main">
                        <p className="t-display m-0 mt-3 max-w-[16ch] md:mt-0">Se o seu time precisa <span className="text-mustard">confiar nos próprios números</span>, vale uma conversa.</p>
                        <a
                            href={`mailto:${profile.email}`}
                            className="t-title mt-10 inline-block break-all underline decoration-paper/30 decoration-1 underline-offset-[8px] transition-colors duration-300 hover:decoration-paper md:mt-14"
                        >
                            {profile.email}
                        </a>
                        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
                            <CopyEmail />
                            <p className="label m-0 text-paper/50">
                                Agora em Belo Horizonte: <LocalTime />
                            </p>
                        </div>
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
