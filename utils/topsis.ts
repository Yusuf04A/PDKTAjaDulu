import { questions } from './questions';

export type TopsisResult = {
    score: number; // Nilai Preferensi V (0.0 - 1.0)
    recommendation: string;
    description: string;
    categoryScores: Record<string, number>;
};

// Pemetaan 5 Alternatif Rekomendasi sesuai permintaan
const getRecommendation = (v: number) => {
    if (v >= 0.81)
        return {
            title: "Gas Pol",
            desc: "Semua tanda ngedukung. Nyambung, effort dua arah, dan momennya pas. Kalau ini masih kamu raguin, berarti kamu doang yang belum siap.",
        };
    if (v >= 0.61)
        return {
            title: "Aman Buat Diperjuangin",
            desc: "Chemistry ada, sinyalnya jelas, tinggal konsistensi. Bukan yang instan, tapi jelas bukan buang-buang waktu.",
        };
    if (v >= 0.41)
        return {
            title: "50:50 Tergantung Keberanian",
            desc: "Ada potensi, tapi juga ada banyak tanda tanya. Bisa lanjut kalau berani, bisa bubar kalau capek.",
        };
    if (v >= 0.21)
        return {
            title: "Jangan Terlalu Baper",
            desc: "Sinyalnya campur aduk dan effort-nya nggak seimbang. Kalau lanjut, siap-siap lebih capek dari senengnya.",
        };
    return {
        title: "No, Just No",
        desc: "Red flag-nya lebih rame dari sinyal positif. Ini bukan slow burn, ini salah jalur.",
    };
};

export function calculateTopsis(answers: Record<number, number>): TopsisResult {
    // 1. Matriks Keputusan & Normalisasi Terbobot
    // Karena skala konsisten 1-5, kita gunakan normalisasi Euclidean
    // Rumus: r_ij = x_ij / sqrt(sum(x_ij^2))
    // Dalam kasus single user, kita bandingkan dengan nilai Max(5) dan Min(1)
    
    let sumSquared = 0;
    let userSquared = 0;
    
    // Kita anggap kriteria adalah 25 pertanyaan
    questions.forEach((q) => {
        const score = answers[q.id] || 1;
        userSquared += Math.pow(score, 2);
    });

    // 2. Menentukan Solusi Ideal Positif (A+) dan Negatif (A-)
    // A+ = Skor 5 (Terbaik), A- = Skor 1 (Terburuk)
    let dPlusSquared = 0;
    let dMinusSquared = 0;

    const catSums: Record<string, number> = {};
    const catCounts: Record<string, number> = {};

    questions.forEach((q) => {
        const score = answers[q.id] || 1;

        // Jarak ke Ideal Positif (5)
        dPlusSquared += Math.pow(5 - score, 2);
        // Jarak ke Ideal Negatif (1)
        dMinusSquared += Math.pow(score - 1, 2);

        // Rekap untuk skor kategori di UI
        if (!catSums[q.category]) {
            catSums[q.category] = 0;
            catCounts[q.category] = 0;
        }
        catSums[q.category] += score;
        catCounts[q.category] += 1;
    });

    // 3. Menghitung Jarak Euclidean (D)
    const dPlus = Math.sqrt(dPlusSquared);
    const dMinus = Math.sqrt(dMinusSquared);

    // 4. Menghitung Nilai Preferensi (V)
    // Rumus: V = D- / (D- + D+)
    let preference = 0;
    if (dPlus + dMinus !== 0) {
        preference = dMinus / (dMinus + dPlus);
    }

    const rec = getRecommendation(preference);

    // Format skor kategori untuk grafik (Skala 1-5)
    const categoryScores: Record<string, number> = {};
    Object.keys(catSums).forEach(key => {
        categoryScores[key] = parseFloat((catSums[key] / catCounts[key]).toFixed(1));
    });

    return {
        score: parseFloat(preference.toFixed(3)),
        recommendation: rec.title,
        description: rec.desc,
        categoryScores
    };
}