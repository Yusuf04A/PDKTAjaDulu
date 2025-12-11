import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { message, context } = await req.json();
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json(
                { error: "API Key belum disetting" },
                { status: 500 }
            );
        }

        const ai = new GoogleGenAI({ apiKey });

        const contextString = context
            ? `Data Tes Hubungan User: Skor ${context.score}, Rekomendasi: "${context.recommendation}".`
            : "User belum mengambil tes.";

        const fullPrompt = `
      Kamu adalah AI Relationship Assistant (Coach Cinta).
      Gaya bahasa: Santai, gaul, bahasa Indonesia, seperti teman curhat.
      
      Data User: ${contextString}
      Pesan User: "${message}"
      
      Jawablah dengan ringkas (max 3 kalimat) dan solutif.
    `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [
                {
                    role: "user",
                    parts: [{ text: fullPrompt }]
                }
            ],
        });

        // PERBAIKAN DISINI:
        // Hapus tanda kurung (). Jika response.text null, kita ambil manual dari candidates.
        const replyText = response.text || response.candidates?.[0]?.content?.parts?.[0]?.text || "Maaf, aku bingung jawabnya.";

        return NextResponse.json({ reply: replyText });

    } catch (error: any) {
        console.error("Error Gemini Baru:", error);
        return NextResponse.json(
            { error: error.message || "Gagal menghubungi AI" },
            { status: 500 }
        );
    }
}