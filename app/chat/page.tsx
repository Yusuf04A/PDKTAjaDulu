"use client"
import { useState, useEffect, useRef } from "react"
import { Send, Bot, User, Sparkles, Menu, Loader2 } from "lucide-react"
import Link from "next/link"
import Sidebar from "@/components/Sidebar"

export default function ChatPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stored = localStorage.getItem("lastResult")
    if (stored) {
      const parsedData = JSON.parse(stored)
      setMessages([
        {
          role: "bot",
          text: `Halo ${parsedData.userName || 'Sobat'}! Aku lihat hasil tes kamu sama ${parsedData.crushName || 'dia'} dapet status "${parsedData.result.recommendation}". Ada yang mau dicurhatin atau ditanyain soal hubungan kalian?`,
        },
      ])
    } else {
      setMessages([
        {
          role: "bot",
          text: "Hey 👋 Ambil tes kedekatan dulu yuk di menu sebelah, biar aku bisa kasih saran yang pas buat kamu!",
        },
      ])
    }
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMsg = input
    const currentResultId = localStorage.getItem("lastResultId") // Ambil ID dari database

    setInput("")
    setMessages((prev) => [...prev, { role: "user", text: userMsg }])
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          resultId: currentResultId, // Kirim ID database ke backend
        }),
      })

      const data = await response.json()

      if (!response.ok) throw new Error(data.error || "Gagal menghubungi AI")

      setMessages((prev) => [...prev, { role: "bot", text: data.reply }])
    } catch (error: any) {
      console.error("Chat Error:", error)
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Waduh, koneksiku lagi putus-nyambung nih. Coba cek API Key Gemini kamu atau coba lagi bentar lagi ya!" },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex-1 lg:ml-64">
        <header className="lg:hidden sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-rose-100 px-4 py-3 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-xl hover:bg-rose-50 transition-colors">
            <Menu size={24} />
          </button>
          <h1 className="font-bold text-lg text-rose-950">Tanya AI</h1>
          <div className="w-10" />
        </header>

        <div className="flex flex-col h-[calc(100vh-80px)] lg:h-screen max-w-4xl mx-auto p-4 lg:p-6">
          <div className="flex flex-col bg-white rounded-3xl shadow-xl border border-rose-100 overflow-hidden flex-1">
            <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-5 border-b border-rose-100 flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center shadow-lg text-white">
                <Bot size={24} />
              </div>
              <div>
                <h2 className="font-bold text-rose-950 flex items-center gap-2">Pak Cipto <Sparkles size={16} className="text-rose-500" /></h2>
                <p className="text-xs text-rose-600 font-medium">Coach Cinta & Ahli Pola Tingkah Laku</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`flex gap-3 max-w-[85%] ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md ${m.role === "user" ? "bg-rose-950 text-white" : "bg-gradient-to-br from-rose-500 to-pink-500 text-white"}`}>
                      {m.role === "user" ? <User size={16} /> : <Bot size={16} />}
                    </div>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${m.role === "user" ? "bg-rose-950 text-white rounded-tr-none" : "bg-white text-gray-800 border border-rose-100 rounded-tl-none"}`}>
                      {m.text}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start animate-pulse">
                  <div className="flex gap-3 items-center text-rose-400">
                    <Loader2 size={16} className="animate-spin" />
                    <span className="text-xs font-medium">Pak Cipto lagi mikir...</span>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="p-5 bg-white border-t border-rose-100">
              <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-3">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Curhat dong, Pak Cipto..."
                  className="flex-1 border-2 border-rose-100 rounded-2xl px-5 py-4 focus:border-rose-400 outline-none transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="bg-gradient-to-r from-rose-500 to-pink-500 text-white p-4 rounded-2xl disabled:opacity-50 shadow-lg hover:scale-105 transition-all"
                >
                  <Send size={20} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}