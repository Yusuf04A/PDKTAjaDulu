"use client"
import { useState, useRef } from "react"
import type React from "react"

import Link from "next/link"
import Sidebar from "@/components/Sidebar"
import {
  Menu,
  Upload,
  ImageIcon,
  X,
  Heart,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  Minus,
  Sparkles,
  Camera,
} from "lucide-react"

export default function PhotoUploadPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      handleImageUpload(file)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleImageUpload(file)
    }
  }

  const handleImageUpload = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string)
      setAnalysisResult(null)
    }
    reader.readAsDataURL(file)
  }

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    // Simulate analysis - nanti akan diganti dengan API call
    setTimeout(() => {
      setAnalysisResult({
        interest_level: "Tinggi",
        confidence: 85,
        indicators: [
          { name: "Frekuensi Respons", status: "positive", description: "Balasan cepat dan konsisten" },
          { name: "Inisiatif Chat", status: "positive", description: "Sering memulai percakapan" },
          { name: "Emoji & Emoticon", status: "positive", description: "Banyak menggunakan emoji positif" },
          { name: "Panjang Pesan", status: "neutral", description: "Pesan cukup detail" },
          { name: "Pertanyaan Personal", status: "positive", description: "Menunjukkan ketertarikan lebih" },
        ],
        conclusion:
          "Berdasarkan analisis screenshot chat, ada indikasi kuat bahwa orang ini tertarik padamu. Mereka menunjukkan engagement yang baik dan konsisten dalam komunikasi.",
      })
      setIsAnalyzing(false)
    }, 2000)
  }

  const handleRemoveImage = () => {
    setUploadedImage(null)
    setAnalysisResult(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 lg:ml-64">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-rose-100 px-4 py-3 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-xl hover:bg-rose-50 transition-colors">
            <Menu size={24} />
          </button>
          <h1 className="font-bold text-lg text-rose-950">Analisis Chat</h1>
          <div className="w-10" />
        </header>

        <div className="max-w-5xl mx-auto px-6 py-12">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-rose-100 to-pink-100 border border-rose-300 text-sm font-medium text-rose-700 mb-4">
              <Camera size={16} />
              AI-Powered Chat Analysis
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-rose-950 mb-4">Analisis Screenshot Chat</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto text-balance">
              Upload screenshot percakapan chatmu dan AI akan menganalisis apakah dia benar-benar tertarik padamu
            </p>
          </div>

          {/* Upload Section */}
          {!uploadedImage ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative p-12 border-3 border-dashed rounded-3xl transition-all duration-300 ${
                isDragging
                  ? "border-rose-500 bg-rose-50 scale-102"
                  : "border-rose-200 bg-white hover:border-rose-400 hover:bg-rose-50/50"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
                id="file-upload"
              />

              <div className="text-center space-y-6">
                <div className="mx-auto w-24 h-24 rounded-2xl bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center">
                  <Upload className="text-rose-600" size={40} />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-rose-950">Upload Screenshot Chat</h3>
                  <p className="text-gray-600">Drag & drop atau klik tombol di bawah untuk memilih gambar</p>
                </div>

                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <ImageIcon size={20} />
                  Pilih Gambar
                </label>

                <p className="text-sm text-gray-500">Format: JPG, PNG, atau WebP (Max 10MB)</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Image Preview */}
              <div className="relative bg-white rounded-3xl border border-rose-100 shadow-xl overflow-hidden">
                <div className="relative">
                  <img
                    src={uploadedImage || "/placeholder.svg"}
                    alt="Uploaded screenshot"
                    className="w-full max-h-[600px] object-contain"
                  />
                  <button
                    onClick={handleRemoveImage}
                    className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                  >
                    <X className="text-rose-600" size={20} />
                  </button>
                </div>

                {!analysisResult && (
                  <div className="p-6 border-t border-rose-100">
                    <button
                      onClick={handleAnalyze}
                      disabled={isAnalyzing}
                      className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-102 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isAnalyzing ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Menganalisis...
                        </>
                      ) : (
                        <>
                          <Sparkles size={20} />
                          Analisis Sekarang
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* Analysis Result */}
              {analysisResult && (
                <div className="space-y-6 animate-in fade-in duration-500">
                  {/* Overall Result */}
                  <div className="p-8 bg-white rounded-3xl border border-rose-100 shadow-xl">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                        <Heart className="text-white animate-heart-beat" size={24} />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-rose-950 mb-2">Hasil Analisis</h2>
                        <div className="flex items-center gap-3">
                          <span className="text-gray-600">Tingkat Ketertarikan:</span>
                          <span className="px-4 py-1 bg-gradient-to-r from-rose-100 to-pink-100 border border-rose-300 rounded-full text-rose-700 font-bold">
                            {analysisResult.interest_level}
                          </span>
                          <span className="text-gray-600">•</span>
                          <span className="text-gray-600">Confidence: {analysisResult.confidence}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Confidence Bar */}
                    <div className="mb-6">
                      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 rounded-full transition-all duration-1000"
                          style={{ width: `${analysisResult.confidence}%` }}
                        />
                      </div>
                    </div>

                    {/* Conclusion */}
                    <div className="p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl border border-rose-200">
                      <p className="text-gray-700 leading-relaxed">{analysisResult.conclusion}</p>
                    </div>
                  </div>

                  {/* Indicators */}
                  <div className="p-8 bg-white rounded-3xl border border-rose-100 shadow-xl">
                    <h3 className="text-xl font-bold text-rose-950 mb-6 flex items-center gap-2">
                      <TrendingUp className="text-rose-600" size={24} />
                      Indikator Detail
                    </h3>

                    <div className="space-y-4">
                      {analysisResult.indicators.map((indicator: any, index: number) => {
                        const Icon =
                          indicator.status === "positive"
                            ? CheckCircle2
                            : indicator.status === "negative"
                              ? AlertCircle
                              : Minus
                        const colorClass =
                          indicator.status === "positive"
                            ? "text-green-600 bg-green-50 border-green-200"
                            : indicator.status === "negative"
                              ? "text-red-600 bg-red-50 border-red-200"
                              : "text-gray-600 bg-gray-50 border-gray-200"

                        return (
                          <div
                            key={index}
                            className="flex items-start gap-4 p-4 rounded-xl border border-rose-100 hover:border-rose-200 transition-colors"
                          >
                            <div
                              className={`w-10 h-10 rounded-lg flex items-center justify-center border ${colorClass}`}
                            >
                              <Icon size={20} />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-gray-900 mb-1">{indicator.name}</h4>
                              <p className="text-sm text-gray-600">{indicator.description}</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4">
                    <button
                      onClick={handleRemoveImage}
                      className="flex-1 px-6 py-4 bg-white border-2 border-rose-200 text-rose-700 rounded-xl font-bold hover:border-rose-400 transition-all duration-300 hover:scale-102"
                    >
                      Upload Gambar Lain
                    </button>
                    <Link
                      href="/chat"
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-102"
                    >
                      <Sparkles size={20} />
                      Konsultasi AI
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Info Cards */}
          {!uploadedImage && (
            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-white rounded-2xl border border-rose-100 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center mb-4">
                  <Camera className="text-rose-600" size={20} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Screenshot Jelas</h3>
                <p className="text-sm text-gray-600">Pastikan screenshot chat terlihat jelas dan mudah dibaca</p>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-rose-100 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center mb-4">
                  <Sparkles className="text-pink-600" size={20} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Analisis AI</h3>
                <p className="text-sm text-gray-600">AI akan menganalisis pola chat dan memberikan insight akurat</p>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-rose-100 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center mb-4">
                  <Heart className="text-red-600" size={20} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Hasil Detail</h3>
                <p className="text-sm text-gray-600">Dapatkan hasil analisis lengkap dengan saran yang actionable</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
