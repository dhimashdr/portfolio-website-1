import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://coppercraftie.com'

  // 1. Ambil semua slug untuk rute dinamis Artikel dan Produk
  // Catatan: Pastikan `_type == "products"` sesuai dengan nama skema di Sanity-mu
  const postsQuery = `*[_type == "posts"]{ "slug": slug.current, _updatedAt }`
  const productsQuery = `*[_type == "products"]{ "slug": slug.current, _updatedAt }` // ganti jika type-mu "product" (tanpa s)

  // Fetch secara paralel agar lebih cepat
  const [posts, products] = await Promise.all([
    client.fetch(postsQuery, {}, {next: {tags: ['artikel']}}),
    client.fetch(productsQuery, {}, {next: {tags: ['katalog-produk']}})
  ]);

  // 2. Mapping Rute Dinamis: Produk
  const productRoutes: MetadataRoute.Sitemap = products.map((product: any) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: product._updatedAt, // Gunakan tanggal update terakhir dari Sanity
    changeFrequency: 'weekly',
    priority: 0.9, // Prioritas tinggi karena ini jualan utamamu
  }))

  // 3. Mapping Rute Dinamis: Artikel
  const postRoutes: MetadataRoute.Sitemap = posts.map((post: any) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: post._updatedAt,
    changeFrequency: 'weekly',
    priority: 0.7, // Artikel blog cukup 0.7
  }))

  // 4. Definisi Rute Statis
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`, // Homepage (/)
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0, // Homepage selalu 1.0
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/posts`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/how-to-order`,
      lastModified: new Date(),
      changeFrequency: 'yearly', // Jarang berubah
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contacts`,
      lastModified: new Date(),
      changeFrequency: 'yearly', // Jarang berubah
      priority: 0.8,
    }
  ]

  // 5. Gabungkan semuanya
  return [...staticRoutes, ...productRoutes, ...postRoutes]
}