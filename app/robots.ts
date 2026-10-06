import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      // Blokir bot dari semua rute
      disallow: '/', 
    },
    // Hapus atau comment dulu link sitemap-nya agar bot tidak tahu rute-rutemu
    // sitemap: 'https://...', 
  }
}