import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// 1. Inisialisasi client Supabase dengan variable dari .env.local
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(req: Request) {
  try {
    // 2. Ambil data yang dikirim dari frontend
    const body = await req.json()
    const { score, recommendation, categoryScores, userName, crushName } = body

    // 3. Validasi data sederhana untuk memastikan data penting tidak kosong
    if (score === undefined || !categoryScores) {
      return NextResponse.json(
        { error: "Data hasil tes tidak lengkap" },
        { status: 400 }
      )
    }

    // 4. Masukkan data ke tabel 'test_results' di Supabase
    const { data, error } = await supabase
      .from('test_results')
      .insert([
        { 
          overall_score: score, 
          recommendation: recommendation,
          category_scores: categoryScores,
          user_name: userName, 
          crush_name: crushName 
        }
      ])
      .select() // Mengembalikan data yang baru saja dimasukkan

    // 5. Jika terjadi error saat insert ke database
    if (error) {
      console.error("Error inserting to Supabase:", error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // 6. Kembalikan ID hasil tes (UUID) ke frontend
    // ID ini penting untuk digunakan pada fitur Chat nantinya
    return NextResponse.json({ 
      success: true, 
      id: data[0].id 
    })

  } catch (error: any) {
    // Menangani error tak terduga (misal: JSON tidak valid)
    console.error("Internal Server Error:", error.message)
    return NextResponse.json(
      { error: "Gagal memproses permintaan" },
      { status: 500 }
    )
  }
}