// utils/topsis.ts

export type TopsisResult = {
    score: number; // 0.0 to 1.0
    recommendation: string;
    description: string;
    categoryScores: Record<string, number>; // Rata-rata per kategori
};

// 5 Alternatif Output (Berdasarkan Range Nilai Preferensi V)
const getRecommendation = (v: number) => {
    if (v <= 0.3)
        return {
            title: "Sebaiknya Menjauh",
            desc: "Skor sangat rendah. Indikator menunjukkan ketidaktertarikan yang kuat atau ketidakcocokan fatal.",
            color: "text-red-600",
        };
    if (v <= 0.45)
        return {
            title: "Tahan Dulu / Hati-hati",
            desc: "Situasi masih abu-abu atau ada hambatan besar (status hubungan, kesiapan). Jangan terlalu agresif.",
            color: "text-orange-500",
        };
    if (v <= 0.65)
        return {
            title: "Dekati Pelan-Pelan",
            desc: "Ada potensi, tapi belum stabil. Bangun kenyamanan lebih dalam lagi sebelum melangkah jauh.",
            color: "text-yellow-500",
        };
    if (v <= 0.85)
        return {
            title: "Tingkatkan Kedekatan",
            desc: "Lampu hijau! Respon positif dominan. Mulai tingkatkan intensitas atau ajak jalan lebih sering.",
            color: "text-blue-500",
        };
    return {
        title: "Siap Menyatakan Perasaan",
        desc: "Sangat ideal! Kecocokan tinggi, effort dua arah, dan hambatan minim. Saatnya 'Shoot' jika kamu siap.",
        color: "text-green-600",
    };
};

export function calculateTopsis(answers: Record<number, number>): TopsisResult {
    const totalQuestions = 25;

    // 1. Matriks Keputusan (X) - Diambil dari input User
    // Karena hanya 1 user yang dinilai, kita bandingkan dengan "Benchmark Ideal"
    // Jarak Ideal Positif (A+) = Semua nilai 5
    // Jarak Ideal Negatif (A-) = Semua nilai 1

    // Kita beri bobot (Weight) sederhana: Semua kriteria sama penting (bisa di-custom)
    // W = 1

    let dPlusSquared = 0;
    let dMinusSquared = 0;

    // Kategori Tracking
    const catSums: Record<string, number> = {};
    const catCounts: Record<string, number> = {};

    // Import questions untuk mapping kategori
    const { questions } = require('./questions');

    for (let i = 1; i <= totalQuestions; i++) {
        const score = answers[i] || 1; // Default 1 jika error
        const q = questions.find((q: any) => q.id === i);

        // Normalisasi (Sederhana untuk skala Likert tetap 1-5 dalam 1 alternatif)
        // Dalam TOPSIS single-alternative, kita ukur Euclidean Distance ke Max (5) dan Min (1)

        // Distance to Ideal Best (5)
        dPlusSquared += Math.pow(5 - score, 2);

        // Distance to Ideal Worst (1)
        dMinusSquared += Math.pow(score - 1, 2);

        // Hitung rata-rata per kategori untuk info user
        if (q) {
            if (!catSums[q.category]) { catSums[q.category] = 0; catCounts[q.category] = 0; }
            catSums[q.category] += score;
            catCounts[q.category] += 1;
        }
    }

    const dPlus = Math.sqrt(dPlusSquared);
    const dMinus = Math.sqrt(dMinusSquared);

    // Hitung Preferensi (V)
    // V = D- / (D- + D+)
    let preference = 0;
    if (dPlus + dMinus !== 0) {
        preference = dMinus / (dMinus + dPlus);
    }

    const rec = getRecommendation(preference);

    // Format Category Scores (1-5 scale avg)
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