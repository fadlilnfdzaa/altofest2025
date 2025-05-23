import Link from 'next/link';
import { trackNavigation, trackSocialClick } from '@/utils/clickTracker';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Festival Info */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-4 text-warm-gradient">ALTOFEST 2025</h3>
            <p className="mb-4 text-background/80">
              Nikmati perpaduan budaya yang dinamis melalui musik, seni, dan pertunjukan di festival tahunan kami di Bogor.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/altofest2025"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background hover:text-[#237ea5] transition-colors"
                onClick={() => trackSocialClick('Instagram (Footer Icon)', 'https://www.instagram.com/altofest2025')}
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@altofest_2025"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background hover:text-[#ffc700] transition-colors"
                onClick={() => trackSocialClick('TikTok (Footer Icon)', 'https://www.tiktok.com/@altofest_2025')}
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-4">Menu Cepat</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#about"
                  className="text-background/80 hover:text-[#ffc700] transition-colors"
                  onClick={() => trackNavigation('Tentang Festival (Footer)', '#about')}
                >
                  Tentang Festival
                </Link>
              </li>
              <li>
                <Link
                  href="#lineup"
                  className="text-background/80 hover:text-[#7de6e9] transition-colors"
                  onClick={() => trackNavigation('Lineup Artis (Footer)', '#lineup')}
                >
                  Lineup Artis
                </Link>
              </li>
              <li>
                <Link
                  href="#playlist"
                  className="text-background/80 hover:text-[#ffc700] transition-colors"
                  onClick={() => trackNavigation('Playlist Resmi (Footer)', '#playlist')}
                >
                  Playlist Resmi
                </Link>
              </li>
              <li>
                <Link
                  href="#tickets"
                  className="text-background/80 hover:text-[#237ea5] transition-colors"
                  onClick={() => trackNavigation('Beli Tiket (Footer)', '#tickets')}
                >
                  Beli Tiket
                </Link>
              </li>
              <li>
                <Link
                  href="#sponsors"
                  className="text-background/80 hover:text-[#7a3c20] transition-colors"
                  onClick={() => trackNavigation('Sponsor & Mitra (Footer)', '#sponsors')}
                >
                  Sponsor & Mitra
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-background/80 hover:text-[#ffc700] transition-colors"
                  onClick={() => trackNavigation('Kontak Kami (Footer)', '#contact')}
                >
                  Kontak Kami
                </Link>
              </li>
            </ul>
          </div>

          {/* Festival Info */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-4">Informasi Festival</h3>
            <ul className="space-y-2">
              <li className="text-background/80">
                <span className="block font-medium">Tanggal</span>
                <span>28 Juni 2025</span>
              </li>
              <li className="text-background/80">
                <span className="block font-medium">Lokasi</span>
                <span>Yonif 315 Garuda, Bogor</span>
              </li>
              <li className="text-background/80">
                <span className="block font-medium">Jam</span>
                <span>12:00 - 23:00 WIB</span>
              </li>
              <li className="text-background/80">
                <span className="block font-medium">Media Sosial</span>
                <div className="flex flex-col space-y-1">
                  <a
                    href="https://www.instagram.com/altofest2025"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#7de6e9] hover:underline"
                    onClick={() => trackSocialClick('Instagram (Festival Info)', 'https://www.instagram.com/altofest2025')}
                  >
                    Instagram: @altofest2025
                  </a>
                  <a
                    href="https://www.tiktok.com/@altofest_2025"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#ffc700] hover:underline"
                    onClick={() => trackSocialClick('TikTok (Festival Info)', 'https://www.tiktok.com/@altofest_2025')}
                  >
                    TikTok: @altofest_2025
                  </a>
                </div>
              </li>
            </ul>
          </div>


        </div>

        <div className="mt-12 pt-8 border-t border-background/20 text-center text-background/60 text-sm">
          <p>© {currentYear} ALTOFEST 2025. Seluruh hak cipta dilindungi.</p>
          <div className="mt-2 flex justify-center space-x-6">
            <Link
              href="#"
              className="hover:text-[#ffc700] transition-colors"
              onClick={() => trackNavigation('Kebijakan Privasi (Footer)', '#')}
            >
              Kebijakan Privasi
            </Link>
            <Link
              href="#"
              className="hover:text-[#7de6e9] transition-colors"
              onClick={() => trackNavigation('Syarat & Ketentuan (Footer)', '#')}
            >
              Syarat & Ketentuan
            </Link>
            <Link
              href="#"
              className="hover:text-[#237ea5] transition-colors"
              onClick={() => trackNavigation('Kebijakan Cookie (Footer)', '#')}
            >
              Kebijakan Cookie
            </Link>
            <Link
              href="/stats"
              className="hover:text-[#7a3c20] transition-colors"
              onClick={() => trackNavigation('Statistik (Footer)', '/stats')}
            >
              Statistik
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
