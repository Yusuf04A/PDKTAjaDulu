import { GoogleGenAI } from "@google/genai"
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from "next/server"

// Inisialisasi Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { message, resultId } = await req.json()

    // 1. Ambil data hasil tes dari Supabase agar Pak Cipto tahu konteksnya
    let testData = null
    if (resultId) {
      const { data } = await supabase
        .from('test_results')
        .select('*')
        .eq('id', resultId)
        .maybeSingle()
      testData = data
    }

    // 2. Susun data user untuk dimasukkan ke dalam prompt
    const infoHubungan = testData 
      ? `User: ${testData.user_name}, Crush: ${testData.crush_name}. Skor: ${(testData.overall_score * 100).toFixed(0)}%. Rekomendasi: ${testData.recommendation}.`
      : "Data hubungan tidak ditemukan."

    // 3. Gabungkan pesan user dengan instruksi kepribadian Pak Cipto
    const promptPakCipto = `
      Kamu adalah Pak Cipto, seorang pakar cinta gaul dan bijak di aplikasi "PDKT Aja Dulu".
      Tugasmu: Memberikan saran percintaan yang santai tapi ngena.
      
      Konteks Hubungan saat ini: ${infoHubungan}
      Pertanyaan User: "${message}"
      
      Aturan Jawaban:
      - Gunakan bahasa Indonesia santai (pakai 'aku', 'kamu').
      - Harus terasa seperti pakar cinta yang asik dan agak lucu.
      - Sebut nama user atau crush-nya jika ada di data agar personal.
      - Maksimal 3 kalimat saja.
    `

    // 4. Kirim ke AI menggunakan struktur yang kamu inginkan
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // Mengikuti string model yang kamu berikan
      contents: promptPakCipto,
    })

    return NextResponse.json({
      reply: response.text,
    })
  } catch (error: any) {
    console.error("Gemini Error:", error)
    return NextResponse.json(
      { error: "Pak Cipto lagi galau, coba lagi nanti ya!" },
      { status: 500 }
    )
  }
}