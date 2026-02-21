import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight, Play, Volume2, VolumeX } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

const Projects = () => {
    const projects = [
        {
            title: "Dash Pagaa",
            category: "Dashboard Analítico",
            description: "Dashboard financeiro completo para análise de performance comercial, com gráficos interativos, processamento de dados Excel e monitoramento de KPIs em tempo real.",
            tech: ["React", "TypeScript", "Tailwind", "Supabase", "Recharts"],
            github: "https://github.com/isaquecmaia/dash-pagaa",
            demo: "https://dash-pagaa.vercel.app",
            video: "/assets/videos/dash-pagaa-demo.mp4",
        },
        {
            title: "Portfólio Digital",
            category: "Aplicação Web",
            description: "Meu portfólio pessoal desenvolvido com foco em design moderno, dark mode, animações interativas e experiência do usuário. Construído para showcasear projetos e habilidades na área de dados.",
            tech: ["React", "TypeScript", "Tailwind CSS", "Three.js", "GSAP"],
            github: "https://github.com/isaquecmaia/portfolio",
            demo: "#",
            thumbnail: "/assets/images/portfolio-preview.png",
        }
    ];

    return (
        <section className="py-20 bg-[#111111] text-[#BDBDBD]" id="projetos">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center"
                >
                    <span className="text-[#FF6B35] font-semibold tracking-[3px] text-[13px] uppercase font-body">Trabalhos Selecionados</span>
                    <h2 className="text-4xl md:text-5xl font-bold font-heading mt-2 text-[#F5F5F5]">Projetos</h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.6 }}
                            className="group relative bg-[#141414] rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,107,53,0.3)] transition-all duration-400"
                        >
                            {/* Video / Thumbnail */}
                            {'video' in project && project.video ? (
                                <VideoThumbnail video={project.video} />
                            ) : (
                                <ImageThumbnail
                                    src={project.thumbnail}
                                    title={project.title}
                                    github={project.github}
                                    demo={project.demo}
                                />
                            )}

                            <div className="p-8">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <span className="text-[#FF6B35] text-[12px] font-bold uppercase tracking-[2px]">{project.category}</span>
                                        <h3 className="text-2xl font-bold font-heading text-[#F5F5F5] mt-1 group-hover:text-[#FF6B35] transition-colors">{project.title}</h3>
                                    </div>
                                    <ArrowUpRight className="text-[#757575] group-hover:text-[#FF6B35] group-hover:rotate-45 transition-all duration-400" />
                                </div>

                                <p className="text-[#BDBDBD] leading-relaxed mb-6">{project.description}</p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tech.map((t, i) => (
                                        <span key={i} className="px-3 py-1.5 bg-transparent text-[#BDBDBD] text-[13px] rounded-md border border-[rgba(255,255,255,0.18)] hover:bg-[#FF6B35] hover:text-white hover:border-[#FF6B35] hover:scale-105 transition-all duration-250 cursor-default">
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex gap-3">
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm text-[#BDBDBD] hover:text-[#FF6B35] transition-colors"
                                    >
                                        <Github size={16} />
                                        {project.video ? 'Ver no GitHub' : 'Ver Código'}
                                    </a>
                                    {project.demo && project.demo !== '#' && (
                                        <a
                                            href={project.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-sm text-[#BDBDBD] hover:text-[#FF6B35] transition-colors"
                                        >
                                            <ExternalLink size={16} />
                                            Demo
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ─── Video Thumbnail with autoplay ───
function VideoThumbnail({ video }: { video: string }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);

    useEffect(() => {
        if (!containerRef.current || !videoRef.current) return;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    videoRef.current?.play().then(() => setIsPlaying(true)).catch(() => { });
                } else {
                    videoRef.current?.pause();
                    setIsPlaying(false);
                }
            },
            { threshold: 0.4 }
        );
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(!isMuted);
        }
    };

    const handlePlay = () => {
        videoRef.current?.play().then(() => setIsPlaying(true)).catch(() => { });
    };

    return (
        <div ref={containerRef} className="relative h-64 w-full overflow-hidden rounded-t-2xl bg-[#0A0A0A]">
            <video
                ref={videoRef}
                src={video}
                muted
                loop
                playsInline
                preload="none"
                className="w-full h-full object-cover"
            />

            {/* Play overlay (shows when paused) */}
            {!isPlaying && (
                <button
                    onClick={handlePlay}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity"
                    aria-label="Play video"
                >
                    <div className="w-14 h-14 rounded-full bg-[rgba(255,107,53,0.9)] flex items-center justify-center shadow-[0_0_24px_rgba(255,107,53,0.4)]">
                        <Play size={24} className="text-white ml-1" fill="white" />
                    </div>
                </button>
            )}

            {/* Mute/unmute button */}
            <button
                onClick={toggleMute}
                className="absolute bottom-3 right-3 p-2 rounded-full bg-[#0A0A0A]/60 backdrop-blur-md text-[#BDBDBD] hover:text-[#FF6B35] transition-colors z-10"
                aria-label={isMuted ? 'Ativar som' : 'Desativar som'}
            >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>

            <div className="absolute inset-0 shadow-[inset_0_-40px_40px_-20px_#141414] pointer-events-none" />
        </div>
    );
}

// ─── Image Thumbnail with fallback ───
function ImageThumbnail({ src, title, github, demo }: { src?: string; title: string; github: string; demo: string }) {
    const [imgError, setImgError] = useState(false);

    return (
        <div className="h-64 w-full relative overflow-hidden transition-transform duration-400 group-hover:scale-[1.03]"
            style={{ background: 'radial-gradient(ellipse at center, rgba(255,107,53,0.08) 0%, transparent 70%)' }}
        >
            {src && !imgError ? (
                <img
                    src={src}
                    alt={title}
                    className="w-full h-full object-cover"
                    onError={() => setImgError(true)}
                />
            ) : (
                /* Code mockup fallback */
                <div className="absolute inset-8 flex flex-col items-start justify-center gap-2">
                    {[80, 55, 70, 40, 65, 50].map((width, i) => (
                        <div
                            key={i}
                            className="h-[3px] rounded-full bg-[rgba(255,107,53,0.15)]"
                            style={{ width: `${width}%` }}
                        />
                    ))}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[32px] font-mono text-[rgba(255,107,53,0.12)] select-none">&lt;/&gt;</span>
                    </div>
                </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#141414]/80" />

            {/* Overlay action buttons */}
            <div className="absolute top-4 right-4 flex gap-2 opacity-100 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100 transition-opacity duration-300 transform translate-y-0 [@media(hover:hover)]:translate-y-2 [@media(hover:hover)]:group-hover:translate-y-0">
                <a href={github} target="_blank" rel="noopener noreferrer" className="p-2 bg-[#0A0A0A]/60 backdrop-blur-md rounded-full text-[#BDBDBD] hover:bg-[#FF6B35] hover:text-white transition-colors">
                    <Github size={20} />
                </a>
                {demo && demo !== '#' && (
                    <a href={demo} target="_blank" rel="noopener noreferrer" className="p-2 bg-[#0A0A0A]/60 backdrop-blur-md rounded-full text-[#BDBDBD] hover:bg-[#FF6B35] hover:text-white transition-colors">
                        <ExternalLink size={20} />
                    </a>
                )}
            </div>
        </div>
    );
}

export default Projects;
