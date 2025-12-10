"use client"
import { useState, useEffect, useRef } from "react"
import { Send, Bot, User, Sparkles, Menu } from "lucide-react"
import Link from "next/link"
import Sidebar from "@/components/Sidebar"

export default function ChatPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([])
  const [input, setInput] = useState("")
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
          text: "Halo! Aku AI Relationship Assistant. Supaya saranku akurat, yuk ikuti Tes Kedekatan dulu di menu sebelah kiri!",
        },
      ])
    }
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMsg = input
    setMessages((prev) => [...prev, { role: "user", text: userMsg }])
    setInput("")

    setTimeout(() => {
      let reply = ""

      if (!context) {
        reply =
          "Maaf, aku belum punya data tentang hubunganmu. Saranku akan terlalu umum. Tolong ambil tes dulu ya supaya aku tau konteksnya!"
      } else {
        const score = context.score || 0

        if (userMsg.toLowerCase().includes("chat")) {
          if (score > 0.7)
            reply =
              "Chattingan kalian udah oke banget. Coba kurangi intensitas dikit biar dia yang ngejar, atau coba voice note biar makin personal."
          else
            reply =
              "Kalau balasnya lama, jangan di-spam. Coba tarik ulur dulu. Posting story yang menarik dan lihat dia reply gak."
        } else if (userMsg.toLowerCase().includes("tembak") || userMsg.toLowerCase().includes("jadian")) {
          if (score > 0.8) reply = "Lampu hijau sih! Tapi pastikan moment-nya pas. Jangan lewat chat kalau bisa."
          else
            reply =
              "Waduh, tahan dulu prajurit! Skor kamu masih di zona hati-hati. Mending bangun chemistry lagi daripada ditolak."
        } else {
          reply = "Hmm, menarik. Intinya, tetap jadi diri sendiri ya. Ada lagi yang bikin bingung?"
        }
      }

      setMessages((prev) => [...prev, { role: "bot", text: reply }])
    }, 1000)
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
                    AI Relationship Coach
                    <Sparkles size={16} className="text-primary" />
                  </h2>
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
                      className={`p-4 rounded-2xl text-sm leading-relaxed shadow-md ${
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
                  disabled={!context}
                  className="flex-1 border-2 border-border rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-muted disabled:cursor-not-allowed transition-all bg-background text-foreground"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="bg-gradient-to-r from-primary to-secondary text-primary-foreground p-4 rounded-2xl hover:shadow-xl disabled:opacity-50 transition-all shadow-lg disabled:shadow-none"
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
