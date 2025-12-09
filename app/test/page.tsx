// app/test/page.tsx
"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { questions } from '@/utils/questions';
import { calculateTopsis } from '@/utils/topsis';
import { ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';

export default function TestPage() {
    const router = useRouter();
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null; // Mencegah hydration error

    const currentQuestion = questions[currentIndex];
    const totalQuestions = questions.length;
    const progress = ((currentIndex + 1) / totalQuestions) * 100;

    // Ambil jawaban untuk soal saat ini (jika sudah pernah dijawab)
    const selectedScore = answers[currentQuestion.id];

    const handleSelect = (score: number) => {
        setAnswers(prev => ({ ...prev, [currentQuestion.id]: score }));
    };

    const handleNext = () => {
        // Validasi Ganda: Cek apakah jawaban untuk soal ini sudah ada
        if (answers[currentQuestion.id] === undefined) {
            alert("Isi dulu jawabannya dong, jangan dikosongin!");
            return;
        }

        if (currentIndex < totalQuestions - 1) {
            setCurrentIndex(prev => prev + 1);
            window.scrollTo(0, 0); // Scroll ke atas tiap ganti soal
        } else {
            finishTest();
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    const finishTest = () => {
        const result = calculateTopsis(answers);
        localStorage.setItem('lastResult', JSON.stringify({
            date: new Date().toISOString(),
            result: result
        }));
        router.push('/result');
    };

    return (
        <div className="max-w-xl mx-auto py-6 md:py-10">

            {/* Progress Bar */}
            <div className="mb-6 md:mb-8">
                <div className="flex justify-between text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">
                    <span>Pertanyaan {currentIndex + 1} / {totalQuestions}</span>
                    <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                        className="bg-gradient-to-r from-pink-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            {/* Card Soal */}
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-lg border border-gray-100 min-h-[400px] flex flex-col justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-extrabold rounded-full w-fit mb-4 uppercase tracking-wider">
                    {currentQuestion.category}
                </span>

                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 md:mb-8 leading-snug">
                    {currentQuestion.text}
                </h2>

                <div className="space-y-3">
                    {currentQuestion.options.map((opt) => {
                        const isSelected = selectedScore === opt.score;
                        return (
                            <button
                                key={opt.score}
                                onClick={() => handleSelect(opt.score)}
                                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group relative overflow-hidden ${isSelected
                                        ? 'border-pink-500 bg-pink-50 text-pink-700 font-bold shadow-md scale-[1.02]'
                                        : 'border-gray-100 bg-white text-gray-600 hover:border-pink-200 hover:bg-gray-50'
                                    }`}
                            >
                                <span className="relative z-10">{opt.text}</span>
                                {isSelected && <CheckCircle size={20} className="text-pink-500 relative z-10" />}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 gap-4">
                <button
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-gray-500 hover:bg-gray-100 disabled:opacity-0 disabled:cursor-not-allowed transition"
                >
                    <ChevronLeft size={20} /> Kembali
                </button>

                <button
                    onClick={handleNext}
                    disabled={selectedScore === undefined} // MATIKAN tombol jika belum jawab
                    className="flex-1 bg-gray-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition flex items-center justify-center gap-2 shadow-lg disabled:shadow-none"
                >
                    {currentIndex === totalQuestions - 1 ? "Lihat Kebenaran" : "Lanjut"}
                    {currentIndex !== totalQuestions - 1 && <ChevronRight size={20} />}
                </button>
            </div>
        </div>
    );
}