'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FFC700] backdrop-blur-md border-b border-[#8B4513]/30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
            <img alt="Altofest Logo" width="30" height="30" decoding="async" data-nimg="1" className="w-8 h-10 mr-2 rounded-full" src="/logo.png" />
            <span className="text-2xl font-bold text-[#333333]">ALTOFEST 2025</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <Link href="#about" className="text-[#333333] hover:text-[#8B4513] font-medium transition-colors">
              Tentang
              </Link>
              <Link href="#lineup" className="text-[#333333] hover:text-[#8B4513] font-medium transition-colors">
              Lineup
              </Link>
              <Link href="#playlist" className="text-[#333333] hover:text-[#8B4513] font-medium transition-colors">
                Playlist
              </Link>
              <Link href="#tickets" className="text-[#333333] hover:text-[#8B4513] font-medium transition-colors">
                Tiket
              </Link>
              <Link href="#sponsors" className="text-[#333333] hover:text-[#8B4513] font-medium transition-colors">
                Sponsor
              </Link>
              <Link href="#contact" className="text-[#333333] hover:text-[#8B4513] font-medium transition-colors">
                Kontak
              </Link>
              <Link
                href="#tickets"
                className="bg-[#333333] text-[#FFC700] font-medium py-2 px-6 rounded-full hover:bg-[#444444] transition-all border border-[#FFC700]/50 shadow-md"
              >
                Dapatkan Tiket
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#333333] hover:text-[#8B4513] focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#FFC700]/95 backdrop-blur-md border-t border-[#8B4513]/30">
          <Link
            href="#about"
            className="block px-3 py-2 rounded-md text-base font-medium text-[#333333] hover:text-[#8B4513]"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link
            href="#lineup"
            className="block px-3 py-2 rounded-md text-base font-medium text-[#333333] hover:text-[#8B4513]"
            onClick={() => setIsMenuOpen(false)}
          >
            Lineup
          </Link>
          <Link
            href="#playlist"
            className="block px-3 py-2 rounded-md text-base font-medium text-[#333333] hover:text-[#8B4513]"
            onClick={() => setIsMenuOpen(false)}
          >
            Playlist
          </Link>
          <Link
            href="#tickets"
            className="block px-3 py-2 rounded-md text-base font-medium text-[#333333] hover:text-[#8B4513]"
            onClick={() => setIsMenuOpen(false)}
          >
            Tickets
          </Link>
          <Link
            href="#sponsors"
            className="block px-3 py-2 rounded-md text-base font-medium text-[#333333] hover:text-[#8B4513]"
            onClick={() => setIsMenuOpen(false)}
          >
            Sponsors
          </Link>
          <Link
            href="#contact"
            className="block px-3 py-2 rounded-md text-base font-medium text-[#333333] hover:text-[#8B4513]"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
          <Link
            href="#tickets"
            className="block px-3 py-2 mt-4 bg-[#333333] text-[#FFC700] font-medium rounded-full text-center border border-[#FFC700]/50 shadow-md"
            onClick={() => setIsMenuOpen(false)}
          >
            Get Tickets
          </Link>
        </div>
      </div>
    </nav>
  );
}
