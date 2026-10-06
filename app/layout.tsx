import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Sans, DM_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import OverlayWhatsapp from "./components/overlay-whatsapp";
import { GoogleTagManager } from '@next/third-parties/google';

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

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta-sans",
  subsets: ['latin']
})

export const metadata: Metadata = {
  metadataBase: new URL("https://coppercraftie.com"),
  title: {
    default: 'Kerajinan Tembaga & Kuningan | Copper Craftie',
    template: '%s | Copper Craftie'
  },
  description: "Jelajahi katalog produk kerajinan tembaga dan kuningan berkualitas tinggi. Temukan dekorasi interior dan eksterior terbaik untuk kebutuhan Anda.",
  applicationName: 'Copper Craftie',
  authors: [{ name: 'Copper Craftie' }],
  generator: 'Next.js',
  keywords: ['kerajinan tembaga', 'kuningan', 'dekorasi rumah', 'katalog produk', 'kerajinan tangan'],
  openGraph: {
    title: 'Katalog Produk Kerajinan Tembaga & Kuningan',
    description: 'Jelajahi katalog produk kerajinan tembaga dan kuningan berkualitas tinggi.',
    siteName: 'Copper Craftie',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Preview Katalog Produk Copper Craftie',
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
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
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
      lang="id"
      className={`${dmSans.variable} ${dmMono.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="">
        <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Copper Craftie",
          "image": "https://coppercraftie.com/og-image.jpg", // Sesuaikan jika perlu
          "description": "Pusat pembuatan dan katalog produk kerajinan tembaga dan kuningan berkualitas tinggi.",
          "url": "https://coppercraftie.com",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Boyolali",
            "addressCountry": "ID"
          },
          "priceRange": "$$"
        })
      }}
    />
        <div className="min-h-full flex flex-col relative bg-bg-1">
            <NavBar/>
            
            {children}
            <OverlayWhatsapp/>
            <Footer/>
        </div>
        <GoogleTagManager gtmId="GTM-57MV5MHG" />
      </body>
    </html>
  );
}
