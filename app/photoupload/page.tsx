"use client"
import { useState } from "react"

import Link from "next/link"
import Sidebar from "@/components/Sidebar"
import { Menu, Camera, Sparkles, Heart, Lock, Clock } from "lucide-react"

export default function PhotoUploadPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-rose-200/30 rounded-full blur-3xl animate-float" />
        <div className="absolute top-40 right-20 w-80 h-80 bg-pink-200/30 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-red-200/20 rounded-full blur-3xl animate-pulse-slow" />

        {/* Floating Hearts */}
        <div className="absolute top-1/4 left-1/3 text-rose-300/40 animate-float">
          <Heart size={32} fill="currentColor" />
        </div>
        <div className="absolute top-1/3 right-1/4 text-pink-300/40 animate-float-delayed">
          <Heart size={24} fill="currentColor" />
        </div>
        <div className="absolute bottom-1/3 right-1/3 text-red-300/40 animate-float">
          <Heart size={28} fill="currentColor" />
        </div>
      </div>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 lg:ml-64 relative z-10">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-rose-100 px-4 py-3 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-xl hover:bg-rose-50 transition-colors">
            <Menu size={24} />
          </button>
          <h1 className="font-bold text-lg text-rose-950">Analisis Chat</h1>
          <div className="w-10" />
        </header>

        <div className="max-w-4xl mx-auto px-6 py-12 min-h-screen flex items-center justify-center">
          <div className="w-full space-y-12 text-center">
            {/* Main Icon */}
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-pink-400 blur-2xl opacity-40 animate-pulse-slow" />
              <div className="relative w-32 h-32 mx-auto bg-gradient-to-br from-rose-100 via-pink-100 to-red-100 rounded-3xl shadow-2xl flex items-center justify-center border-2 border-white rotate-6 hover:rotate-0 transition-transform duration-500">
                <Camera className="text-rose-600" size={56} />
              </div>
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-pink-100 to-red-100 rounded-full shadow-lg flex items-center justify-center animate-bounce">
                <Lock className="text-red-600" size={24} />
              </div>
            </div>

            {/* Coming Soon Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-rose-100 via-pink-100 to-red-100 border-2 border-rose-300 shadow-lg animate-shimmer">
              <Clock size={20} className="text-rose-700" />
              <span className="font-bold text-rose-700">Coming Soon</span>
            </div>

            {/* Title & Description */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-black text-rose-950 animate-in fade-in duration-700">
                Analisis Screenshot Chat
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed text-balance">
                Fitur canggih yang akan menganalisis screenshot percakapanmu dengan AI dan kasih tau apakah dia beneran
                tertarik atau engga
              </p>
            </div>

            {/* Features Preview */}
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-rose-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-rose-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Camera className="text-white" size={24} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Upload Screenshot</h3>
                <p className="text-sm text-gray-600">Drag & drop atau pilih gambar chat dari galeri</p>
              </div>

              <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-pink-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-pink-500 to-red-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="text-white" size={24} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">AI Analysis</h3>
                <p className="text-sm text-gray-600">AI membaca pola chat dan memberikan insight</p>
              </div>

              <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-red-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-red-500 to-rose-500 rounded-xl flex items-center justify-center">
                  <Heart className="text-white" size={24} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Hasil Akurat</h3>
                <p className="text-sm text-gray-600">Dapatkan hasil analisis lengkap dengan saran</p>
              </div>
            </div>

            {/* CTA to Other Features */}
            <div className="pt-8 space-y-4">
              <p className="text-gray-600">Sementara kamu bisa coba fitur lainnya dulu:</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/test"
                  className="px-6 py-3 bg-white border-2 border-rose-200 text-rose-700 rounded-xl font-bold hover:border-rose-400 hover:bg-rose-50 transition-all duration-300 hover:scale-105"
                >
                  Tes Kedekatan
                </Link>
                <Link
                  href="/chat"
                  className="px-6 py-3 bg-white border-2 border-pink-200 text-pink-700 rounded-xl font-bold hover:border-pink-400 hover:bg-pink-50 transition-all duration-300 hover:scale-105"
                >
                  Tanya AI
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
