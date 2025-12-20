"use client"
import { useState } from "react"
import Link from "next/link"
import Sidebar from "@/components/Sidebar"
import {
  Menu,
  Heart,
  Sparkles,
  MessageCircle,
  TrendingUp,
  Star,
  Zap,
  Shield,
  Target,
  BarChart3,
  Clock,
  ImageUp,
  Camera,
  ScanLine,
} from "lucide-react"

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 lg:ml-64">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-rose-100 px-4 py-3 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-xl hover:bg-rose-50 transition-colors">
            <Menu size={24} />
          </button>
          <h1 className="font-bold text-lg text-rose-950">PDKT Aja Dulu</h1>
          <div className="w-10" />
        </header>

        {/* Hero Section */}
        <section className="relative overflow-hidden px-6 py-16 md:py-24">
          <div className="absolute top-20 right-10 w-64 h-64 bg-rose-300/20 rounded-full blur-3xl animate-float" />
          <div
            className="absolute bottom-10 left-10 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-200/10 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute top-1/3 right-1/4 w-48 h-48 bg-pink-400/10 rounded-full blur-2xl animate-float"
            style={{ animationDelay: "0.5s" }}
          />

          {/* Floating hearts decorations */}
          <div className="absolute top-40 left-20 opacity-10">
            <Heart className="w-12 h-12 text-rose-500 animate-float" />
          </div>
          <div className="absolute top-60 right-40 opacity-10" style={{ animationDelay: "1.5s" }}>
            <Heart className="w-8 h-8 text-pink-500 animate-float" />
          </div>
          <div className="absolute bottom-40 right-20 opacity-10" style={{ animationDelay: "0.5s" }}>
            <Heart className="w-10 h-10 text-red-500 animate-float" />
          </div>
          <div className="absolute top-1/4 left-1/4 opacity-10" style={{ animationDelay: "2.5s" }}>
            <Heart className="w-6 h-6 text-rose-400 animate-float" />
          </div>
          <div className="absolute bottom-1/3 left-1/3 opacity-10" style={{ animationDelay: "1s" }}>
            <Heart className="w-9 h-9 text-pink-400 animate-float" />
          </div>

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

              <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto text-balance leading-relaxed">
                Perasaan kok di tebak? Sini deh, biar AI bantu baca sinyal doi. Gak pake ribet, sat-set!
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

            {/* Stats Section */}
            <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-rose-100 via-pink-100 to-red-100 border border-rose-200 shadow-lg">
              <div className="grid grid-cols-3 gap-8 text-center">
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <Star className="text-rose-600 animate-pulse-glow" size={24} />
                    <div className="text-4xl font-black bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                      25
                    </div>
                  </div>
                  <p className="text-sm text-rose-800 font-medium">Indikator Analisis</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <Zap className="text-pink-600 animate-pulse-glow" size={24} />
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

        <section className="relative px-6 py-20 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100 border border-rose-300 text-sm font-medium text-rose-700 mb-4">
                <Shield size={16} />
                Kenapa Kami Berbeda
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-rose-950 mb-4">Mengapa Memilih PDKT Aja Dulu?</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto text-pretty">
                Solusi terdepan untuk memahami dan mengembangkan hubungan percintaanmu dengan teknologi AI
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Benefit 1 */}
              <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-100 hover:border-rose-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Target className="text-white" size={24} />
                </div>
                <h3 className="text-lg font-bold mb-2 text-rose-950">Analisis Akurat</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Menggunakan algoritma TOPSIS, karena keputusan penting jangan dibuat berdasarkan saran temen yang sok
                  yakin.
                </p>
              </div>

              {/* Benefit 2 */}
              <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-pink-50 to-red-50 border border-pink-100 hover:border-pink-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Sparkles className="text-white" size={24} />
                </div>
                <h3 className="text-lg font-bold mb-2 text-rose-950">AI Cerdas</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Teknologi AI terkini yang memahami konteks hubunganmu lebih peka daripada kamu sendiri.
                </p>
              </div>

              {/* Benefit 3 */}
              <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-red-50 to-rose-50 border border-red-100 hover:border-red-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Clock className="text-white" size={24} />
                </div>
                <h3 className="text-lg font-bold mb-2 text-rose-950">Akses 24/7</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Konsultasi kapan saja kamu butuhkan tanpa jadwal, tanpa antri, dan tanpa teman yang sudah muak dengar
                  curhatanmu.
                </p>
              </div>

              {/* Benefit 4 */}
              <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-rose-50 to-red-50 border border-rose-100 hover:border-rose-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-red-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="text-white" size={24} />
                </div>
                <h3 className="text-lg font-bold mb-2 text-rose-950">Privasi Terjaga</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Data dan percakapanmu aman, tenang aja ga bakal discreenshot, di-forward, lalu dibilang "demi
                  kebaikanmu".
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative px-6 py-20 bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 overflow-hidden">
          {/* Floating decorations */}
          <div className="absolute top-10 right-20 w-72 h-72 bg-rose-200/20 rounded-full blur-3xl animate-float" />
          <div
            className="absolute bottom-20 left-10 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "1.5s" }}
          />

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-rose-300 text-sm font-medium text-rose-700 mb-4 shadow-sm">
                <Zap size={16} />
                Fitur yang belum pernah ada di Indonesia
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-rose-950 mb-4">Fitur Unggulan</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto text-pretty">
                Teknologi canggih untuk mendukung pengambilan keputusan yang tepat dalam hubunganmu
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature Card 1 */}
              <div className="group relative p-8 bg-white rounded-3xl border border-rose-100 hover:border-rose-300 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-rose-200/30 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-tl from-pink-200/20 to-transparent rounded-tl-full" />

                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                    <TrendingUp className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-rose-950">Tes Kedekatan TOPSIS</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Analisis mendalam menggunakan algoritma TOPSIS dengan 25 indikator yang komprehensif untuk mengukur
                    tingkat kecocokan hubunganmu
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Star className="text-rose-600" size={12} />
                      </div>
                      <span className="text-sm text-gray-700">25 indikator hubungan yang tervalidasi</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <BarChart3 className="text-rose-600" size={12} />
                      </div>
                      <span className="text-sm text-gray-700">Visualisasi skor yang mudah dipahami</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Target className="text-rose-600" size={12} />
                      </div>
                      <span className="text-sm text-gray-700">Rekomendasi aksi yang konkret</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Feature Card 2 */}
              <div className="group relative p-8 bg-white rounded-3xl border border-pink-100 hover:border-pink-300 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-pink-200/30 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-tl from-red-200/20 to-transparent rounded-tl-full" />

                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                    <MessageCircle className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-rose-950">AI Relationship Coach</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Konsultasi 24/7 dengan AI yang dilatih khusus untuk memahami dinamika hubungan dan memberikan saran
                    yang personal
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Sparkles className="text-pink-600" size={12} />
                      </div>
                      <span className="text-sm text-gray-700">Respons cerdas & kontekstual</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Heart className="text-pink-600" size={12} />
                      </div>
                      <span className="text-sm text-gray-700">Empati & pemahaman mendalam</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Clock className="text-pink-600" size={12} />
                      </div>
                      <span className="text-sm text-gray-700">Tersedia kapan saja kamu butuhkan</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Feature Card 3 - Chat Analysis */}
              <div className="group relative p-8 bg-white rounded-3xl border border-red-100 hover:border-red-300 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-red-200/30 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-tl from-rose-200/20 to-transparent rounded-tl-full" />

                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                    <ImageUp className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-rose-950">Analisis Screenshot Chat</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Upload screenshot percakapan WhatsApp dan biarkan AI membaca pola komunikasi untuk mengetahui apakah
                    dia benar-benar tertarik
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Camera className="text-red-600" size={12} />
                      </div>
                      <span className="text-sm text-gray-700">Upload screenshot dengan mudah</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <ScanLine className="text-red-600" size={12} />
                      </div>
                      <span className="text-sm text-gray-700">Analisis pola percakapan otomatis</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <BarChart3 className="text-red-600" size={12} />
                      </div>
                      <span className="text-sm text-gray-700">Deteksi tingkat ketertarikan real-time</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-16 text-center">
              <div className="inline-block p-1 rounded-3xl bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 shadow-2xl animate-pulse-glow">
                <div className="px-12 py-8 bg-white rounded-[22px] space-y-4">
                  <h3 className="text-2xl md:text-3xl font-black text-rose-950">Siap Memulai Perjalanan Cintamu?</h3>
                  <p className="text-gray-600 max-w-lg mx-auto text-pretty">
                    Karena overthinking berbulan-bulan belum tentu bikin keputusanmu benar. Gas aja!
                  </p>
                  <Link
                    href="/test"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                  >
                    <Heart size={20} className="group-hover:animate-heart-beat" />
                    Mulai Sekarang
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
