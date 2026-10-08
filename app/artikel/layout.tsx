import Footer from "../components/footer";

import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://coppercraftie.com"),
  title: 'Artikel',
  description: "Artikel yang relevan dengan kerajinan tembaga dan kuningan",
  openGraph: {
    images: ['/og-image.jpg'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="w-full min-h-screen">
    {children}
  </div>
}