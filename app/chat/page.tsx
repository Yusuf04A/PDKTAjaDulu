"use client";
import { useState, useEffect, useRef } from 'react';
import { Send, Bot, User } from 'lucide-react';
import Link from 'next/link';

export default function ChatPage() {
    const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([]);
    const [input, setInput] = useState('');
    const [context, setContext] = useState<any>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // 1. Cek LocalStorage saat pertama kali load
        const stored = localStorage.getItem('lastResult');

        if (stored) {
            const parsedData = JSON.parse(stored).result;
            setContext(parsedData);
            // Sapaan JIKA SUDAH ADA DATA
            setMessages([{
                role: 'bot',
                text: `Halo! Aku lihat hasil tes kamu dapat status "${parsedData.recommendation}". Ada yang mau dicurhatin soal ini?`
            }]);
        } else {
            // Sapaan JIKA BELUM ADA DATA
            setMessages([{
                role: 'bot',
                text: "Halo! Aku AI Relationship Assistant. Supaya saranku akurat, yuk ikuti Tes Kedekatan dulu di menu sebelah kiri! 😊"
            }]);
        }
    }, []);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = input;
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setInput('');

        // --- SIMULASI AI LOGIC ---
        setTimeout(() => {
            let reply = "";

            // Logic Pengecekan: User maksa nanya tapi belum tes
            if (!context) {
                reply = "Maaf, aku belum punya data tentang hubunganmu. Saranku akan terlalu umum. Tolong ambil tes dulu ya supaya aku tau konteksnya! 🙏";
            } else {
                // Logic Jawaban Berdasarkan Konteks TOPSIS
                const score = context.score || 0;

                if (userMsg.toLowerCase().includes('chat')) {
                    if (score > 0.7) reply = "Chattingan kalian udah oke banget. Coba kurangi intensitas dikit biar dia yang ngejar, atau coba voice note biar makin personal.";
                    else reply = "Kalau balasnya lama, jangan di-spam. Coba tarik ulur dulu. Posting story yang menarik dan lihat dia reply gak.";
                }
                else if (userMsg.toLowerCase().includes('tembak') || userMsg.toLowerCase().includes('jadian')) {
                    if (score > 0.8) reply = "Lampu hijau sih! Tapi pastikan moment-nya pas. Jangan lewat chat kalau bisa.";
                    else reply = "Waduh, tahan dulu prajurit! Skor kamu masih di zona hati-hati. Mending bangun chemistry lagi daripada ditolak.";
                }
                else {
                    reply = "Hmm, menarik. Intinya, tetap jadi diri sendiri ya. Ada lagi yang bikin bingung?";
                }
            }

            setMessages(prev => [...prev, { role: 'bot', text: reply }]);
        }, 1000);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border overflow-hidden">
            {/* Header Chat */}
            <div className="bg-white p-4 border-b flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-pink-100 rounded-full">
                        <Bot size={24} className="text-pink-600" />
                    </div>
                    <div>
                        <h2 className="font-bold text-gray-800">AI Teman Curhat</h2>
                        <span className="text-xs text-green-500 flex items-center gap-1">● Online</span>
                    </div>
                </div>
                {!context && (
                    <Link href="/test" className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700">
                        Ambil Tes Sekarang
                    </Link>
                )}
            </div>

            {/* Message List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-gray-50">
                {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`flex gap-2 max-w-[80%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${m.role === 'user' ? 'bg-gray-800' : 'bg-pink-600'}`}>
                                {m.role === 'user' ? <User size={14} className="text-white" /> : <Bot size={14} className="text-white" />}
                            </div>
                            <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${m.role === 'user'
                                    ? 'bg-gray-800 text-white rounded-tr-none'
                                    : 'bg-white text-gray-700 border border-gray-200 rounded-tl-none'
                                }`}>
                                {m.text}
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t">
                <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder={context ? "Tanya saran..." : "Ambil tes dulu yuk..."}
                        disabled={!context} // Opsional: disable input kalau belum tes
                        className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim()}
                        className="bg-pink-600 text-white p-3 rounded-xl hover:bg-pink-700 disabled:opacity-50 transition"
                    >
                        <Send size={20} />
                    </button>
                </form>
            </div>
        </div>
    );
}