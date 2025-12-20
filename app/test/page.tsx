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
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { Menu } from "lucide-react";
import { questions } from "@/utils/questions";

function calculateTopsis(answers: Record<number, number>) {
  const categories = [
    "Sinyal Ketertarikan",
    "Kenyamanan & Nyambung",
    "Effort & Perlakuan",
    "Situasi & Hambatan",
    "Perasaan & Kesiapan Kamu",
  ];
  const categoryScores: Record<string, number> = {};

  categories.forEach((cat) => {
    const catQuestions = questions.filter((q) => q.category === cat);
    const catAnswers = catQuestions.map((q) => answers[q.id] || 0);
    const avg = catAnswers.reduce((a, b) => a + b, 0) / catAnswers.length;
    categoryScores[cat] = Number(avg.toFixed(1));
  });

  const overallScore =
    Object.values(categoryScores).reduce((a, b) => a + b, 0) /
    Object.values(categoryScores).length /
    5;

  let recommendation = "";
  let description = "";

  if (overallScore >= 0.8) {
    recommendation = "Gas Serius! Cocok banget asli";
    description =
      "Semua sinyal hijau nyala. Nyambung, effort ada, dan momennya pas. Kalau ini masih kamu raguin, masalahnya bukan di hubungannya.";
  } else if (overallScore >= 0.6) {
    recommendation = "Aman Buat Diperjuangin";
    description =
      "Chemistry ada, sinyalnya jelas, tinggal konsistensi. Bukan yang instan, tapi jelas bukan buang-buang waktu.";
  } else if (overallScore >= 0.4) {
    recommendation = "50:50 Tergantung Keberanian";
    description =
      "Ada potensi, tapi juga ada banyak tanda tanya. Bisa lanjut kalau berani, bisa bubar kalau capek.";
  } else if (overallScore >= 0.4) {
    recommendation = "Jangan Terlalu Baper";
    description =
      "Sinyalnya campur aduk dan effort-nya nggak seimbang. Kalau lanjut, siap-siap lebih capek dari senengnya.";
  } else {
    recommendation = "Move On, Ini Bukan Cerita Kamu";
    description =
      "Lebih banyak tanda bahaya daripada harapan. Kalau masih dipaksa, ini bukan perjuangan, ini pengorbanan WKWKWKWK.";
  }

  return {
    score: overallScore,
    recommendation,
    description,
    categoryScores,
  };
}

export default function TestPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [showNameInput, setShowNameInput] = useState(true);
  const [userName, setUserName] = useState("");
  const [crushName, setCrushName] = useState("");

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

  const finishTest = () => {
    const result = calculateTopsis(answers);
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
  };

  const handleStartQuiz = () => {
    if (!userName.trim() || !crushName.trim()) {
      alert("Isi nama kamu dan crush kamu dulu ya! tenang aja ini aman kok");
      return;
    }
    setShowNameInput(false);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 lg:ml-64">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-30 bg-card/80 backdrop-blur-xl border-b border-border px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl hover:bg-accent transition-colors"
          >
            <Menu size={24} />
          </button>
          <h1 className="font-bold text-lg">Tes Kedekatan</h1>
          <div className="w-10" />
        </header>

        {showNameInput ? (
          <div className="max-w-xl mx-auto px-6 py-20">
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-rose-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 mb-6 shadow-xl">
                  <Heart className="text-white animate-heart-beat" size={32} />
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-rose-950 mb-3 text-balance">
                  Yuk Mulai Tes Kedekatan!
                </h1>
                <p className="text-gray-600 leading-relaxed text-balance">
                  Isi nama kamu dan nama crush kamu untuk memulai analisis
                  hubungan
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-rose-950 mb-2">
                    <User size={16} className="text-rose-500" />
                    Nama Kamu
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Contoh: Rapi"
                    className="w-full px-5 py-4 rounded-xl border-2 border-rose-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-100 outline-none transition-all text-gray-900 placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-rose-950 mb-2">
                    <Heart size={16} className="text-pink-500" />
                    Nama Crush Kamu
                  </label>
                  <input
                    type="text"
                    value={crushName}
                    onChange={(e) => setCrushName(e.target.value)}
                    placeholder="Contoh: Go Youn Jung"
                    className="w-full px-5 py-4 rounded-xl border-2 border-pink-200 focus:border-pink-500 focus:ring-4 focus:ring-pink-100 outline-none transition-all text-gray-900 placeholder-gray-400"
                  />
                </div>

                <button
                  onClick={handleStartQuiz}
                  className="w-full mt-6 bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 text-white px-8 py-5 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                >
                  Mulai Tes
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto px-6 py-10">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm font-bold text-muted-foreground mb-3 uppercase tracking-wide">
                <span>
                  Pertanyaan {currentIndex + 1} / {totalQuestions}
                </span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-rose-100 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="relative bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-rose-100 min-h-[450px] flex flex-col justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-rose-300/20 to-transparent rounded-bl-full" />

              <div className="relative z-10">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 text-sm font-bold rounded-full w-fit mb-6 uppercase tracking-wider border border-rose-300">
                  <Sparkles size={14} />
                  {currentQuestion.category}
                </span>

                <h2 className="text-2xl md:text-3xl font-bold text-rose-950 mb-8 leading-snug text-balance">
                  {currentQuestion.text}
                </h2>

                <div className="space-y-3">
                  {currentQuestion.options.map((opt) => {
                    const isSelected = selectedScore === opt.score;
                    return (
                      <button
                        key={opt.score}
                        onClick={() => handleSelect(opt.score)}
                        className={clsx(
                          "w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between group relative overflow-hidden",
                          isSelected
                            ? "border-rose-500 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-950 font-semibold shadow-lg scale-[1.02]"
                            : "border-rose-200 bg-white text-gray-600 hover:border-rose-400 hover:bg-rose-50"
                        )}
                      >
                        <span className="relative z-10 text-sm md:text-base">
                          {opt.text}
                        </span>
                        {isSelected && (
                          <CheckCircle
                            size={20}
                            className="text-rose-500 relative z-10 animate-in zoom-in"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 gap-4">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-gray-600 hover:bg-rose-50 disabled:opacity-0 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft size={20} /> Kembali
              </button>

              <button
                onClick={handleNext}
                disabled={selectedScore === undefined}
                className="flex-1 bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 text-white px-6 py-4 rounded-xl font-bold hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all disabled:shadow-none flex items-center justify-center gap-2 shadow-lg"
              >
                {currentIndex === totalQuestions - 1 ? "Lihat Hasil" : "Lanjut"}
                {currentIndex !== totalQuestions - 1 && (
                  <ChevronRight size={20} />
                )}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function clsx(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
