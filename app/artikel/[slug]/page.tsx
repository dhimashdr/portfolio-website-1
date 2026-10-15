import { client } from "@/sanity/lib/client"
import { PostDetailInfo, PostDetail } from "../components/post-detail"
import { Metadata, ResolvingMetadata } from "next"
import { urlFor } from "@/sanity/lib/image"
import { cache } from "react"

const getPostDetail = cache(async (slug : string) => {
    const query = `*[_type == "posts" && slug.current == "${slug}"][0]{title, cover, content, _updatedAt}`
    const data = await client.fetch(query, {}, {next: {tags: ['artikel']}})
    
    return data as PostDetail
})

function extractTextFromBlocks(blocks: any): string {
    if (!blocks) return "Baca artikel terbaru dari Copper Craftie seputar kerajinan tembaga dan kuningan.";
    if (typeof blocks === 'string') return blocks.substring(0, 160);
    
    if (Array.isArray(blocks)) {
        return blocks
            .map(block => block.children?.map((child: any) => child.text).join(''))
            .join(' ')
            .trim()
            .substring(0, 157) + "..."; 
    }
    
    return "Baca artikel terbaru dari Copper Craftie seputar kerajinan tembaga dan kuningan.";
}

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { slug } = await params
    const data = await getPostDetail(slug)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://coppercraftie.com'

    if (!data) {
        return {
            title: 'Artikel Tidak Ditemukan | Copper Craftie',
            description: 'Artikel yang Anda cari tidak tersedia.'
        }
    }

    const description = extractTextFromBlocks(data.content)
    
    // PERBAIKAN 1: Tambahkan Fallback Image dan gunakan fit('crop')
    const ogImage = data.cover 
        ? urlFor(data.cover).width(1200).height(630).fit('crop').url() 
        : `${baseUrl}/images/section-background.jpg`

    return {
        title: `${data.title} | Copper Craftie`,
        description: description,
        alternates: {
            canonical: `${baseUrl}/artikel/${slug}` 
        },
        openGraph: {
            title: data.title,
            description: description,
            url: `${baseUrl}/artikel/${slug}`,
            siteName: "Copper Craftie",
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: data.title,
                }
            ],
            type: 'article', 
            publishedTime: data._updatedAt, 
            authors: ['Copper Craftie'],
        },
        twitter: {
            card: 'summary_large_image',
            title: data.title,
            description: description,
            images: [ogImage],
        }
    }
}

export default async function DetailPost({ params }: Props){
    const { slug } = await params
    const data = await getPostDetail(slug)

    if (!data) {
        return <div className="py-20 text-center">Artikel tidak ditemukan.</div>
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://coppercraftie.com';

    // PERBAIKAN 2: Setup JSON-LD untuk Skema Artikel (BlogPosting)
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: data.title,
        image: data.cover ? urlFor(data.cover).url() : `${baseUrl}/images/section-background.jpg`,
        datePublished: data._updatedAt, // Memberitahu Google kapan ini dirilis
        dateModified: data._updatedAt,
        author: [{
            '@type': 'Organization',
            name: 'Copper Craftie',
            url: baseUrl
        }],
        description: extractTextFromBlocks(data.content)
    };

    return (
        <div className="">
            {/* Inject struktur data artikel ke dalam DOM */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            
            <PostDetailInfo data={data} />
        </div>
    )
}