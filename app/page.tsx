"use client"
import { useState } from "react"
import Link from "next/link"
import Sidebar from "@/components/Sidebar"
import { Menu, Heart, Sparkles, MessageCircle, BarChart2, TrendingUp, Star, Zap } from "lucide-react"

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 lg:ml-64">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-30 bg-card/80 backdrop-blur-xl border-b border-border px-4 py-3 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-xl hover:bg-accent transition-colors">
            <Menu size={24} />
          </button>
          <h1 className="font-bold text-lg">PDKT Aja Dulu</h1>
          <div className="w-10" />
        </header>

        {/* Hero Section */}
        <section className="relative overflow-hidden px-6 py-16 md:py-24">
          {/* Background Decorations */}
          <div className="absolute top-20 right-10 w-64 h-64 bg-rose-300/20 rounded-full blur-3xl animate-float" />
          <div
            className="absolute bottom-10 left-10 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-200/10 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          />

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center space-y-6 mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-rose-100 to-pink-100 border border-rose-300 text-sm font-medium text-rose-700 animate-pulse-glow">
                <Sparkles size={16} />
                AI-Powered Relationship Advisor
              </div>

              <h1 className="text-5xl md:text-7xl font-black text-balance leading-tight">
                <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-red-500 bg-clip-text text-transparent">
                  PDKT Aja Dulu
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
                Platform AI yang membantu navigasi hubungan percintaanmu dengan analisis cerdas dan saran yang akurat
              </p>

              <div className="flex flex-wrap gap-4 justify-center pt-4">
                <Link
                  href="/test"
                  className="group relative px-8 py-4 bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden"
                >
                  <div className="absolute inset-0 shimmer" />
                  <span className="relative flex items-center gap-2">
                    <Heart size={20} className="group-hover:animate-heart-beat" />
                    Mulai Tes Kedekatan
                  </span>
                </Link>

                <Link
                  href="/chat"
                  className="px-8 py-4 bg-white border-2 border-rose-200 text-rose-700 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:border-rose-400 transition-all duration-300 hover:scale-105"
                >
                  Konsultasi AI
                </Link>
              </div>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid md:grid-cols-3 gap-6 mt-16">
              {/* Feature 1 */}
              <div className="group relative p-8 bg-white rounded-3xl border border-rose-100 hover:border-rose-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-rose-200/30 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="text-white" size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-rose-950">Tes Kedekatan TOPSIS</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Analisis hubungan menggunakan algoritma TOPSIS dengan 15+ indikator akurat untuk rekomendasi terbaik
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="group relative p-8 bg-white rounded-3xl border border-pink-100 hover:border-pink-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-200/30 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <MessageCircle className="text-white" size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-rose-950">AI Relationship Coach</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Konsultasi 24/7 dengan AI yang memahami konteks hubunganmu untuk saran yang personal dan relevan
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="group relative p-8 bg-white rounded-3xl border border-red-100 hover:border-red-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-200/30 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <BarChart2 className="text-white" size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-rose-950">Analisis Pola Chat</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Upload screenshot chat untuk analisis mendalam tentang pola komunikasi dan level ketertarikan
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="mt-20 p-8 rounded-3xl bg-gradient-to-r from-rose-100 via-pink-100 to-red-100 border border-rose-200">
              <div className="grid grid-cols-3 gap-8 text-center">
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <Star className="text-rose-600" size={24} />
                    <div className="text-4xl font-black bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                      15+
                    </div>
                  </div>
                  <p className="text-sm text-rose-800 font-medium">Indikator Analisis</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <Zap className="text-pink-600" size={24} />
                    <div className="text-4xl font-black bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">
                      AI
                    </div>
                  </div>
                  <p className="text-sm text-rose-800 font-medium">Powered Assistant</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <Heart className="text-red-600 animate-heart-beat" size={24} />
                    <div className="text-4xl font-black bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
                      24/7
                    </div>
                  </div>
                  <p className="text-sm text-rose-800 font-medium">Konsultasi Online</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
