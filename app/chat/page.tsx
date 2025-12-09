"use client";
import { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';

export default function ChatPage() {
    const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
        { role: 'bot', text: "Halo! Aku AI pendampingmu. Aku sudah liat hasil tes kamu. Ada yang mau ditanyakan soal langkah selanjutnya?" }
    ]);
    const [input, setInput] = useState('');
    const bottomRef = useRef<HTMLDivElement>(null);
    const [context, setContext] = useState<any>(null);

    useEffect(() => {
        const stored = localStorage.getItem('lastResult');
        if (stored) setContext(JSON.parse(stored).result);
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = input;
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setInput('');

        // --- SIMULASI AI LOGIC (Bisa diganti fetch ke OpenAI API) ---
        // Menggunakan konteks hasil TOPSIS untuk jawaban lebih relevan
        setTimeout(() => {
            let reply = "Hmm, aku butuh info lebih lanjut.";

            const rec = context?.recommendation || "Netral";
            const score = context?.score || 0.5;

            if (userMsg.toLowerCase().includes('chat') || userMsg.toLowerCase().includes('topik')) {
                if (score > 0.7) reply = "Karena skor kamu tinggi, coba topik deep talk! Tanya tentang impian dia atau ketakutan terbesarnya. Dia pasti terbuka.";
                else reply = "Karena skor masih rendah/sedang, hindari topik berat. Kirim meme lucu atau bahas hobi santai dulu aja.";
            }
            else if (userMsg.toLowerCase().includes('ajak') || userMsg.toLowerCase().includes('jalan')) {
                if (score > 0.6) reply = "Gas! Tapi jangan formal date. Ajak 'nemanin cari buku' atau 'makan es krim' biar santai.";
                else reply = "Jangan dulu. Coba cek ombak dengan 'eh tempat ini bagus ya' dan lihat reaksinya, jangan langsung ngajak.";
            }
            else if (userMsg.toLowerCase().includes('galau') || userMsg.toLowerCase().includes('takut')) {
                reply = "Wajar kok takut. Tapi ingat, hasil tes tadi cuma angka. Kalau kamu merasa worth it, pelan-pelan aja. Fokus ke diri sendiri dulu.";
            }
            else {
                reply = `Berdasarkan hasil "${rec}", saranku: Tetap tenang, jangan terlalu agresif, dan perhatikan respon dia selanjutnya.`;
            }

            setMessages(prev => [...prev, { role: 'bot', text: reply }]);
        }, 1000);
        // --- END SIMULASI ---
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="bg-white p-4 shadow-sm z-10">
                <h1 className="font-bold text-center">AI Relationship Assistant</h1>
                {context && <p className="text-xs text-center text-gray-500">Context: {context.recommendation}</p>}
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${m.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-gray-800 border rounded-bl-none'
                            }`}>
                            {m.text}
                        </div>
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>

            <div className="p-4 bg-white border-t">
                <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Tanya saran..."
                        className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:border-blue-500"
                    />
                    <button type="submit" className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
                        <Send size={20} />
                    </button>
                </form>
            </div>
        </div>
    );
}