"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { MessageCircle, RefreshCcw, TrendingUp, Menu } from "lucide-react"
import Sidebar from "@/components/Sidebar"

interface TopsisResult {
  score: number
  recommendation: string
  description: string
  categoryScores: Record<string, number>
}

export default function ResultPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [data, setData] = useState<TopsisResult | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem("lastResult")
    if (stored) {
      setData(JSON.parse(stored).result)
    }
  }, [])

  if (!data)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading hasil tes...</p>
        </div>
      </div>
    )

  const scorePercentage = data.score * 100

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 lg:ml-64">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-30 bg-card/80 backdrop-blur-xl border-b border-border px-4 py-3 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-xl hover:bg-accent transition-colors">
            <Menu size={24} />
          </button>
          <h1 className="font-bold text-lg">Hasil Tes</h1>
          <div className="w-10" />
        </header>

        <div className="max-w-3xl mx-auto px-6 py-10">
          <div className="space-y-8">
            {/* Main Result Card */}
            <div className="relative bg-card p-10 rounded-3xl shadow-2xl text-center border border-border overflow-hidden animate-in fade-in zoom-in duration-500">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-secondary/10 to-transparent rounded-full blur-3xl" />

              <div className="relative z-10">
                <h2 className="text-sm text-muted-foreground uppercase tracking-wider mb-3 font-bold">
                  Rekomendasi Sistem
                </h2>
                <h1
                  className={`text-4xl md:text-5xl font-black mb-6 ${
                    data.recommendation.includes("Tembak")
                      ? "text-green-600"
                      : data.recommendation.includes("Menjauh") || data.recommendation.includes("Merah")
                        ? "text-red-600"
                        : data.recommendation.includes("Kuning")
                          ? "text-yellow-600"
                          : "text-blue-600"
                  }`}
                >
                  {data.recommendation}
                </h1>

                <div className="my-8">
                  <div className="relative w-40 h-40 mx-auto">
                    <svg className="transform -rotate-90 w-40 h-40">
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="none"
                        className="text-muted"
                      />
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 70}`}
                        strokeDashoffset={`${2 * Math.PI * 70 * (1 - data.score)}`}
                        className="text-primary transition-all duration-1000"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-5xl font-black text-foreground">{scorePercentage.toFixed(0)}%</span>
                    </div>
                  </div>
                </div>

                <p className="text-foreground leading-relaxed max-w-xl mx-auto text-lg">{data.description}</p>
              </div>
            </div>

            {/* Category Scores */}
            <div className="bg-card p-8 rounded-3xl shadow-xl border border-border animate-in fade-in slide-in-from-bottom-4 duration-700">
              <h3 className="font-bold text-foreground mb-6 flex items-center gap-2 text-xl">
                <TrendingUp className="text-primary" size={24} />
                Analisis Detail (Skala 1-5)
              </h3>
              <div className="space-y-5">
                {Object.entries(data.categoryScores).map(([cat, val]) => (
                  <div key={cat} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-foreground font-semibold capitalize">{cat}</span>
                      <span className="font-bold text-lg text-primary">{val}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${(val / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <Link
                href="/chat"
                className="group relative bg-gradient-to-r from-primary to-secondary text-primary-foreground p-6 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 overflow-hidden"
              >
                <div className="absolute inset-0 shimmer" />
                <MessageCircle size={24} className="relative z-10 group-hover:animate-pulse" />
                <span className="relative z-10">Tanya AI Langkah Selanjutnya</span>
              </Link>
              <Link
                href="/test"
                className="bg-card border-2 border-border text-foreground p-6 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:border-primary/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
              >
                <RefreshCcw size={24} />
                Tes Ulang
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
