import { client } from "@/sanity/lib/client"
import { PostDetailInfo, PostDetail } from "../components/post-detail"
import { Metadata, ResolvingMetadata } from "next"
import { urlFor } from "@/sanity/lib/image"
import { cache } from "react"
// Hapus import { div } from "framer-motion/client" jika tidak dipakai, bisa bikin error SSR

// 1. Bungkus fungsi fetch dengan cache() agar query Sanity tidak dijalankan 2x
const getPostDetail = cache(async (slug : string) => {
    const query = `*[_type == "posts" && slug.current == "${slug}"][0]{title, cover, content, _updatedAt}`
    const data = await client.fetch(query, {}, {next: {tags: ['artikel']}})
    
    return data as PostDetail
})

// 2. Helper untuk merubah Sanity Portable Text menjadi Plain Text
function extractTextFromBlocks(blocks: any): string {
    if (!blocks) return "Beli produk kerajinan tembaga terbaik dari Copper Craftie.";
    if (typeof blocks === 'string') return blocks.substring(0, 160);
    
    if (Array.isArray(blocks)) {
        return blocks
            .map(block => block.children?.map((child: any) => child.text).join(''))
            .join(' ')
            .trim()
            .substring(0, 157) + "..."; // Tambah elipsis (...) di ujung agar rapi
    }
    
    return "Beli produk kerajinan tembaga terbaik dari Copper Craftie.";
}

// 3. Tipe data untuk props
type Props = {
    params: Promise<{ slug: string }>
}

// 4. Implementasi generateMetadata untuk SEO Halaman Detail
export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { slug } = await params
    const data = await getPostDetail(slug)

    // Fallback jika artikel tidak ditemukan
    if (!data) {
        return {
            title: 'Artikel Tidak Ditemukan',
            description: 'Artikel yang Anda cari tidak tersedia.'
        }
    }

    const description = extractTextFromBlocks(data.content)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://coppercraftie.com'
    
    // Generate URL gambar untuk preview sosial media (Open Graph / Twitter)
    // Asumsi urlFor mendukung metode .width() dan .height() dari Sanity Image Builder
    const ogImage = data.cover ? urlFor(data.cover).width(1200).height(630).url() : ''

    return {
        title: `${data.title} | Copper Craftie`,
        description: description,
        alternates: {
            // Pastikan format slug routing-mu benar, misal "/artikel/[slug]"
            canonical: `${baseUrl}/artikel/${slug}` 
        },
        openGraph: {
            title: data.title,
            description: description,
            url: `${baseUrl}/artikel/${slug}`,
            siteName: "Copper Craftie",
            images: ogImage ? [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: data.title,
                }
            ] : [],
            type: 'article', // PENTING: Memberitahu Google bahwa ini adalah artikel blog
            publishedTime: data._updatedAt, // Tanggal artikel membantu SEO berita/blog
            authors: ['Copper Craftie'],
        },
        twitter: {
            card: 'summary_large_image',
            title: data.title,
            description: description,
            images: ogImage ? [ogImage] : [],
        }
    }
}

export default async function DetailPost({ params }: Props){
    const { slug } = await params
    const data = await getPostDetail(slug)

    // Handle proteksi jika user memasukkan URL slug yang salah
    if (!data) {
        return <div className="py-20 text-center">Artikel tidak ditemukan.</div>
    }

    return (
        <div className="">
            <PostDetailInfo data={data} />
        </div>
    )
}