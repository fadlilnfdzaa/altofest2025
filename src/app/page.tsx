import Image from "next/image";
import Link from "next/link";

// Import components
import Navbar from "@/components/Navbar";
import TicketCard from "@/components/TicketCard";
import ArtistCard from "@/components/ArtistCard";
import SponsorCard from "@/components/SponsorCard";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  // Sample artist data
  const artists = [
    {
      name: "Maliq & D'Essentials",
      genre: "Pop Jazz",
      country: "Indonesia",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000",
      day: "Sabtu",
      time: "20:00 WIB",
      stage: "Panggung Utama",
      featured: true
    },
    {
      name: "Reality Club",
      genre: "Indie Rock",
      country: "Indonesia",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000",
      day: "Sabtu",
      time: "18:30 WIB",
      stage: "Panggung Utama",
      featured: false
    },
    {
      name: "The Changcuters",
      genre: "Rock",
      country: "Indonesia",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1000",
      day: "Sabtu",
      time: "17:00 WIB",
      stage: "Panggung Utama",
      featured: false
    },
    {
      name: "Ensemble Angklung Udjo",
      genre: "Tradisional Sunda",
      country: "Indonesia",
      image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=1000",
      day: "Sabtu",
      time: "16:00 WIB",
      stage: "Panggung Budaya",
      featured: false
    },
    {
      name: "Kacapi Suling Mang Koko",
      genre: "Tradisional Sunda",
      country: "Indonesia",
      image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1000",
      day: "Sabtu",
      time: "15:30 WIB",
      stage: "Panggung Budaya",
      featured: false
    },
    {
      name: "Gamelan Degung Parahyangan",
      genre: "Tradisional Sunda",
      country: "Indonesia",
      image: "https://images.unsplash.com/photo-1504704911898-68304a7d2807?q=80&w=1000",
      day: "Sabtu",
      time: "14:00 WIB",
      stage: "Panggung Budaya",
      featured: false
    }
  ];

  // Sample sponsor data
  const sponsors = [
    {
      name: "Global Sounds",
      logo: "https://placehold.co/400x200/7a3c20/ffffff?text=Global+Sounds",
      level: "platinum",
      description: "Leading music production company supporting cultural diversity through sound.",
      website: "https://example.com"
    },
    {
      name: "Harmony Drinks",
      logo: "https://placehold.co/400x200/ffc700/ffffff?text=Harmony+Drinks",
      level: "gold",
      description: "Refreshing beverages inspired by global flavors and traditions.",
      website: "https://example.com"
    },
    {
      name: "Cultural Exchange Foundation",
      logo: "https://placehold.co/400x200/7de6e9/333333?text=Cultural+Exchange",
      level: "gold",
      description: "Non-profit organization promoting cultural understanding through arts.",
      website: "https://example.com"
    },
    {
      name: "Rhythm Tech",
      logo: "https://placehold.co/400x200/237ea5/ffffff?text=Rhythm+Tech",
      level: "silver",
      description: "Innovative audio technology for musicians and performers worldwide.",
      website: "https://example.com"
    }
  ];

  // Ticket options
  const ticketOptions = [
    {
      type: "Tiket PROMO BALAREA 1",
      price: "Rp115.000",
      features: [
        "Akses ke Stage Festival",
        "Akses area kuliner",
        "Emina Sun Battle Bright Glow SPF 35 PA+++",
        "Emina Hand Fan",
        "Emina Paperbag",
        "Dengan Harga Lebih Murah*"
      ],
      link:"https://wa.me/6285775137051?text=Halo%20kak%20Saya%20mau%20pesan%20harga%20115k%20tiket%20Altofest%202025%0A- Email%20%3A%20%0A- Nama%20%3A%20%0A- Tanggal%20Lahir%20%3A%20%0A- Nama%20sekolah%20%2F%20kampus%20%3A%20%0A- Gender%20%3A%20%0A- No%20WA%20%3A%20%0A- INSTAGRAM%20%3A%20%0A- Mendapatkan%20info%20dari%20%3A%20%0A%0A-%20Transfer%20pembelian%20Tiket%20ke%20Nomor%20Dana%20%3A%20*085775137051*%20atau%20norek%20%3A1740-1529-78%20a.n%20%3A%20Mawardiansyah%20Bank%20BCA%F0%9F%99%8F%F0%9F%A4%97",
      popular: true,
      gradient: "full" as const
    },
    {
      type: "Tiket BALAREA 1",
      price: "Rp155.000",
      features: [
        "Akses ke Stage Festival",
        "Akses area kuliner",
        "Produk Emina + 1 voucher tenant"
      ],
      link:"https://www.yesplis.com/event/altofest-2025/tickets?fbclid=PAQ0xDSwKJcU1leHRuA2FlbQIxMQABpywaEns-gIT6HYtRNSHhyJkqCkaMWODxNjfaq7uGtdjLPQ4nBZtbiZ5vhbpe_aem_wykXFEoVePIN1b_gytl2Aw",
      popular: false,
      gradient: "warm" as const
    },
    {
      type: "Tiket VIP",
      price: "Rp305.000",
      features: [
        "Area menonton premium",
        "Fast Track Entry",
        "Akses Toilet Portabel Khusus",
        "Produk Emina",
        "2 Voucher Tenant",
        "Merchandise"
      ],
      link:"https://www.yesplis.com/event/altofest-2025/tickets?fbclid=PAQ0xDSwKJcU1leHRuA2FlbQIxMQABpywaEns-gIT6HYtRNSHhyJkqCkaMWODxNjfaq7uGtdjLPQ4nBZtbiZ5vhbpe_aem_wykXFEoVePIN1b_gytl2Aw",
      popular: false,
      gradient: "cool" as const
    },
    {
      type: "Balarea 1 Rombongan 3",
      price: "Rp145.000",
      features: [
        "Harga per orang",
        "Minimal pembelian 3 tiket",
        "Akses ke Stage Festival",
        "Akses area kuliner",
        "Produk Emina + 1 voucher tenant"
      ],
      link:"https://www.yesplis.com/event/altofest-2025/tickets?fbclid=PAQ0xDSwKJcU1leHRuA2FlbQIxMQABpywaEns-gIT6HYtRNSHhyJkqCkaMWODxNjfaq7uGtdjLPQ4nBZtbiZ5vhbpe_aem_wykXFEoVePIN1b_gytl2Aw",
      popular: false,
      gradient: "warm" as const
    },
    {
      type: "Balarea 1 Rombongan 5",
      price: "Rp135.000",
      features: [
        "Harga per orang",
        "Minimal pembelian 5 tiket",
        "Akses ke Stage Festival",
        "Akses area kuliner",
        "Produk Emina + 1 voucher tenant"
      ],
      link:"https://www.yesplis.com/event/altofest-2025/tickets?fbclid=PAQ0xDSwKJcU1leHRuA2FlbQIxMQABpywaEns-gIT6HYtRNSHhyJkqCkaMWODxNjfaq7uGtdjLPQ4nBZtbiZ5vhbpe_aem_wykXFEoVePIN1b_gytl2Aw",
      popular: false,
      gradient: "warm" as const
    }
  ];

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background with gold/yellow gradient to match reference image */}
        <div className="absolute inset-0 bg-[#FFC700] bg-cover bg-center">
          {/* Main gradient overlay - gold/yellow with brown edges */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#8B4513]/60 via-[#FFC700]/90 to-[#8B4513]/60"></div>
          {/* Additional gradient for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#333333]/30 via-transparent to-[#333333]/20"></div>
          {/* Subtle overlay for text readability */}
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        {/* Animated decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating circles */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#4ECDC4]/20 blur-3xl animate-float"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-[#FFC700]/30 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-2/3 left-1/3 w-48 h-48 rounded-full bg-[#8B4513]/20 blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>

          {/* Decorative shapes */}
          <div className="absolute top-20 right-20 w-32 h-32 rotate-45 bg-[#4ECDC4]/15 rounded-xl animate-pulse-slow"></div>
          <div className="absolute bottom-40 left-20 w-24 h-24 rotate-12 bg-[#FFC700]/20 rounded-xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-float">
            <span className="block text-white drop-shadow-lg">ALTOFEST 2025</span>
            <span className="block text-2xl md:text-3xl lg:text-4xl mt-2 text-white drop-shadow-lg">Muda Sunda, Jaga Budaya</span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-[#333333] drop-shadow-lg">
          🎉SIAPIN DIRI BUAT FESTIVAL PALING WELL TAHUN INI! TIKET HEHEULAAN 115K TERAKHIR, JANGAN SAMPAI KETINGGALAN!🎉
          </p>

          {/* Info badges with enhanced styling */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="bg-[#333333]/80 backdrop-blur-md px-6 py-3 rounded-full border border-[#FFC700]/50 shadow-lg">
              <span className="font-bold text-[#FFC700]">📅 28 Juni 2025 </span>
            </div>
            <div className="bg-[#333333]/80 backdrop-blur-md px-6 py-3 rounded-full border border-[#FFC700]/50 shadow-lg">
              <span className="font-bold text-[#FFC700]">📍Bogor, Indonesia </span>
            </div>
          </div>

          {/* Enhanced buttons */}
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href="#tickets"
              className="bg-[#333333] text-[#FFC700] font-bold py-4 px-10 rounded-full text-lg shadow-lg border border-[#FFC700]/50 hover:bg-[#444444] transition-all"
            >
              Dapatkan Tiket
            </Link>
            <Link
              href="#lineup"
              className="bg-[#FFC700] backdrop-blur-sm hover:bg-[#FFD700] text-[#333333] font-bold py-4 px-10 rounded-full text-lg transition-all border border-[#333333]/20 shadow-lg hover:shadow-xl"
            >
              Lihat Lineup
            </Link>
          </div>
        </div>

        {/* Enhanced decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent"></div>

      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-festival-gradient">🎶 Tentang Festival</h2>
            <div className="w-24 h-1 bg-festival-gradient mx-auto mb-8"></div>
            <p className="text-lg max-w-3xl mx-auto">
            ALTOFEST 2025 adalah festival musik dan budaya terbesar di Bogor yang menampilkan kolaborasi antara musisi nasional dan seniman tradisional Sunda.
            <br></br>Diselenggarakan oleh @alto.eo dan didukung oleh @alumnitutorial, festival ini akan berlangsung pada 28 Juni 2025 di Yonif 315 Garuda, Bogor. Jangan lewatkan kesempatan untuk menikmati pengalaman budaya dan musik yang tak terlupakan!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-foreground/5 p-8 rounded-2xl text-center">
              <div className="w-16 h-16 bg-warm-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Line-up Spektakuler</h3>
              <p className="text-foreground/70">
                Nikmati penampilan dari grup musik populer dan seniman tradisional Sunda lokal, termasuk Maliq & D'Essentials, Reality Club, The Changcuters, dan kolaborasi spesial dengan musisi tradisional.
              </p>
            </div>

            <div className="bg-foreground/5 p-8 rounded-2xl text-center">
              <div className="w-16 h-16 bg-cool-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Pengalaman Lengkap</h3>
              <p className="text-foreground/70">
                Selain musik, nikmati berbagai workshop budaya, pameran seni, dan kuliner khas Sunda yang akan membuat pengalaman festival Anda semakin berkesan.
              </p>
            </div>

            <div className="bg-foreground/5 p-8 rounded-2xl text-center">
              <div className="w-16 h-16 bg-festival-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Lokasi Strategis</h3>
              <p className="text-foreground/70">
                Bertempat di Yonif 315 Garuda Bogor, lokasi yang nyaman dan mudah diakses dari Jakarta dan kota-kota sekitar. Area parkir luas dan fasilitas lengkap tersedia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lineup Section */}
      <section id="lineup" className="py-20 bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-warm-gradient">Lineup Artis</h2>
            <div className="w-24 h-1 bg-warm-gradient mx-auto mb-8"></div>
            <p className="text-lg max-w-3xl mx-auto text-background/80">
              Saksikan penampilan spektakuler dari Maliq & D'Essentials, Reality Club, The Changcuters, dan kolaborasi spesial dengan seniman tradisional Sunda dalam satu panggung megah!
            </p>
          </div>

          {/* Single lineup poster */}
          <div className="flex justify-center mb-12">
            <div className="relative max-w-4xl w-full overflow-hidden rounded-2xl shadow-2xl transition-all hover:shadow-[0_0_30px_rgba(255,199,0,0.3)]">
              {/* Poster image */}
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <img
                  src="/altofest-lineup-poster.png"
                  alt="ALTOFEST 2025 Lineup Poster"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />

                {/* Overlay gradient for better text visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                {/* Poster caption */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
                  <h3 className="text-xl md:text-2xl font-bold mb-2">ALTOFEST 2025 LINEUP</h3>
                  <p className="text-sm md:text-base opacity-90">
                    Featuring Maliq & D'Essentials, Reality Club, The Changcuters, HIVI!, Rumahsakit, and more!
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="#tickets"
              className="bg-warm-gradient text-white font-bold py-3 px-8 rounded-full hover:shadow-lg transition-all"
            >
              Dapatkan Tiket Sekarang
            </Link>
          </div>
        </div>
      </section>

      {/* Spotify Playlist Section */}
      <section id="playlist" className="py-20 bg-background relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#7a3c20]/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#237ea5]/10 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-festival-gradient">🎧 Playlist Resmi</h2>
            <div className="w-24 h-1 bg-festival-gradient mx-auto mb-8"></div>
            <p className="text-lg max-w-3xl mx-auto">
              Rasakan semangat ALTOFEST 2025 melalui playlist resmi kami! Dengarkan lagu-lagu dari para artis yang akan tampil dan nikmati perpaduan musik modern dan tradisional Sunda yang akan mengisi festival.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="bg-foreground/5 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-[#ffc700]/20 max-w-3xl w-full hover:shadow-[0_0_30px_rgba(255,199,0,0.15)] transition-all">
              {/* Desktop version - hidden on small screens, shown on medium and up */}
              <div className="hidden md:block relative aspect-[16/9] w-full overflow-hidden rounded-xl">
                <iframe
                  src="https://open.spotify.com/embed/playlist/1GCAhSB8i64V4CWctPcyHY?utm_source=generator&theme=0"
                  width="100%"
                  height="100%"
                  style={{minHeight: '380px', border: 0}}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="absolute inset-0 hidden md:block"
                ></iframe>
              </div>

              {/* Mobile version - shown on small screens, hidden on medium and up */}
              <div className="md:hidden relative w-full overflow-hidden rounded-xl">
                <iframe
                  src="https://open.spotify.com/embed/playlist/1GCAhSB8i64V4CWctPcyHY?utm_source=generator&theme=0"
                  width="100%"
                  height="160"
                  style={{border: 0}}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                ></iframe>
              </div>

              <div className="mt-6 text-center">
                <p className="text-foreground/70 text-sm">
                  Dengarkan playlist ini untuk merasakan nuansa ALTOFEST 2025 dan bersiap untuk pengalaman festival yang tak terlupakan!
                </p>
                <a
                  href="https://open.spotify.com/playlist/1GCAhSB8i64V4CWctPcyHY?si=HUusrE_rQK-remtbAUWopQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 bg-[#1DB954] text-white font-bold py-2 px-6 rounded-full text-sm hover:bg-[#1ED760] transition-all"
                >
                  Buka di Spotify
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tickets Section */}
      <section id="tickets" className="py-20 bg-background relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#ffc700]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#7de6e9]/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-cool-gradient">Beli Tiket Sekarang!</h2>
            <div className="w-24 h-1 bg-cool-gradient mx-auto mb-8"></div>
            <p className="text-lg max-w-3xl mx-auto">
              Jangan lewatkan kesempatan untuk menjadi bagian dari ALTOFEST 2025! Tiket presale masih tersedia dengan harga spesial mulai dari Rp115.000. Segera beli sebelum harga naik! Gunakan kode referral untuk mendapatkan diskon tambahan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ticketOptions.map((ticket, index) => (
              <TicketCard
                key={index}
                type={ticket.type}
                price={ticket.price}
                features={ticket.features}
                link={ticket.link}
                popular={ticket.popular}
                gradient={ticket.gradient}
              />
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-foreground/70 mb-4">
              Diskon grup tersedia untuk rombongan 3 orang atau lebih. Pembelian tiket resmi hanya melalui official partner dan website <a href="https://www.yesplis.com/event/altofest-2025" className="text-[#237ea5] hover:underline">www.yesplis.com/event/altofest-2025</a>
            </p>
            <Link
              href="#contact"
              className="text-[#237ea5] hover:underline font-medium"
            >
              Punya pertanyaan tentang tiket? Hubungi tim kami via WhatsApp →
            </Link>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section id="sponsors" className="py-20 bg-foreground/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-3">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-festival-gradient">Jadi Sponsor & Tenant</h2>
            <div className="w-24 h-1 bg-festival-gradient mx-auto"></div>
          </div>

          <div className="mt-3 text-center">
            <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
              Jadilah bagian dari ALTOFEST 2025! Kami menawarkan kesempatan kerjasama untuk menampilkan brand Anda kepada 5000+ pengunjung festival. Tersedia paket sponsor dan tenant makanan/minuman/merchandise dengan berbagai keuntungan menarik.
            </p>
            <Link
              href="#contact"
              className="btn-festival text-white font-bold py-3 px-8 rounded-full"
            >
              Jadi Mitra Kami
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-festival-gradient">Kontak Kami</h2>
            <div className="w-24 h-1 bg-festival-gradient mx-auto mb-8"></div>
            <p className="text-lg max-w-3xl mx-auto">
              Punya pertanyaan atau butuh bantuan? Tim kami siap membantu Anda dengan segala pertanyaan tentang ALTOFEST 2025, pembelian tiket, atau kerjasama. Hubungi kami via WhatsApp atau isi formulir di bawah ini.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-foreground/5 p-8 rounded-2xl">
              <ContactForm type="ticket" />
            </div>

            <div className="bg-foreground/5 p-8 rounded-2xl">
              <ContactForm type="sponsor" />
            </div>

            <div className="bg-foreground/5 p-8 rounded-2xl">
              <ContactForm type="tenant" />
            </div>

            <div className="bg-foreground/5 p-8 rounded-2xl">
              <ContactForm type="general" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
}
