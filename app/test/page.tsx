"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  Sparkles,
  Heart,
  User,
  Menu,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { questions } from "@/utils/questions";
import { calculateTopsis } from "@/utils/topsis"; 

export default function TestPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [showNameInput, setShowNameInput] = useState(true);
  const [userName, setUserName] = useState("");
  const [crushName, setCrushName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const progress = ((currentIndex + 1) / totalQuestions) * 100;
  const selectedScore = answers[currentQuestion.id];

  const handleSelect = (score: number) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: score }));
  };

  const handleNext = () => {
    if (answers[currentQuestion.id] === undefined) {
      alert("Isi dulu jawabannya dong, jangan dikosongin!");
      return;
    }

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
      window.scrollTo(0, 0);
    } else {
      finishTest();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const finishTest = async () => {
    setIsSubmitting(true);
    const result = calculateTopsis(answers);

    try {
      const response = await fetch("/api/save-result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          score: result.score,
          recommendation: result.recommendation,
          categoryScores: result.categoryScores,
          userName: userName,
          crushName: crushName,
        }),
      });

      const dbData = await response.json();
      if (!response.ok) throw new Error(dbData.error);

      localStorage.setItem("lastResultId", dbData.id);
      localStorage.setItem(
        "lastResult",
        JSON.stringify({
          date: new Date().toISOString(),
          result: result,
          userName,
          crushName,
        })
      );

      router.push("/result");
    } catch (err) {
      console.error("Gagal simpan:", err);
      alert("Waduh, gagal simpan hasil ke database. Cek koneksi ya!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartQuiz = () => {
    if (!userName.trim() || !crushName.trim()) {
      alert("Isi nama kamu dan crush kamu dulu ya!");
      return;
    }
    setShowNameInput(false);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 lg:ml-64">
        <header className="lg:hidden sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-rose-100 px-4 py-3 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-xl hover:bg-rose-50 transition-colors">
            <Menu size={24} />
          </button>
          <h1 className="font-bold text-lg text-rose-950">Tes Kedekatan</h1>
          <div className="w-10" />
        </header>

        {showNameInput ? (
          <div className="max-w-xl mx-auto px-6 py-20">
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-rose-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 mb-6 shadow-xl">
                  <Heart className="text-white animate-heart-beat" size={32} />
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-rose-950 mb-3 text-balance">Yuk Mulai!</h1>
                <p className="text-gray-600">Isi nama kalian untuk memulai analisis hubungan.</p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-rose-950 mb-2">
                    <User size={16} className="text-rose-500" /> Nama Kamu
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Contoh: Rapi"
                    className="w-full px-5 py-4 rounded-xl border-2 border-rose-100 focus:border-rose-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-rose-950 mb-2">
                    <Heart size={16} className="text-pink-500" /> Nama Crush
                  </label>
                  <input
                    type="text"
                    value={crushName}
                    onChange={(e) => setCrushName(e.target.value)}
                    placeholder="Contoh: Go Youn Jung"
                    className="w-full px-5 py-4 rounded-xl border-2 border-rose-100 focus:border-pink-500 outline-none transition-all"
                  />
                </div>
                <button
                  onClick={handleStartQuiz}
                  className="w-full mt-6 bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 text-white px-8 py-5 rounded-2xl font-bold text-lg shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  Mulai Tes <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto px-6 py-10">
            <div className="mb-8">
              <div className="flex justify-between text-sm font-bold text-rose-900 mb-3">
                <span>Pertanyaan {currentIndex + 1} / {totalQuestions}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-rose-100 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-rose-500 to-red-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-rose-100 min-h-[400px] flex flex-col justify-center animate-in fade-in zoom-in duration-500">
              <span className="px-4 py-2 bg-rose-100 text-rose-700 text-xs font-bold rounded-full w-fit mb-6 uppercase tracking-widest">
                <Sparkles size={12} className="inline mr-1" /> {currentQuestion.category}
              </span>
              <h2 className="text-2xl font-bold text-rose-950 mb-8 leading-snug">{currentQuestion.text}</h2>
              <div className="space-y-3">
                {currentQuestion.options.map((opt) => (
                  <button
                    key={opt.score}
                    onClick={() => handleSelect(opt.score)}
                    className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center justify-between ${
                      selectedScore === opt.score
                        ? "border-rose-500 bg-rose-50 text-rose-950 font-bold"
                        : "border-gray-100 hover:border-rose-200 text-gray-600"
                    }`}
                  >
                    <span>{opt.text}</span>
                    {selectedScore === opt.score && <CheckCircle size={20} className="text-rose-500" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between mt-8 gap-4">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="px-6 py-3 rounded-xl font-semibold text-gray-500 hover:bg-rose-50 disabled:opacity-0 transition-all"
              >
                <ChevronLeft size={20} className="inline mr-1" /> Kembali
              </button>
              <button
                onClick={handleNext}
                disabled={selectedScore === undefined || isSubmitting}
                className="flex-1 bg-rose-950 text-white px-6 py-4 rounded-xl font-bold hover:shadow-xl disabled:opacity-50 transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? "Menghitung..." : currentIndex === totalQuestions - 1 ? "Lihat Hasil" : "Lanjut"}
                {!isSubmitting && <ChevronRight size={20} />}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}