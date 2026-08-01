import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import OverlayWhatsapp from "./components/overlay-whatsapp";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ['latin']
})

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ['latin'],
  weight: '400'
})

export const metadata: Metadata = {
  metadataBase: new URL("https://dhimashdr.vercel.app"),
  title: {
    default: 'Kerajinan Tembaga & Kuningan | Yourweb.com',
    template: '%s | Yourweb.com'
  },
  description: "Jelajahi katalog produk kerajinan tembaga dan kuningan berkualitas tinggi. Temukan dekorasi interior dan eksterior terbaik untuk kebutuhan Anda.",
  applicationName: 'Yourweb',
  authors: [{ name: 'Nama Kamu atau Perusahaan' }],
  generator: 'Next.js',
  keywords: ['kerajinan tembaga', 'kuningan', 'dekorasi rumah', 'katalog produk', 'kerajinan tangan'],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Katalog Produk Kerajinan Tembaga & Kuningan',
    description: 'Jelajahi katalog produk kerajinan tembaga dan kuningan berkualitas tinggi.',
    url: 'https://dhimashdr.vercel.app',
    siteName: 'Yourweb.com',
    images: [
      {
        url: '/images/section-background.jpg',
        width: 1200,
        height: 630,
        alt: 'Preview Katalog Produk Yourweb',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Katalog Produk Kerajinan Tembaga & Kuningan',
    description: 'Jelajahi katalog produk kerajinan tembaga dan kuningan berkualitas.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${dmSans.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative">
        <NavBar/>
        {children}
        <OverlayWhatsapp/>
        <Footer/>
      </body>
    </html>
  );
}
