import { GoogleGenerativeAI } from "@google/generative-ai"; // Gunakan GoogleGenerativeAI, bukan GoogleGenAI
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from "next/server";

// Inisialisasi Supabase menggunakan variabel lingkungan
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
    try {
        const { message, resultId } = await req.json(); // Mengambil resultId dari body request
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json(
                { error: "API Key Gemini belum diatur di .env.local" },
                { status: 500 }
            );
        }

        // 1. Ambil data hasil tes dari Supabase berdasarkan resultId
        const { data: testData, error: dbError } = await supabase
            .from('test_results')
            .select('*')
            .eq('id', resultId)
            .single();

        if (dbError) {
            console.error("Database Error:", dbError.message);
        }

        // 2. Inisialisasi GoogleGenerativeAI dengan benar
        const genAI = new GoogleGenerativeAI(apiKey); 
        
        // Gunakan model gemini-1.5-flash
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // 3. Susun konteks untuk AI berdasarkan data database
        const contextString = testData
            ? `Data User: ${testData.user_name}, Nama Crush: ${testData.crush_name}. 
               Hasil Rekomendasi: ${testData.recommendation}. 
               Skor Akhir: ${(testData.overall_score * 100).toFixed(0)}%. 
               Detail Skor Kategori: ${JSON.stringify(testData.category_scores)}.`
            : "User belum mengambil tes kedekatan.";

        const prompt = `
            Kamu adalah Pak Cipto, asisten AI gaul dan bijak di aplikasi "PDKT Aja Dulu".
            Tugasmu: Memberikan saran percintaan berdasarkan data tes user.
            
            Konteks Hubungan User: ${contextString}
            Pertanyaan User: "${message}"
            
            Aturan Jawaban:
            - Gunakan bahasa Indonesia yang santai, akrab (pakai 'kamu', 'aku'), dan agak lucu.
            - Sebut nama user atau crush-nya agar terasa personal.
            - Berikan solusi nyata dan singkat (maksimal 3 kalimat).
        `;

        // 4. Generate konten
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        return NextResponse.json({ reply: responseText });

    } catch (error: any) {
        console.error("Chat API Error:", error);
        return NextResponse.json(
            { error: error.message || "Gagal menghubungi AI" },
            { status: 500 }
        );
    }
}