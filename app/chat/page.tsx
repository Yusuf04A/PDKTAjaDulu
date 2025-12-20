"use client";
import { useState, useEffect, useRef } from "react";
import { Send, Bot, User, Sparkles, Menu, Loader2 } from "lucide-react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";

export default function ChatPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState<
    { role: "user" | "bot"; text: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resultId, setResultId] = useState<string | null>(null);
  const [context, setContext] = useState<any>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Ambil Data dari LocalStorage
    const stored = localStorage.getItem("lastResult");
    const storedId = localStorage.getItem("lastResultId");

    if (stored) {
      const parsedData = JSON.parse(stored);
      setResultId(storedId);
      setContext(parsedData.result);

      // Pesan pembuka personal
      setMessages([
        {
          role: "bot",
          text: `Halo ${
            parsedData.userName || "Sobat"
          }! Aku lihat hasil tes kamu sama ${
            parsedData.crushName || "dia"
          } dapet status "${
            parsedData.result.recommendation
          }". Ada yang mau dicurhatin soal ini?`,
        },
      ]);
    } else {
      setMessages([
        {
          role: "bot",
          text: "Hey 👋 Sebelum kita bahas hubunganmu lebih jauh, mending isi Tes Kedekatan dulu ya. Biar saranku berdasarkan data, bukan nebak-nebak kaya temenmu itu 😌",
        },
      ]);
    }
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput("");

    // Tampilkan pesan user di UI
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setIsLoading(true);

    try {
      // 2. Kirim ke API Route Chat dengan resultId dari Database
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMsg,
          resultId: resultId, // Mengirim ID database
          context: context, // Backup tetap kirim context local
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gagal menghubungi AI");
      }

      // Tampilkan balasan Gemini
      setMessages((prev) => [...prev, { role: "bot", text: data.reply }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Waduh, koneksiku lagi putus-nyambung nih. Coba tanya lagi ya sebentar lagi!",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 lg:ml-64">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-rose-100 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl hover:bg-rose-50 transition-colors"
          >
            <Menu size={24} />
          </button>
          <h1 className="font-bold text-lg text-rose-950">Tanya AI</h1>
          <div className="w-10" />
        </header>

        <div className="flex flex-col h-[calc(100vh-80px)] lg:h-screen max-w-4xl mx-auto p-4 lg:p-6">
          <div className="flex flex-col bg-white rounded-3xl shadow-xl border border-rose-100 overflow-hidden flex-1">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-5 border-b border-rose-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center shadow-lg">
                  <Bot size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-rose-950 flex items-center gap-2">
                    Pak Cipto
                    <Sparkles size={16} className="text-rose-500" />
                  </h2>
                  <p className="text-xs text-rose-600 font-medium">
                    Pakar Cinta & Pola Tingkah laku
                  </p>
                  <span className="text-xs text-green-500 flex items-center gap-1 font-medium">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Online 24/7
                  </span>
                </div>
              </div>
              {!context && (
                <Link
                  href="/test"
                  className="text-xs bg-rose-500 text-white px-4 py-2 rounded-full hover:bg-rose-600 transition-all font-semibold"
                >
                  Ambil Tes
                </Link>
              )}
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-white to-rose-50/30">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex gap-3 max-w-[85%] ${
                      m.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md ${
                        m.role === "user"
                          ? "bg-rose-950"
                          : "bg-gradient-to-br from-rose-500 to-pink-500"
                      }`}
                    >
                      {m.role === "user" ? (
                        <User size={16} className="text-white" />
                      ) : (
                        <Bot size={16} className="text-white" />
                      )}
                    </div>
                    <div
                      className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-wrap ${
                        m.role === "user"
                          ? "bg-rose-950 text-white rounded-tr-none"
                          : "bg-white text-gray-800 border border-rose-100 rounded-tl-none"
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[85%] flex-row">
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md bg-gradient-to-br from-rose-500 to-pink-500">
                      <Loader2 size={16} className="text-white animate-spin" />
                    </div>
                    <div className="p-4 rounded-2xl bg-white text-gray-400 border border-rose-100 rounded-tl-none shadow-sm flex items-center">
                      <span className="text-xs animate-pulse">
                        Pak Cipto lagi ngetik...
                      </span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input Area */}
            <div className="p-5 bg-white border-t border-rose-100">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-3"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={
                    context
                      ? "Tanya saran relationship..."
                      : "Ambil tes dulu yuk..."
                  }
                  disabled={!context || isLoading}
                  className="flex-1 border-2 border-rose-100 rounded-2xl px-5 py-4 focus:outline-none focus:border-rose-400 disabled:bg-gray-50 disabled:cursor-not-allowed transition-all bg-white text-gray-900"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="bg-gradient-to-r from-rose-500 to-pink-500 text-white p-4 rounded-2xl hover:shadow-lg disabled:opacity-50 transition-all shadow-md flex items-center justify-center"
                >
                  {isLoading ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <Send size={20} />
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
