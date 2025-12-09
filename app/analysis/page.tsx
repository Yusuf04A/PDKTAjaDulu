// app/analysis/page.tsx
"use client";
import { useState } from 'react';
// FIX: Menambahkan BarChart ke dalam import
import { Sparkles, Upload, Image as ImageIcon, Loader2, BarChart } from 'lucide-react';
import Tesseract from 'tesseract.js';

export default function AnalysisPage() {
    const [text, setText] = useState('');
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [ocrProgress, setOcrProgress] = useState(0);
    const [status, setStatus] = useState('');

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setStatus('processing_image');
        setLoading(true);
        setResult(null);
        setText('');

        try {
            const { data: { text } } = await Tesseract.recognize(
                file,
                'eng+ind',
                {
                    logger: (m) => {
                        if (m.status === 'recognizing text') {
                            setOcrProgress(Math.floor(m.progress * 100));
                        }
                    },
                }
            );

            setText(text);
            setStatus('idle');
            setLoading(false);
        } catch (err) {
            console.error(err);
            setStatus('error');
            setLoading(false);
            alert("Gagal membaca gambar. Coba gambar yang lebih jelas.");
        }
    };

    const analyzeChat = () => {
        if (!text) return;
        setStatus('analyzing_text');
        setLoading(true);

        setTimeout(() => {
            const wordCount = text.split(/\s+/).length;
            const questionMarks = (text.match(/\?/g) || []).length;
            const shortReplies = (text.match(/\b(y|g|oh|ok|wkwk|haha)\b/gi) || []).length;

            let sentiment = "";
            let score = 0;

            if (wordCount < 10) {
                sentiment = "Data terlalu sedikit untuk disimpulkan.";
            } else {
                if (questionMarks > 2) {
                    sentiment += "✅ Komunikasi dua arah cukup aktif. ";
                    score += 2;
                } else {
                    sentiment += "⚠️ Sedikit pertanyaan balik. ";
                }

                if (shortReplies > 3) {
                    sentiment += "⚠️ Terdeteksi banyak balasan singkat (dry text). ";
                    score -= 1;
                } else {
                    sentiment += "✅ Balasan cukup niat (panjang). ";
                    score += 2;
                }
            }

            setResult({
                wordCount,
                sentiment: sentiment || "Percakapan standar.",
                scoreLabel: score > 2 ? "Positif" : score < 0 ? "Kurang Antusias" : "Netral"
            });
            setLoading(false);
            setStatus('idle');
        }, 1500);
    };

    return (
        <div className="max-w-3xl mx-auto py-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
                    <Sparkles className="text-purple-500" /> Analisis Pola Chat
                </h1>
                <p className="text-gray-500">Upload screenshot chat atau paste teks manual.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Kolom Kiri: Input */}
                <div className="space-y-4">

                    <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:bg-gray-50 transition cursor-pointer relative group">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        {status === 'processing_image' ? (
                            <div className="flex flex-col items-center text-purple-600">
                                <Loader2 className="animate-spin mb-2" />
                                <span className="text-sm font-semibold">Membaca Gambar... {ocrProgress}%</span>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center text-gray-500 group-hover:text-purple-600 transition">
                                <ImageIcon size={32} className="mb-2" />
                                <span className="text-sm font-semibold">Upload Screenshot</span>
                                <span className="text-xs">Klik atau Drop gambar di sini</span>
                            </div>
                        )}
                    </div>

                    <div className="text-center text-xs text-gray-400 font-bold">- ATAU -</div>

                    <textarea
                        className="w-full h-40 border rounded-xl p-3 text-sm focus:ring-2 focus:ring-purple-500 outline-none resize-none font-mono"
                        placeholder="Hasil scan akan muncul di sini..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />

                    <button
                        onClick={analyzeChat}
                        disabled={loading || !text}
                        className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 disabled:opacity-50 transition shadow-lg shadow-purple-200"
                    >
                        {status === 'analyzing_text' ? "Sedang Menganalisis..." : "Mulai Analisis"}
                    </button>
                </div>

                {/* Kolom Kanan: Hasil */}
                <div className="h-full">
                    {result ? (
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-purple-100 h-full animate-in fade-in zoom-in duration-300">
                            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Hasil Deteksi</h3>

                            <div className="space-y-4">
                                <div className="bg-purple-50 p-4 rounded-xl text-center">
                                    <span className="text-xs text-purple-600 font-bold uppercase tracking-wider">Vibe Percakapan</span>
                                    <p className="text-2xl font-black text-purple-800 mt-1">{result.scoreLabel}</p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-xl">
                                    <span className="text-xs text-gray-400 uppercase font-bold">Detail</span>
                                    <p className="text-gray-700 mt-2 text-sm leading-relaxed">{result.sentiment}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                                        <span className="text-gray-400 text-xs block">Total Kata</span>
                                        <span className="font-bold text-lg">{result.wordCount}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-gray-50 border border-gray-200 p-6 rounded-2xl h-full flex flex-col items-center justify-center text-center text-gray-400 min-h-[300px]">
                            {/* FIX: BarChart sekarang sudah didefinisikan */}
                            <BarChart size={48} className="mb-4 opacity-20" />
                            <p>Hasil analisis akan muncul di sini.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}