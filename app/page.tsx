// app/page.tsx
import Link from 'next/link';
import { ArrowRight, MessageCircle, BarChart, ShieldCheck, BrainCircuit } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-12">
      
      {/* Hero Section yang 'Nylekit' */}
      <div className="space-y-6 max-w-3xl">
        <div className="inline-block px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-sm font-bold mb-4 animate-pulse">
          ⚠️ Peringatan: Mengandung Fakta Menohok
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight tracking-tight">
          Yah, <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">Ragu Ya</span> Kamu? 😏
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Udah, nggak usah nebak-nebak buah manggis. Daripada <i>overthinking</i> sampe pagi, mending hitung peluangmu pakai logika matematika <b>TOPSIS</b>.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link href="/test" className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-800 transition shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-2">
            Mulai Tes Kebenaran <ArrowRight size={20} />
          </Link>
          <Link href="/chat" className="bg-white border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition flex items-center justify-center gap-2">
            Curhat ke AI Aja
          </Link>
        </div>
      </div>

      {/* Feature Grid / Disclaimer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left mt-10">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
            <BrainCircuit size={24} />
          </div>
          <h3 className="font-bold text-lg mb-2">Bukan Ramalan Dukun</h3>
          <p className="text-gray-500 text-sm">Kita pakai metode SPK (Sistem Pendukung Keputusan). Hasilnya berdasarkan data yang kamu input, bukan zodiak.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-4">
            <BarChart size={24} />
          </div>
          <h3 className="font-bold text-lg mb-2">Analisis Chat</h3>
          <p className="text-gray-500 text-sm">Upload screenshot chat dia. Biar AI yang nilai, itu dia emang cuek atau kamu aja yang gak peka.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
          <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center text-pink-600 mb-4">
            <ShieldCheck size={24} />
          </div>
          <h3 className="font-bold text-lg mb-2">Privasi Aman</h3>
          <p className="text-gray-500 text-sm">Data chat dan hasil tes cuma disimpan di browsermu (LocalStorage). Kita gak kepo kok.</p>
        </div>
      </div>
    </div>
  );
}