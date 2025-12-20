"use client"
import { useState, useEffect, useRef } from "react"
import { Send, Bot, User, Sparkles, Menu, Loader2 } from "lucide-react" // Tambah Loader2
import Link from "next/link"
import Sidebar from "@/components/Sidebar"

export default function ChatPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([])
  const [input, setInput] = useState("")
  // Tambahkan state loading
  const [isLoading, setIsLoading] = useState(false)
  const [context, setContext] = useState<any>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stored = localStorage.getItem("lastResult")

    if (stored) {
      const parsedData = JSON.parse(stored).result
      setContext(parsedData)
      setMessages([
        {
          role: "bot",
          text: `Halo! Aku lihat hasil tes kamu dapat status "${parsedData.recommendation}". Ada yang mau dicurhatin soal ini?`,
        },
      ])
    } else {
      setMessages([
        {
          role: "bot",
          text: "Hey 👋 Sebelum kita bahas hubunganmu lebih jauh, mending isi Tes Kedekatan dulu ya. Biar saranku berdasarkan data, bukan nebak-nebak kaya temenmu itu 😌",
        },
      ])
    }
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading]) // Scroll juga saat loading berubah

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMsg = input
    setInput("") // Kosongkan input segera
    
    // 1. Tampilkan pesan user di UI
    setMessages((prev) => [...prev, { role: "user", text: userMsg }])
    setIsLoading(true) // Set loading true

    try {
      if (!context) {
         // Fallback jika tidak ada context (opsional, karena input disabled di bawah)
         setMessages((prev) => [...prev, { 
             role: "bot", 
             text: "Maaf, aku butuh data tes kamu dulu biar sarannya gak ngawur. Ambil tes dulu ya!" 
         }])
         setIsLoading(false)
         return
      }

      // 2. Kirim ke API Route (app/api/chat/route.ts)
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMsg,
          context: context, // Kirim data hasil tes ke backend
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Gagal menghubungi AI")
      }

      // 3. Tampilkan balasan Gemini
      setMessages((prev) => [...prev, { role: "bot", text: data.reply }])

    } catch (error) {
      console.error("Error:", error)
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Waduh, koneksiku lagi putus-nyambung nih. Coba tanya lagi ya sebentar lagi!" },
      ])
    } finally {
      setIsLoading(false) // Matikan loading
    }
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
          <h1 className="font-bold text-lg">Tanya AI</h1>
          <div className="w-10" />
        </header>

        <div className="flex flex-col h-[calc(100vh-80px)] lg:h-screen max-w-4xl mx-auto p-4 lg:p-6">
          <div className="flex flex-col bg-card rounded-3xl shadow-xl border border-border overflow-hidden flex-1">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-5 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                  <Bot size={24} className="text-primary-foreground" />
                </div>
                <div>
                  <h2 className="font-bold text-foreground flex items-center gap-2">
                    Pak Cipto
                    <Sparkles size={16} className="text-primary" />
                  </h2>
                  <p className="text-xs text-rose-600 font-medium">Pakar Cinta & Pola Tingkah laku Orang</p>
                  <span className="text-xs text-green-500 flex items-center gap-1 font-medium">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Online 24/7
                  </span>
                </div>
              </div>
              {!context && (
                <Link
                  href="/test"
                  className="text-xs bg-primary text-primary-foreground px-4 py-2 rounded-full hover:shadow-lg transition-all font-semibold"
                >
                  Ambil Tes
                </Link>
              )}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-background/50 to-muted/30">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`flex gap-3 max-w-[85%] ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md ${
                        m.role === "user"
                          ? "bg-gradient-to-br from-foreground to-foreground/80"
                          : "bg-gradient-to-br from-primary to-secondary"
                      }`}
                    >
                      {m.role === "user" ? (
                        <User size={16} className="text-background" />
                      ) : (
                        <Bot size={16} className="text-primary-foreground" />
                      )}
                    </div>
                    <div
                      className={`p-4 rounded-2xl text-sm leading-relaxed shadow-md whitespace-pre-wrap ${
                        m.role === "user"
                          ? "bg-gradient-to-br from-foreground to-foreground/90 text-background rounded-tr-none"
                          : "bg-card text-foreground border border-border rounded-tl-none"
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Indikator Loading */}
              {isLoading && (
                 <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[85%] flex-row">
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md bg-gradient-to-br from-primary to-secondary">
                        <Loader2 size={16} className="text-primary-foreground animate-spin" />
                    </div>
                    <div className="p-4 rounded-2xl bg-card text-foreground border border-border rounded-tl-none shadow-md flex items-center">
                      <span className="text-xs text-muted-foreground animate-pulse">Sedang mengetik...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input Area */}
            <div className="p-5 bg-gradient-to-r from-primary/5 to-secondary/5 border-t border-border">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSend()
                }}
                className="flex gap-3"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={context ? "Tanya saran relationship..." : "Ambil tes dulu yuk..."}
                  disabled={!context || isLoading}
                  className="flex-1 border-2 border-border rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-muted disabled:cursor-not-allowed transition-all bg-background text-foreground"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="bg-gradient-to-r from-primary to-secondary text-primary-foreground p-4 rounded-2xl hover:shadow-xl disabled:opacity-50 transition-all shadow-lg disabled:shadow-none flex items-center justify-center"
                >
                  {isLoading ? <Loader2 size={20} className="animate-spin"/> : <Send size={20} />}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}