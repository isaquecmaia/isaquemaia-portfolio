// Séries ilustrativas determinísticas: mesmo formato a cada render, nenhum dado real.
function rng(seed: number) {
    let s = seed;
    return () => {
        s = (s * 16807) % 2147483647;
        return (s - 1) / 2147483646;
    };
}

export function dailyTpv(days = 60, seed = 7) {
    const r = rng(seed);
    const out: number[] = [];
    for (let i = 0; i < days; i++) {
        const trend = 48 + i * 0.45;
        const weekday = i % 7 === 5 || i % 7 === 6 ? -14 : 0; // fim de semana mais fraco
        out.push(Math.max(8, trend + weekday + (r() - 0.5) * 22));
    }
    return out;
}

export function movingAverage(xs: number[], w = 7) {
    return xs.map((_, i) => {
        const slice = xs.slice(Math.max(0, i - w + 1), i + 1);
        return slice.reduce((a, b) => a + b, 0) / slice.length;
    });
}

// TPV reportado no fechamento vs. ajustado depois dos chargebacks retroativos.
export function reportedVsAdjusted(days = 30, seed = 11) {
    const r = rng(seed);
    const reported: number[] = [];
    const adjusted: number[] = [];
    for (let i = 0; i < days; i++) {
        const v = 60 + Math.sin(i / 3) * 8 + (r() - 0.5) * 10;
        reported.push(v);
        const hit = r() < 0.28 ? 4 + r() * 9 : r() * 1.5;
        adjusted.push(v - hit);
    }
    return { reported, adjusted };
}
