import { useI18n } from '../i18n';
import { MetaList, Reveal } from './primitives';
import { CountUp, LetterReveal, Ticker } from './motion';

// Cores dos marcadores do ticker, na ordem dos temas.
const tickerColors = ['var(--color-signal)', 'var(--color-mustard)', 'var(--color-bottle)', 'var(--color-cobalt)'];

export default function Opening() {
    const { t, c, lang: lang } = useI18n();
    const profile = c.profile;
    const ticker = c.ticker.map((text, i) => ({ text, color: tickerColors[i % tickerColors.length] }));
    return (
        <>
            <section data-section="" className="wrap pt-[calc(var(--header-h)+28px)] md:pt-[calc(var(--header-h)+44px)]">
                <Reveal now className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b-2 border-ink pb-3">
                    <p className="label m-0 flex items-center gap-2 text-ink">
                        <span aria-hidden className="inline-block h-2 w-2 bg-signal" />
                        {profile.role}
                    </p>
                    <p className="label m-0">
                        {profile.city} · {t.opening.edition}
                    </p>
                </Reveal>

                <h1 className="m-0 mt-6 font-serif text-[clamp(52px,16.6vw,236px)] leading-[0.86] font-normal tracking-[-0.05em] whitespace-nowrap md:mt-9">
                    <LetterReveal text={profile.name} delay={0.1} />
                </h1>

                {/* Tese, ficha e foto seguem as mesmas colunas da faixa de números abaixo. */}
                <div className="grid-ed mt-10 gap-y-12 border-t border-rule pt-7 md:mt-14 md:pt-9">
                    <Reveal now delay={0.55} className="md:col-span-7 md:row-span-2 lg:col-span-6 lg:row-span-1">
                        <p className="t-lead m-0 max-w-[30ch] text-[clamp(24px,2.3vw,31px)] leading-[1.24]">{profile.thesis}</p>
                        <div className="mt-8 flex flex-wrap gap-3 text-[15px]">
                            <a href="#trabalho" className="bg-ink px-5 py-3 text-paper no-underline transition-colors duration-300 hover:bg-signal">
                                {t.opening.seeCases} ↓
                            </a>
                            <a href={`mailto:${profile.email}`} className="border border-ink px-5 py-3 no-underline transition-colors duration-300 hover:border-cobalt hover:bg-cobalt hover:text-paper">
                                {t.opening.talk}
                            </a>
                        </div>
                    </Reveal>
                    <Reveal now delay={0.65} className="md:col-span-5 lg:col-span-3">
                        <MetaList items={profile.facts} />
                    </Reveal>
                    <Reveal now delay={0.75} className="md:col-span-3 lg:col-span-3">
                        {/* Foto como capa de revista: blocos de cor atrás do retrato. */}
                        <figure className="m-0 max-w-[176px] md:max-w-none">
                            {/* Os blocos ficam presos à imagem, não à legenda. */}
                            <div className="cover mr-4">
                                <span aria-hidden className="cover-block -right-4 -bottom-4 h-[70%] w-[70%] bg-cobalt" style={{ animationDelay: '0.9s' }} />
                                <span aria-hidden className="cover-block -top-3 -left-3 h-10 w-10 rounded-full bg-mustard" style={{ animationDelay: '1.05s' }} />
                                <img
                                    src={profile.photo}
                                    alt={`${t.opening.portrait} ${profile.fullName}`}
                                    width={280}
                                    height={280}
                                    className="block aspect-square w-full object-cover"
                                />
                            </div>
                            <figcaption className="label mt-7">{profile.fullName}</figcaption>
                        </figure>
                    </Reveal>
                </div>
            </section>

            {/* Faixa de indicadores: os números reais contam ao entrar na tela. */}
            <section aria-label={t.opening.numbers} data-section={t.opening.numbers} className="mt-[calc(var(--section)*0.6)] bg-signal text-paper">
                <div className="wrap pt-10 pb-12 md:pt-12 md:pb-14 lg:pt-14 lg:pb-16">
                    <p className="label m-0 text-paper/90">
                        {t.opening.numbers} · {t.opening.numbersPeriod}
                    </p>
                    <div className="mt-6 grid grid-cols-2 gap-x-(--gutter) gap-y-10 md:mt-8 lg:grid-cols-12">
                        {profile.kpis.map((k, i) => (
                            <Reveal key={k.label} delay={i * 0.08} className="border-t border-paper/35 pt-4 lg:col-span-3">
                                <p className="m-0 font-serif text-[clamp(38px,4.2vw,60px)] leading-[0.95] tracking-[-0.035em] whitespace-nowrap">
                                    <CountUp value={k.value} lang={lang} />
                                </p>
                                <p className="t-small mt-4 mb-0 font-medium">{k.label}</p>
                                <p className="t-caption mt-1.5 mb-0 max-w-[32ch] text-paper/90">{k.note}</p>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <div className="label bg-ink py-4 text-[13px] text-paper">
                <Ticker items={ticker} pauseLabel={t.tickerPause} playLabel={t.tickerPlay} />
            </div>
        </>
    );
}
