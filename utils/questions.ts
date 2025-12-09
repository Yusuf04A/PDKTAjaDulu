export type Question = {
    id: number;
    category: string;
    text: string;
    options: { score: number; text: string }[];
};

export const questions: Question[] = [
    // --- A. Sinyal Ketertarikan ---
    {
        id: 1,
        category: "Interest",
        text: "Bagaimana dia membalas chat kamu?",
        options: [
            { score: 1, text: "Sangat lama & jawab seperlunya" },
            { score: 2, text: "Lama & singkat" },
            { score: 3, text: "Sesekali responsif" },
            { score: 4, text: "Cukup cepat & ramah" },
            { score: 5, text: "Cepat dan sering memulai duluan" },
        ],
    },
    {
        id: 2,
        category: "Interest",
        text: "Kalau kamu ngechat duluan, respon dia gimana?",
        options: [
            { score: 1, text: "Kayak terpaksa" },
            { score: 2, text: "Hambar" },
            { score: 3, text: "Lumayan responsif" },
            { score: 4, text: "Ngajak ngobrol balik" },
            { score: 5, text: "Antusias & lanjut terus" },
        ],
    },
    {
        id: 3,
        category: "Interest",
        text: "Apa dia pernah menunjukkan rasa penasaran tentang hidup kamu?",
        options: [
            { score: 1, text: "Tidak pernah" },
            { score: 2, text: "Jarang banget" },
            { score: 3, text: "Kadang" },
            { score: 4, text: "Cukup sering" },
            { score: 5, text: "Sering dan detail banget" },
        ],
    },
    {
        id: 4,
        category: "Interest",
        text: "Dalam keramaian, dia memperhatikan kamu?",
        options: [
            { score: 1, text: "Tidak sama sekali" },
            { score: 2, text: "Jarang" },
            { score: 3, text: "Sesekali" },
            { score: 4, text: "Cukup sering" },
            { score: 5, text: "Selalu sadar keberadaan kamu" },
        ],
    },
    {
        id: 5,
        category: "Interest",
        text: "Apakah dia pernah memuji kamu?",
        options: [
            { score: 1, text: "Tidak pernah" },
            { score: 2, text: "Sekali tapi ga niat" },
            { score: 3, text: "Kadang" },
            { score: 4, text: "Beberapa kali dengan tulus" },
            { score: 5, text: "Sering dan spontan" },
        ],
    },
    // --- B. Kenyamanan & Kecocokan ---
    {
        id: 6,
        category: "Compatibility",
        text: "Seberapa nyaman kamu ngobrol dengannya?",
        options: [
            { score: 1, text: "Canggung banget" },
            { score: 2, text: "Kadang kikuk" },
            { score: 3, text: "Netral" },
            { score: 4, text: "Nyaman" },
            { score: 5, text: "Super nyaman kayak teman lama" },
        ],
    },
    {
        id: 7,
        category: "Compatibility",
        text: "Apakah kalian punya obrolan yang nyambung?",
        options: [
            { score: 1, text: "Tidak nyambung" },
            { score: 2, text: "Jarang nyambung" },
            { score: 3, text: "Beberapa topik doang" },
            { score: 4, text: "Cukup sering" },
            { score: 5, text: "Hampir semua topik nyambung" },
        ],
    },
    {
        id: 8,
        category: "Compatibility",
        text: "Ketika ngobrol, dia terlihat menikmati?",
        options: [
            { score: 1, text: "Tidak" },
            { score: 2, text: "Kurang" },
            { score: 3, text: "Kadang iya" },
            { score: 4, text: "Cukup" },
            { score: 5, text: "Jelas menikmati" },
        ],
    },
    {
        id: 9,
        category: "Compatibility",
        text: "Apakah dia terbuka bercerita hal pribadi?",
        options: [
            { score: 1, text: "Nggak pernah" },
            { score: 2, text: "Kecil-kecilan" },
            { score: 3, text: "Sedikit terbuka" },
            { score: 4, text: "Lumayan" },
            { score: 5, text: "Sangat terbuka" },
        ],
    },
    {
        id: 10,
        category: "Compatibility",
        text: "Apakah kamu merasa energi kalian cocok?",
        options: [
            { score: 1, text: "Tidak cocok" },
            { score: 2, text: "Sering bentrok vibe" },
            { score: 3, text: "Kadang cocok" },
            { score: 4, text: "Mayoritas cocok" },
            { score: 5, text: "Cocok banget" },
        ],
    },
    // --- C. Effort & Tindakan Nyata ---
    {
        id: 11,
        category: "Effort",
        text: "Siapa yang lebih sering memulai komunikasi?",
        options: [
            { score: 1, text: "Selalu kamu" },
            { score: 2, text: "80% kamu" },
            { score: 3, text: "Seimbang" },
            { score: 4, text: "70% dia" },
            { score: 5, text: "Selalu dia duluan" },
        ],
    },
    {
        id: 12,
        category: "Effort",
        text: "Apakah dia pernah ngajak ketemu?",
        options: [
            { score: 1, text: "Tidak pernah" },
            { score: 2, text: "Tidak secara langsung" },
            { score: 3, text: "Sekali" },
            { score: 4, text: "Beberapa kali" },
            { score: 5, text: "Sering" },
        ],
    },
    {
        id: 13,
        category: "Effort",
        text: "Bagaimana respon dia saat kamu ngajak ketemu?",
        options: [
            { score: 1, text: "Selalu menolak" },
            { score: 2, text: "Sering menolak" },
            { score: 3, text: "Kadang mau" },
            { score: 4, text: "Cukup sering mau" },
            { score: 5, text: "Selalu semangat" },
        ],
    },
    {
        id: 14,
        category: "Effort",
        text: "Apakah dia ingat detail kecil tentang kamu?",
        options: [
            { score: 1, text: "Tidak" },
            { score: 2, text: "Jarang" },
            { score: 3, text: "Kadang" },
            { score: 4, text: "Cukup sering" },
            { score: 5, text: "Sering banget" },
        ],
    },
    {
        id: 15,
        category: "Effort",
        text: "Apakah dia pernah melakukan hal kecil yang menunjukkan perhatian?",
        options: [
            { score: 1, text: "Tidak" },
            { score: 2, text: "Jarang" },
            { score: 3, text: "Sekali-dua kali" },
            { score: 4, text: "Beberapa kali" },
            { score: 5, text: "Sering & konsisten" },
        ],
    },
    // --- D. Situasi Hubungan & Hambatan ---
    {
        id: 16,
        category: "Barrier",
        text: "Status hubungan dia saat ini?",
        options: [
            { score: 1, text: "Sudah punya pasangan" },
            { score: 2, text: "Sedang dekat dengan orang lain" },
            { score: 3, text: "Kayaknya punya ketertarikan sama orang lain" },
            { score: 4, text: "Tidak sedang dekat siapa pun" },
            { score: 5, text: "Single dan terbuka" },
        ],
    },
    {
        id: 17,
        category: "Barrier",
        text: "Apakah kamu merasa dia butuh ruang?",
        options: [
            { score: 1, text: "Jelas iya" },
            { score: 2, text: "Sepertinya iya" },
            { score: 3, text: "Netral" },
            { score: 4, text: "Tidak" },
            { score: 5, text: "Jelas tidak" },
        ],
    },
    {
        id: 18,
        category: "Barrier",
        text: "Bagaimana reaksi dia kalau kamu terlihat dekat dengan orang lain?",
        options: [
            { score: 1, text: "Nggak peduli" },
            { score: 2, text: "B aja" },
            { score: 3, text: "Sedikit reaktif" },
            { score: 4, text: "Lumayan peduli" },
            { score: 5, text: "Cemburu jelas" },
        ],
    },
    {
        id: 19,
        category: "Barrier",
        text: "Apakah dia pernah menghindari kamu?",
        options: [
            { score: 1, text: "Sering" },
            { score: 2, text: "Cukup sering" },
            { score: 3, text: "Kadang" },
            { score: 4, text: "Hampir tidak pernah" },
            { score: 5, text: "Tidak pernah" },
        ],
    },
    {
        id: 20,
        category: "Barrier",
        text: "Kalian punya frekuensi komunikasi yang stabil?",
        options: [
            { score: 1, text: "Tidak stabil" },
            { score: 2, text: "Sering hilang" },
            { score: 3, text: "Kadang stabil" },
            { score: 4, text: "Cukup stabil" },
            { score: 5, text: "Sangat stabil" },
        ],
    },
    // --- E. Perasaan Kamu & Keyakinan ---
    {
        id: 21,
        category: "Readiness",
        text: "Seberapa yakin kamu bahwa kamu benar-benar serius sama dia?",
        options: [
            { score: 1, text: "Tidak yakin" },
            { score: 2, text: "Ragu" },
            { score: 3, text: "Lumayan" },
            { score: 4, text: "Cukup yakin" },
            { score: 5, text: "Yakin banget" },
        ],
    },
    {
        id: 22,
        category: "Readiness",
        text: "Tingkat kenalan kalian?",
        options: [
            { score: 1, text: "Baru kenal" },
            { score: 2, text: "Kenalan doang" },
            { score: 3, text: "Lumayan sering kontak" },
            { score: 4, text: "Dekat" },
            { score: 5, text: "Sudah sangat dekat" },
        ],
    },
    {
        id: 23,
        category: "Readiness",
        text: "Apakah kamu siap menghadapi hasil yang tidak sesuai harapan?",
        options: [
            { score: 1, text: "Tidak siap" },
            { score: 2, text: "Kurang siap" },
            { score: 3, text: "Netral" },
            { score: 4, text: "Cukup siap" },
            { score: 5, text: "Siap banget" },
        ],
    },
    {
        id: 24,
        category: "Readiness",
        text: "Apakah kamu punya waktu/energi buat hubungan?",
        options: [
            { score: 1, text: "Tidak" },
            { score: 2, text: "Jarang" },
            { score: 3, text: "Tergantung" },
            { score: 4, text: "Cukup punya" },
            { score: 5, text: "Sangat punya" },
        ],
    },
    {
        id: 25,
        category: "Readiness",
        text: "Apakah secara objektif kalian berada di fase hidup yang cocok?",
        options: [
            { score: 1, text: "Tidak cocok" },
            { score: 2, text: "Kayaknya tidak" },
            { score: 3, text: "50:50" },
            { score: 4, text: "Cukup cocok" },
            { score: 5, text: "Cocok" },
        ],
    },
];