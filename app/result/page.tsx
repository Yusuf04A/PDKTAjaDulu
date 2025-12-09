"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { TopsisResult } from '@/utils/topsis';
import { MessageCircle, RefreshCcw } from 'lucide-react';

export default function ResultPage() {
    const [data, setData] = useState<TopsisResult | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem('lastResult');
        if (stored) {
            setData(JSON.parse(stored).result);
        }
    }, []);

    if (!data) return <div className="p-10 text-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-md mx-auto space-y-6">

                {/* Card Utama */}
                <div className="bg-white p-6 rounded-2xl shadow-sm text-center border border-gray-100">
                    <h2 className="text-gray-500 text-sm uppercase tracking-wider mb-2">Rekomendasi Sistem</h2>
                    <h1 className={`text-3xl font-bold mb-2 ${data.recommendation.includes('Tembak') ? 'text-green-600' :
                            data.recommendation.includes('Menjauh') ? 'text-red-600' : 'text-blue-600'
                        }`}>
                        {data.recommendation}
                    </h1>
                    <div className="text-4xl font-black text-gray-800 my-4">
                        {(data.score * 100).toFixed(0)}%
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        {data.description}
                    </p>
                </div>

                {/* Statistik Detail */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-800 mb-4">Analisis Detail (Skala 1-5)</h3>
                    <div className="space-y-3">
                        {Object.entries(data.categoryScores).map(([cat, val]) => (
                            <div key={cat} className="flex items-center justify-between text-sm">
                                <span className="text-gray-600 capitalize">{cat}</span>
                                <div className="flex items-center gap-3">
                                    <div className="w-24 bg-gray-200 rounded-full h-2">
                                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(val / 5) * 100}%` }}></div>
                                    </div>
                                    <span className="font-bold w-6">{val}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="grid gap-3">
                    <Link href="/chat" className="bg-indigo-600 text-white p-4 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-indigo-200">
                        <MessageCircle size={20} /> Tanya AI Langkah Selanjutnya
                    </Link>
                    <Link href="/test" className="bg-white border border-gray-300 text-gray-700 p-4 rounded-xl font-semibold flex items-center justify-center gap-2">
                        <RefreshCcw size={20} /> Tes Ulang
                    </Link>
                </div>

            </div>
        </div>
    );
}