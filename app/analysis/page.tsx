"use client"
import { useState } from "react"
import type React from "react"

import { Sparkles, ImageIcon, Loader2, BarChart, Menu } from "lucide-react"
import Sidebar from "@/components/Sidebar"

export default function AnalysisPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [text, setText] = useState("")
    const [result, setResult] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState("")

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setStatus("processing")
        setLoading(true)
        setResult(null)

        // Simulate OCR processing
        setTimeout(() => {
            setText("Contoh teks hasil OCR dari gambar chat...")
            setStatus("idle")
            setLoading(false)
        }, 2000)
    }

    const analyzeChat = () => {
        if (!text) return
        setStatus("analyzing")
        setLoading(true)

        setTimeout(() => {
            const wordCount = text.split(/\s+/).length
            const questionMarks = (text.match(/\?/g) || []).length
            const shortReplies = (text.match(/\b(y|g|oh|ok|wkwk|haha)\b/gi) || []).length

            let sentiment = ""
            let score = 0

            if (wordCount < 10) {
                sentiment = "Data terlalu sedikit untuk disimpulkan."
            } else {
                if (questionMarks > 2) {
                    sentiment += "Komunikasi dua arah cukup aktif. "
                    score += 2
                } else {
                    sentiment += "Sedikit pertanyaan balik. "
                }

                if (shortReplies > 3) {
                    sentiment += "Terdeteksi banyak balasan singkat (dry text). "
                    score -= 1
                } else {
                    sentiment += "Balasan cukup niat (panjang). "
                    score += 2
                }
            }

            setResult({
                wordCount,
                sentiment: sentiment || "Percakapan standar.",
                scoreLabel: score > 2 ? "Positif" : score < 0 ? "Kurang Antusias" : "Netral",
            })
            setLoading(false)
            setStatus("idle")
        }, 1500)
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
                    <h1 className="font-bold text-lg">Analisis Chat</h1>
                    <div className="w-10" />
                </header>

                <div className="max-w-5xl mx-auto px-6 py-10">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold flex items-center gap-3 text-foreground mb-2">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-chart-3 to-chart-3/70 flex items-center justify-center">
                                <Sparkles className="text-white" size={24} />
                            </div>
                            Analisis Pola Chat
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Upload screenshot chat atau paste teks untuk analisis mendalam pola komunikasi
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Input Section */}
                        <div className="space-y-6">
                            <div className="relative border-2 border-dashed border-border rounded-3xl p-10 text-center hover:bg-accent/50 hover:border-primary/50 transition-all cursor-pointer group bg-card">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                />
                                {status === "processing" ? (
                                    <div className="flex flex-col items-center text-primary">
                                        <Loader2 className="animate-spin mb-3" size={40} />
                                        <span className="text-sm font-semibold">Membaca Gambar...</span>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center text-muted-foreground group-hover:text-primary transition-colors">
                                        <ImageIcon size={48} className="mb-4" />
                                        <span className="text-base font-semibold mb-1">Upload Screenshot Chat</span>
                                        <span className="text-sm">Klik atau drop gambar di sini</span>
                                    </div>
                                )}
                            </div>

                            <div className="text-center">
                                <span className="text-sm text-muted-foreground font-bold px-4 py-2 bg-muted rounded-full">ATAU</span>
                            </div>

                            <textarea
                                className="w-full h-48 border-2 border-border rounded-2xl p-5 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none font-mono bg-card text-foreground transition-all"
                                placeholder="Paste teks chat di sini atau hasil scan akan muncul otomatis..."
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />

                            <button
                                onClick={analyzeChat}
                                disabled={loading || !text}
                                className="w-full bg-gradient-to-r from-chart-3 to-chart-3/80 text-white py-4 rounded-2xl font-bold hover:shadow-xl disabled:opacity-50 transition-all shadow-lg disabled:shadow-none flex items-center justify-center gap-2"
                            >
                                {status === "analyzing" ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} />
                                        Sedang Menganalisis...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles size={20} />
                                        Mulai Analisis
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Result Section */}
                        <div>
                            {result ? (
                                <div className="bg-card p-8 rounded-3xl shadow-xl border border-border h-full animate-in fade-in zoom-in duration-500">
                                    <h3 className="text-xl font-bold text-foreground mb-6 pb-4 border-b border-border flex items-center gap-2">
                                        <BarChart className="text-chart-3" size={24} />
                                        Hasil Analisis
                                    </h3>

                                    <div className="space-y-6">
                                        <div className="bg-gradient-to-br from-chart-3/10 to-chart-3/5 p-6 rounded-2xl text-center border border-chart-3/20">
                                            <span className="text-xs text-chart-3 font-bold uppercase tracking-wider block mb-2">
                                                Vibe Percakapan
                                            </span>
                                            <p className="text-3xl font-black text-chart-3">{result.scoreLabel}</p>
                                        </div>

                                        <div className="bg-muted p-6 rounded-2xl">
                                            <span className="text-xs text-muted-foreground uppercase font-bold block mb-3">
                                                Detail Analisis
                                            </span>
                                            <p className="text-foreground leading-relaxed">{result.sentiment}</p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-gradient-to-br from-primary/5 to-transparent p-5 rounded-2xl text-center border border-primary/20">
                                                <span className="text-xs text-muted-foreground block mb-2 font-medium">Total Kata</span>
                                                <span className="font-black text-2xl text-foreground">{result.wordCount}</span>
                                            </div>
                                            <div className="bg-gradient-to-br from-secondary/5 to-transparent p-5 rounded-2xl text-center border border-secondary/20">
                                                <span className="text-xs text-muted-foreground block mb-2 font-medium">Status</span>
                                                <span className="font-black text-2xl text-foreground">AI</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-muted/30 border-2 border-dashed border-border p-10 rounded-3xl h-full flex flex-col items-center justify-center text-center min-h-[500px]">
                                    <BarChart size={64} className="mb-6 opacity-20 text-muted-foreground" />
                                    <p className="text-muted-foreground text-lg font-medium">Hasil analisis akan muncul di sini</p>
                                    <p className="text-sm text-muted-foreground mt-2">Upload gambar atau paste teks untuk memulai</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
