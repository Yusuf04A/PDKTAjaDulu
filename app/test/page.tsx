"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { questions } from '../../utils/questions';
import { calculateTopsis } from '@/utils/topsis';

export default function TestPage() {
    const router = useRouter();
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [currentPage, setCurrentPage] = useState(0);
    const questionsPerPage = 5;

    const totalPages = Math.ceil(questions.length / questionsPerPage);
    const currentQuestions = questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage);

    const handleSelect = (qId: number, score: number) => {
        setAnswers(prev => ({ ...prev, [qId]: score }));
    };

    const handleNext = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(prev => prev + 1);
            window.scrollTo(0, 0);
        } else {
            finishTest();
        }
    };

    const finishTest = () => {
        // Validasi semua terisi
        if (Object.keys(answers).length < 25) {
            alert("Mohon isi semua pertanyaan!");
            return;
        }

        // Hitung TOPSIS
        const result = calculateTopsis(answers);

        // Simpan ke LocalStorage
        localStorage.setItem('lastResult', JSON.stringify({
            date: new Date().toISOString(),
            result: result
        }));

        // Simpan ke History Array
        const history = JSON.parse(localStorage.getItem('history') || '[]');
        history.push({ date: new Date().toISOString(), result: result });
        localStorage.setItem('history', JSON.stringify(history));

        router.push('/result');
    };

    const progress = ((Object.keys(answers).length / 25) * 100).toFixed(0);

    return (
        <div className="min-h-screen bg-white p-6 pb-24">
            <div className="max-w-xl mx-auto">
                <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-500 mb-2">
                        <span>Progress</span>
                        <span>{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>

                <h2 className="text-xl font-bold mb-4">Bagian {currentPage + 1} dari {totalPages}</h2>

                <div className="space-y-8">
                    {currentQuestions.map((q) => (
                        <div key={q.id} className="border-b pb-6">
                            <p className="font-medium text-gray-800 mb-3">{q.id}. {q.text}</p>
                            <div className="space-y-2">
                                {q.options.map((opt) => (
                                    <button
                                        key={opt.score}
                                        onClick={() => handleSelect(q.id, opt.score)}
                                        className={`w-full text-left p-3 rounded-lg border text-sm transition-all ${answers[q.id] === opt.score
                                                ? 'bg-blue-50 border-blue-500 text-blue-700 font-semibold'
                                                : 'border-gray-200 hover:bg-gray-50'
                                            }`}
                                    >
                                        {opt.text}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="fixed bottom-0 left-0 w-full p-4 bg-white border-t border-gray-100 flex justify-center">
                    <button
                        onClick={handleNext}
                        className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold w-full max-w-md shadow-lg hover:bg-blue-700 transition"
                    >
                        {currentPage === totalPages - 1 ? "Lihat Hasil" : "Lanjut"}
                    </button>
                </div>
            </div>
        </div>
    );
}