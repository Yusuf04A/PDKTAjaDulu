export interface Question {
  id: number
  category: string
  text: string
  options: {
    text: string
    score: number
  }[]
}

export const questions: Question[] = [
  // A. Sinyal Ketertarikan
  {
    id: 1,
    category: "Sinyal Ketertarikan",
    text: "Cara dia bales chat kamu gimana?",
    options: [
      { text: "Lama + dingin, kayak nggak niat", score: 1 },
      { text: "Lama dan sekadarnya doang", score: 2 },
      { text: "Kadang cepet, kadang ngilang", score: 3 },
      { text: "Cukup responsif & enak diajak chat", score: 4 },
      { text: "Cepet banget + sering chat duluan", score: 5 },
    ],
  },
  {
    id: 2,
    category: "Sinyal Ketertarikan",
    text: "Kalau kamu chat duluan, respon dia?",
    options: [
      { text: 'Vibes-nya "apaan sih"', score: 1 },
      { text: "Dibales, tapi flat", score: 2 },
      { text: "Oke-oke aja", score: 3 },
      { text: "Dibales sambil ngajak ngobrol", score: 4 },
      { text: "Super excited & lanjut panjang", score: 5 },
    ],
  },
  {
    id: 3,
    category: "Sinyal Ketertarikan",
    text: "Dia pernah nanya soal hidup kamu?",
    options: [
      { text: "Nggak pernah sama sekali", score: 1 },
      { text: "Jarang banget", score: 2 },
      { text: "Kadang-kadang", score: 3 },
      { text: "Lumayan sering", score: 4 },
      { text: "Sering banget, detail pula", score: 5 },
    ],
  },
  {
    id: 4,
    category: "Sinyal Ketertarikan",
    text: "Di tempat rame, dia aware sama kamu?",
    options: [
      { text: "Nggak notice sama sekali", score: 1 },
      { text: "Jarang banget", score: 2 },
      { text: "Kadang ngeh", score: 3 },
      { text: "Lumayan sering nyariin", score: 4 },
      { text: "Selalu nge-spot kamu duluan", score: 5 },
    ],
  },
  {
    id: 5,
    category: "Sinyal Ketertarikan",
    text: "Dia pernah muji kamu?",
    options: [
      { text: "Nggak pernah", score: 1 },
      { text: "Pernah, tapi kaku", score: 2 },
      { text: "Kadang", score: 3 },
      { text: "Beberapa kali dan tulus", score: 4 },
      { text: "Sering & natural", score: 5 },
    ],
  },

  // B. Kenyamanan & Nyambung
  {
    id: 6,
    category: "Kenyamanan & Nyambung",
    text: "Ngobrol sama dia rasanya gimana?",
    options: [
      { text: "Awkward parah", score: 1 },
      { text: "Kadang masih kikuk", score: 2 },
      { text: "B aja", score: 3 },
      { text: "Nyaman", score: 4 },
      { text: "Ngobrolnya ngalir terus", score: 5 },
    ],
  },
  {
    id: 7,
    category: "Kenyamanan & Nyambung",
    text: "Topik obrolan kalian nyambung nggak?",
    options: [
      { text: "Sering mentok", score: 1 },
      { text: "Jarang nyambung", score: 2 },
      { text: "Beberapa topik aja", score: 3 },
      { text: "Cukup sering nyambung", score: 4 },
      { text: "Hampir semua nyambung", score: 5 },
    ],
  },
  {
    id: 8,
    category: "Kenyamanan & Nyambung",
    text: "Pas ngobrol, dia keliatan enjoy?",
    options: [
      { text: "Enggak sama sekali", score: 1 },
      { text: "Kurang keliatan", score: 2 },
      { text: "Kadang iya", score: 3 },
      { text: "Lumayan keliatan", score: 4 },
      { text: "Banget", score: 5 },
    ],
  },
  {
    id: 9,
    category: "Kenyamanan & Nyambung",
    text: "Dia suka cerita hal pribadi?",
    options: [
      { text: "Nggak sama sekali", score: 1 },
      { text: "Dikit banget", score: 2 },
      { text: "Kadang", score: 3 },
      { text: "Cukup terbuka", score: 4 },
      { text: "Terbuka banget", score: 5 },
    ],
  },
  {
    id: 10,
    category: "Kenyamanan & Nyambung",
    text: "Vibe kalian cocok nggak?",
    options: [
      { text: "Kurang cocok", score: 1 },
      { text: "Sering nggak sefrekuensi", score: 2 },
      { text: "Kadang cocok", score: 3 },
      { text: "Kebanyakan cocok", score: 4 },
      { text: "Nyatu banget", score: 5 },
    ],
  },

  // C. Effort & Perlakuan
  {
    id: 11,
    category: "Effort & Perlakuan",
    text: "Biasanya siapa yang mulai chat duluan?",
    options: [
      { text: "Selalu kamu", score: 1 },
      { text: "Lebih sering kamu", score: 2 },
      { text: "Imbang", score: 3 },
      { text: "Lebih sering dia", score: 4 },
      { text: "Hampir selalu dia", score: 5 },
    ],
  },
  {
    id: 12,
    category: "Effort & Perlakuan",
    text: "Dia pernah ngajak ketemu?",
    options: [
      { text: "Nggak pernah", score: 1 },
      { text: "Cuma lempar kode", score: 2 },
      { text: "Pernah sekali", score: 3 },
      { text: "Beberapa kali", score: 4 },
      { text: "Sering", score: 5 },
    ],
  },
  {
    id: 13,
    category: "Effort & Perlakuan",
    text: "Kalau kamu ajak ketemu, responnya?",
    options: [
      { text: "Sering nolak", score: 1 },
      { text: "Lebih sering nolak", score: 2 },
      { text: "Kadang mau", score: 3 },
      { text: "Sering mau", score: 4 },
      { text: "Antusias banget", score: 5 },
    ],
  },
  {
    id: 14,
    category: "Effort & Perlakuan",
    text: "Dia inget detail kecil tentang kamu?",
    options: [
      { text: "Nggak inget sama sekali", score: 1 },
      { text: "Jarang inget", score: 2 },
      { text: "Kadang inget", score: 3 },
      { text: "Lumayan sering", score: 4 },
      { text: "Detail banget", score: 5 },
    ],
  },
  {
    id: 15,
    category: "Effort & Perlakuan",
    text: "Dia ngasih perhatian kecil?",
    options: [
      { text: "Nggak pernah", score: 1 },
      { text: "Sekali-kali", score: 2 },
      { text: "Kadang", score: 3 },
      { text: "Cukup sering", score: 4 },
      { text: "Sering & konsisten", score: 5 },
    ],
  },

  // D. Situasi & Hambatan
  {
    id: 16,
    category: "Situasi & Hambatan",
    text: "Status dia sekarang?",
    options: [
      { text: "Udah punya pasangan", score: 1 },
      { text: "Lagi deket sama orang", score: 2 },
      { text: "Kayaknya suka orang lain", score: 3 },
      { text: "Lagi kosong", score: 4 },
      { text: "Single & bebas", score: 5 },
    ],
  },
  {
    id: 17,
    category: "Situasi & Hambatan",
    text: "Kamu ngerasa dia butuh space?",
    options: [
      { text: "Iya banget", score: 1 },
      { text: "Kayaknya iya", score: 2 },
      { text: "Netral", score: 3 },
      { text: "Kayaknya enggak", score: 4 },
      { text: "Enggak sama sekali", score: 5 },
    ],
  },
  {
    id: 18,
    category: "Situasi & Hambatan",
    text: "Reaksi dia kalau kamu deket sama orang lain?",
    options: [
      { text: "Bodo amat", score: 1 },
      { text: "B aja", score: 2 },
      { text: "Sedikit reaktif", score: 3 },
      { text: "Lumayan peduli", score: 4 },
      { text: "Cemburu", score: 5 },
    ],
  },
  {
    id: 19,
    category: "Situasi & Hambatan",
    text: "Dia pernah ngilang/menghindar?",
    options: [
      { text: "Sering", score: 1 },
      { text: "Lumayan sering", score: 2 },
      { text: "Kadang", score: 3 },
      { text: "Jarang", score: 4 },
      { text: "Nggak pernah", score: 5 },
    ],
  },
  {
    id: 20,
    category: "Situasi & Hambatan",
    text: "Intensitas chat kalian stabil?",
    options: [
      { text: "Chaos banget", score: 1 },
      { text: "Sering ilang", score: 2 },
      { text: "Kadang stabil", score: 3 },
      { text: "Cukup stabil", score: 4 },
      { text: "Stabil banget", score: 5 },
    ],
  },

  // E. Perasaan & Kesiapan Kamu
  {
    id: 21,
    category: "Perasaan & Kesiapan Kamu",
    text: "Kamu serius sama dia?",
    options: [
      { text: "Enggak", score: 1 },
      { text: "Masih ragu", score: 2 },
      { text: "Lumayan", score: 3 },
      { text: "Cukup serius", score: 4 },
      { text: "Serius banget", score: 5 },
    ],
  },
  {
    id: 22,
    category: "Perasaan & Kesiapan Kamu",
    text: "Level kedekatan kalian sekarang?",
    options: [
      { text: "Baru tau nama", score: 1 },
      { text: "Sekadar kenal", score: 2 },
      { text: "Lumayan sering kontak", score: 3 },
      { text: "Cukup dekat", score: 4 },
      { text: "Deket banget", score: 5 },
    ],
  },
  {
    id: 23,
    category: "Perasaan & Kesiapan Kamu",
    text: "Kalau hasilnya nggak sesuai harapan, kamu siap?",
    options: [
      { text: "Enggak siap", score: 1 },
      { text: "Belum siap", score: 2 },
      { text: "Netral", score: 3 },
      { text: "Lumayan siap", score: 4 },
      { text: "Siap banget", score: 5 },
    ],
  },
  {
    id: 24,
    category: "Perasaan & Kesiapan Kamu",
    text: "Kamu punya waktu buat hubungan?",
    options: [
      { text: "Nggak ada", score: 1 },
      { text: "Jarang", score: 2 },
      { text: "Kadang", score: 3 },
      { text: "Ada", score: 4 },
      { text: "Ada banget", score: 5 },
    ],
  },
  {
    id: 25,
    category: "Perasaan & Kesiapan Kamu",
    text: "Fase hidup kalian lagi sejalan?",
    options: [
      { text: "Nggak cocok", score: 1 },
      { text: "Kayaknya enggak", score: 2 },
      { text: "50:50", score: 3 },
      { text: "Cukup cocok", score: 4 },
      { text: "Cocok banget", score: 5 },
    ],
  },
]
