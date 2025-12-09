"use client";
import { useState } from 'react';
import { Sparkles } from 'lucide-react';

export default function AnalysisPage() {
    const [text, setText] = useState('');
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const analyzeChat = () => {
        if (!text) return;
        setLoading(true);

        // Logika Analisis Sederhana (Rule-Based Regex)
        setTimeout(() => {
            const myChats = (text.match(/Anda:|Me:|Aku:/gi) || []).length;
            const theirChats = (text.match(/Dia:|Him:|Her:|Crush:/gi) || []).length; // Asumsi user memberi label
            const questions = (text.match(/\?/g) || []).length;
            const shortReplies = (text.match(/\b(y|ok|g|oh|wkwk)\b/gi) || []).length;

            // Fallback logic jika user copy paste polos tanpa label
            const words = text.split(/\s+/).length;
            let analysis = "";

            if (text.length < 50) {
                analysis = "Data terlalu sedikit. Coba copy percakapan yang lebih panjang.";
            } else if (shortReplies > 3) {
                analysis = "Terdeteksi banyak jawaban singkat (dry text). Indikasi effort rendah dari salah satu pihak.";
            } else if (questions > 2) {
                analysis = "Bagus! Ada komunikasi dua arah yang aktif bertanya (ping-pong percakapan).";
            } else {
                analysis = "Percakapan terlihat cukup mengalir, namun perhatikan siapa yang lebih sering memulai topik.";
            }

            setResult({
                wordCount: words,
                sentiment: analysis
            });
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-sm">
                <h1 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Sparkles className="text-purple-500" /> Analisis Pola Chat
                </h1>
                <p className="text-sm text-gray-500 mb-4">
                    Salin dan tempel chat history kalian di sini. AI akan melihat pola panjang pesan dan keaktifan.
                </p>

                <textarea
                    className="w-full h-40 border rounded-xl p-3 text-sm mb-4 focus:ring-2 focus:ring-purple-500 outline-none"
                    placeholder="Contoh:
Aku: Hai, lagi apa?
Dia: Lagi makan nih.
Aku: Makan apa tuh?
Dia: Nasi goreng."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />

                <button
                    onClick={analyzeChat}
                    disabled={loading}
                    className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 disabled:opacity-50"
                >
                    {loading ? "Menganalisis..." : "Analisis Sekarang"}
                </button>

                {result && (
                    <div className="mt-6 bg-purple-50 p-4 rounded-xl border border-purple-100">
                        <h3 className="font-bold text-purple-800 mb-2">Hasil Analisis:</h3>
                        <p className="text-gray-700 text-sm mb-2">{result.sentiment}</p>
                        <p className="text-xs text-gray-500">Total Kata: {result.wordCount}</p>
                    </div>
                )}
            </div>
        </div>
    );
}