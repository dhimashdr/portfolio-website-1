import Footer from "../components/footer";

import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://dhimashdr.vercel.app"),
  title: 'Yourweb.com | Galeri Kerajinan Tembaga dan Kuningan',
  description: "Jelajahi katalog produk kerajinan tembaga dan kuningan",
  openGraph: {
    images: ['/og-image.jpg'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="w-full min-h-screen">
    {children}
  </div>
}