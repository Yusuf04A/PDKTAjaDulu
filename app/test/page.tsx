"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ChevronRight, ChevronLeft, CheckCircle, Sparkles } from "lucide-react"
import Sidebar from "@/components/Sidebar"
import { Menu } from "lucide-react"

// Sample questions data structure
const questions = [
  {
    id: 1,
    category: "Komunikasi",
    text: "Seberapa sering dia memulai percakapan denganmu?",
    options: [
      { text: "Sangat jarang atau tidak pernah", score: 1 },
      { text: "Jarang (1-2 kali seminggu)", score: 2 },
      { text: "Kadang-kadang (3-4 kali seminggu)", score: 3 },
      { text: "Sering (hampir setiap hari)", score: 4 },
      { text: "Sangat sering (beberapa kali sehari)", score: 5 },
    ],
  },
  {
    id: 2,
    category: "Responsivitas",
    text: "Seberapa cepat dia membalas pesanmu?",
    options: [
      { text: "Sangat lama (lebih dari 1 hari)", score: 1 },
      { text: "Lama (beberapa jam)", score: 2 },
      { text: "Cukup (1-2 jam)", score: 3 },
      { text: "Cepat (dalam 30 menit)", score: 4 },
      { text: "Instant (langsung)", score: 5 },
    ],
  },
  {
    id: 3,
    category: "Perhatian",
    text: "Apakah dia mengingat hal-hal kecil tentang dirimu?",
    options: [
      { text: "Tidak pernah", score: 1 },
      { text: "Jarang", score: 2 },
      { text: "Kadang-kadang", score: 3 },
      { text: "Sering", score: 4 },
      { text: "Selalu", score: 5 },
    ],
  },
  {
    id: 4,
    category: "Komunikasi",
    text: "Bagaimana kualitas percakapan kalian?",
    options: [
      { text: "Sangat kering (jawaban singkat)", score: 1 },
      { text: "Biasa saja", score: 2 },
      { text: "Cukup menarik", score: 3 },
      { text: "Engaging dan menyenangkan", score: 4 },
      { text: "Sangat mendalam dan personal", score: 5 },
    ],
  },
  {
    id: 5,
    category: "Perhatian",
    text: "Seberapa sering dia bertanya tentang harimu?",
    options: [
      { text: "Tidak pernah", score: 1 },
      { text: "Jarang", score: 2 },
      { text: "Kadang-kadang", score: 3 },
      { text: "Sering", score: 4 },
      { text: "Hampir selalu", score: 5 },
    ],
  },
]

// Simple TOPSIS calculation
function calculateTopsis(answers: Record<number, number>) {
  const categories = ["Komunikasi", "Responsivitas", "Perhatian"]
  const categoryScores: Record<string, number> = {}

  categories.forEach((cat) => {
    const catQuestions = questions.filter((q) => q.category === cat)
    const catAnswers = catQuestions.map((q) => answers[q.id] || 0)
    const avg = catAnswers.reduce((a, b) => a + b, 0) / catAnswers.length
    categoryScores[cat] = Number(avg.toFixed(1))
  })

  const overallScore =
    Object.values(categoryScores).reduce((a, b) => a + b, 0) / Object.values(categoryScores).length / 5

  let recommendation = ""
  let description = ""

  if (overallScore >= 0.8) {
    recommendation = "Lampu Hijau - Tembak Sekarang!"
    description =
      "Semua indikator menunjukkan tanda positif. Dia kemungkinan besar juga tertarik denganmu. Waktu yang tepat untuk move on ke tahap berikutnya!"
  } else if (overallScore >= 0.6) {
    recommendation = "Kuning - Lanjut PDKT"
    description =
      "Ada ketertarikan, tapi belum terlalu kuat. Terus bangun chemistry dan lihat perkembangannya. Jangan terburu-buru."
  } else if (overallScore >= 0.4) {
    recommendation = "Oranye - Hati-hati"
    description =
      "Sinyal masih abu-abu. Mungkin dia belum tertarik atau cuma menganggapmu teman. Evaluasi kembali strategi PDKT-mu."
  } else {
    recommendation = "Merah - Mundur Tactical"
    description = "Maaf, tapi sepertinya peluangmu kecil. Lebih baik fokus ke orang lain yang lebih appreciate usahamu."
  }

  return {
    score: overallScore,
    recommendation,
    description,
    categoryScores,
  }
}

export default function TestPage() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  const currentQuestion = questions[currentIndex]
  const totalQuestions = questions.length
  const progress = ((currentIndex + 1) / totalQuestions) * 100
  const selectedScore = answers[currentQuestion.id]

  const handleSelect = (score: number) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: score }))
  }

  const handleNext = () => {
    if (answers[currentQuestion.id] === undefined) {
      alert("Isi dulu jawabannya dong, jangan dikosongin!")
      return
    }

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1)
      window.scrollTo(0, 0)
    } else {
      finishTest()
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
    }
  }

  const finishTest = () => {
    const result = calculateTopsis(answers)
    localStorage.setItem(
      "lastResult",
      JSON.stringify({
        date: new Date().toISOString(),
        result: result,
      }),
    )
    router.push("/result")
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 lg:ml-64">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-30 bg-card/80 backdrop-blur-xl border-b border-border px-4 py-3 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-xl hover:bg-accent transition-colors">
            <Menu size={24} />
          </button>
          <h1 className="font-bold text-lg">Tes Kedekatan</h1>
          <div className="w-10" />
        </header>

        <div className="max-w-2xl mx-auto px-6 py-10">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm font-bold text-muted-foreground mb-3 uppercase tracking-wide">
              <span>
                Pertanyaan {currentIndex + 1} / {totalQuestions}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="relative bg-card p-8 md:p-10 rounded-3xl shadow-xl border border-border min-h-[450px] flex flex-col justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full" />

            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary text-sm font-bold rounded-full w-fit mb-6 uppercase tracking-wider border border-primary/20">
                <Sparkles size={14} />
                {currentQuestion.category}
              </span>

              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 leading-snug text-balance">
                {currentQuestion.text}
              </h2>

              <div className="space-y-3">
                {currentQuestion.options.map((opt) => {
                  const isSelected = selectedScore === opt.score
                  return (
                    <button
                      key={opt.score}
                      onClick={() => handleSelect(opt.score)}
                      className={clsx(
                        "w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between group relative overflow-hidden",
                        isSelected
                          ? "border-primary bg-gradient-to-r from-primary/10 to-secondary/10 text-foreground font-semibold shadow-lg scale-[1.02]"
                          : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:bg-accent/50",
                      )}
                    >
                      <span className="relative z-10 text-sm md:text-base">{opt.text}</span>
                      {isSelected && (
                        <CheckCircle size={20} className="text-primary relative z-10 animate-in zoom-in" />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 gap-4">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-muted-foreground hover:bg-accent disabled:opacity-0 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={20} /> Kembali
            </button>

            <button
              onClick={handleNext}
              disabled={selectedScore === undefined}
              className="flex-1 bg-gradient-to-r from-primary to-secondary text-primary-foreground px-6 py-4 rounded-xl font-bold hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all disabled:shadow-none flex items-center justify-center gap-2 shadow-lg"
            >
              {currentIndex === totalQuestions - 1 ? "Lihat Hasil" : "Lanjut"}
              {currentIndex !== totalQuestions - 1 && <ChevronRight size={20} />}
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

function clsx(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
