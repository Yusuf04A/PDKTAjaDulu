import Link from 'next/link';
import { ArrowRight, MessageCircle, BarChart } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Bingung Sama Si Dia? 🤔
      </h1>
      <p className="text-gray-600 max-w-md mb-8">
        Bantu kamu ambil keputusan rasional dalam pendekatan. 
        Pakai algoritma TOPSIS, bukan sekadar tebak-tebakan.
      </p>

      <div className="grid gap-4 w-full max-w-sm">
        <Link href="/test" className="bg-blue-600 text-white p-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition">
          Mulai Tes (25 Soal) <ArrowRight size={20} />
        </Link>
        <div className="flex gap-4">
          <Link href="/chat" className="flex-1 bg-white border border-gray-200 p-4 rounded-xl text-gray-700 font-medium flex items-center justify-center gap-2 hover:bg-gray-100">
            <MessageCircle size={18} /> Tanya AI
          </Link>
          <Link href="/analysis" className="flex-1 bg-white border border-gray-200 p-4 rounded-xl text-gray-700 font-medium flex items-center justify-center gap-2 hover:bg-gray-100">
            <BarChart size={18} /> Cek Chat
          </Link>
        </div>
      </div>
      
      <p className="mt-12 text-xs text-gray-400">
        Disclaimer: Hasil adalah rekomendasi matematis, bukan ramalan masa depan.
      </p>
    </main>
  );
}