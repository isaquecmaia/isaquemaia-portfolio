// Bandeiras simplificadas em SVG, desenhadas à mão para não depender de serviço externo.
export type FlagCode = 'br' | 'us' | 'es';

export function Flag({ code, className = '' }: { code: FlagCode; className?: string }) {
    const common = { viewBox: '0 0 30 20', className: `block h-5 w-[30px] shrink-0 ring-1 ring-ink/15 ${className}`, 'aria-hidden': true } as const;
    if (code === 'br') {
        return (
            <svg {...common}>
                <rect width="30" height="20" fill="#009C3B" />
                <path d="M15 2.5 27 10 15 17.5 3 10z" fill="#FFDF00" />
                <circle cx="15" cy="10" r="4.4" fill="#002776" />
                <path d="M10.8 9.2c2.9-.9 6-.6 8.6.9" stroke="#fff" strokeWidth="0.9" fill="none" />
            </svg>
        );
    }
    if (code === 'us') {
        return (
            <svg {...common}>
                <rect width="30" height="20" fill="#fff" />
                {[0, 2, 4, 6, 8, 10, 12].map((i) => (
                    <rect key={i} y={(i * 20) / 13} width="30" height={20 / 13} fill="#B22234" />
                ))}
                <rect width="13" height={(20 / 13) * 7} fill="#3C3B6E" />
                {[0, 1, 2].flatMap((r) => [0, 1, 2, 3].map((c) => <circle key={`${r}-${c}`} cx={2 + c * 3} cy={2 + r * 3.4} r="0.7" fill="#fff" />))}
            </svg>
        );
    }
    return (
        <svg {...common}>
            <rect width="30" height="20" fill="#AA151B" />
            <rect y="5" width="30" height="10" fill="#F1BF00" />
        </svg>
    );
}
