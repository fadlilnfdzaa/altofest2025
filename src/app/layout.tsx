import type { Metadata } from "next";
import { Poppins, Montserrat, Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Main font for body text
const poppins = Poppins({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});


// Display font for headings and accents
const montserrat = Montserrat({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ALTOFEST 2025 | Festival Budaya Sunda Kulon",
  description: "ALTOFEST 2025 adalah festival musik dan budaya terbesar di Bogor yang menampilkan kolaborasi antara musisi nasional dan seniman tradisional Sunda. Diselenggarakan oleh @alto.eo dan didukung oleh @alumnitutorial, festival ini akan berlangsung pada 28 Juni 2025 di Yonif 315 Garuda, Bogor. Jangan lewatkan kesempatan untuk menikmati pengalaman budaya dan musik yang tak terlupakan!",
  keywords: ["music festival", "cultural festival", "live music", "art", "performances", "tickets"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
