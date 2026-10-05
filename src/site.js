// EDIT FILE INI SAJA untuk ganti isi website per klien.
export default {
  name: ["Kedai", "Sruput"],
  whatsapp: "6281225779801",
  waText: "Halo, saya mau pesan kopi.",
  email: "kedaisruput@gmail.com",
  address: "Jl. Veteran, Bandungan",
  hours: "Setiap hari, 08.00 - 22.00",
  hero: {
    kicker: "Kuat. Halus. Pas.",
    title: "Nggak Ngopi,",
    accent: "Nggak Happy.",
    desc: "Kok bisa ada orang yang menjalani hari tanpa ngopi. Diseduh dari biji pilihan, dibuat dengan sepenuh hati.",
    badges: [
      ["bean", "Biji Pilihan"],
      ["star", "Disangrai Ahli"],
      ["check", "Dibuat Sepenuh Hati"],
    ],
  },
  about: {
    kicker: "Tentang Kami",
    title: "Lebih Dari Sekadar",
    accent: "Kopi",
    desc: "Di sini kopi bukan cuma minuman, tapi pengalaman. Setiap cangkir adalah perpaduan semangat, kualitas, dan rasa yang pas.",
    points: ["Biji dari petani lokal", "Perdagangan yang adil", "Disangrai segar", "Diseduh barista berpengalaman"],
  },
  menu: [
    { name: "Es Kopi Karamel", desc: "Espresso halus dengan karamel dan susu dingin.", price: 22000, img: "/img/menu-1.jpg" },
    { name: "Cappuccino", desc: "Klasik dengan foam tebal dan rasa kopi yang bold.", price: 24000, img: "/img/menu-2.jpg" },
    { name: "Mocha", desc: "Espresso, cokelat, dan susu yang dikukus.", price: 26000, img: "/img/menu-3.jpg" },
    { name: "Espresso", desc: "Kuat, pekat, dan murni dalam satu shot.", price: 18000, img: "/img/menu-4.jpg" },
  ],
  perks: [
    ["truck", "Gratis Ongkir", "Pembelian di atas Rp75.000"],
    ["clock", "Cepat dan Segar", "Dibuat saat dipesan"],
    ["shield", "Bayar Aman", "Transfer atau e-wallet"],
    ["star", "Poin Langganan", "Kumpulin poin tiap beli"],
  ],
  testimonials: [
    { name: "Rina", role: "Mahasiswi", text: "Kopinya enak dan tempatnya nyaman buat ngerjain tugas berjam-jam." },
    { name: "Budi", role: "Karyawan", text: "Pesan antar selalu tepat waktu, kopinya masih hangat pas sampai." },
    { name: "Sari", role: "Event Organizer", text: "Paket acaranya rapi dan harganya jelas dari awal, nggak ada biaya kejutan." },
  ],
  faqs: [
    { q: "Jam buka berapa?", a: "Setiap hari, 08.00 sampai 22.00." },
    { q: "Bisa pesan lewat WhatsApp?", a: "Bisa. Klik tombol WhatsApp, kami balas maksimal 15 menit di jam buka." },
    { q: "Ada pilihan non-kopi?", a: "Ada teh, cokelat, dan susu rasa." },
    { q: "Bisa pesan untuk acara?", a: "Bisa, untuk 20-100 tamu. Chat kami minimal 2 hari sebelumnya." },
  ],
};
