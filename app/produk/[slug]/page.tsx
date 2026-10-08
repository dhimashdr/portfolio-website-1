import { client } from "@/sanity/lib/client"
import ProductDetailInfo from "../components/product-detail"
import { Metadata, ResolvingMetadata } from "next"
import { urlFor } from "@/sanity/lib/image"
import { cache } from "react" // 1. Tambahkan cache dari React

interface ProductDetail{
    title: string,
    cover: any,
    productImages: Array<any>,
    description: any
}

// 2. Bungkus fungsi fetch dengan cache() agar query Sanity tidak dijalankan 2x
const getProductDetail = cache(async (slug : string) => {
    // Menggunakan [0] langsung di GROQ query lebih efisien
    const query = `*[_type == "products" && slug.current == "${slug}"][0]{title, cover, productImages, description}`
    const data = await client.fetch(query, {}, {next: {tags: ['katalog-produk']}})
    
    return data as ProductDetail
})

// 3. Helper untuk merubah Sanity Portable Text menjadi Plain Text untuk meta description
function extractTextFromBlocks(blocks: any): string {
    if (!blocks) return "Beli produk kerajinan tembaga terbaik dari Copper Craftie.";
    if (typeof blocks === 'string') return blocks.substring(0, 160);
    
    // Jika formatnya blok (Portable Text Sanity)
    if (Array.isArray(blocks)) {
        return blocks
            .map(block => block.children?.map((child: any) => child.text).join(''))
            .join(' ')
            .substring(0, 160); // Batasi maksimal 160 karakter sesuai standar SEO
    }
    
    return "Beli produk kerajinan tembaga terbaik dari Copper Craftie.";
}

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> },
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { slug } = await params
    const product = await getProductDetail(slug)
    
    const siteName = 'Copper Craftie';
    const baseUrl = 'https://domainanda.com'; // Ganti dengan domain asli Anda
    const url = `${baseUrl}/products/${slug}`;

    if (!product) {
        return {
            title: `Produk Tidak Ditemukan | ${siteName}`,
            description: `Produk yang Anda cari tidak tersedia di ${siteName}.`
        }
    }

    const plainDescription = extractTextFromBlocks(product.description); 

    // 4. Force dimensi gambar langsung dari CDN Sanity agar hemat bandwidth dan pas di medsos
    const coverImageUrl = product.cover 
        ? urlFor(product.cover).width(1200).height(630).fit('crop').url() 
        : `${baseUrl}/images/section-background.jpg`; // Pastikan URL absolut

    return {
        title: `${product.title} | ${siteName}`,
        description: plainDescription,
        openGraph: {
            title: `${product.title} | ${siteName}`,
            description: plainDescription,
            url: url,
            siteName: siteName,
            images: [
                {
                    url: coverImageUrl,
                    width: 1200,
                    height: 630,
                    alt: product.title,
                },
            ],
            locale: 'id_ID',
            type: 'website', // Akan lebih baik jika 'type' diganti 'product' (lihat dokumentasi OG)
        },
        twitter: {
            card: 'summary_large_image',
            title: `${product.title} | ${siteName}`,
            description: plainDescription,
            images: [coverImageUrl],
        },
        alternates: {
            canonical: url,
        },
    }
}

export default async function DetailProduct({ params }: {params : Promise<{ slug: string }>}){
    const { slug } = await params
    const data = await getProductDetail(slug)

    if (!data) {
        return <div className="p-8 lg:p-16 text-center">Produk tidak ditemukan.</div>
    }
    
    // 5. Setup JSON-LD untuk Product Schema (Rich Snippets Google)
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: data.title,
        image: data.cover ? urlFor(data.cover).url() : '',
        description: extractTextFromBlocks(data.description),
        brand: {
            '@type': 'Brand',
            name: 'Copper Craftie'
        },
        // Jika Anda punya data harga, uncomment bagian ini:
        /*
        offers: {
            '@type': 'Offer',
            priceCurrency: 'IDR',
            price: data.price,
            availability: data.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
            url: `https://domainanda.com/products/${slug}`
        }
        */
    };

    return (
        <div className="p-8 lg:p-16">
            {/* Inject struktur data ke dalam DOM */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            
            <ProductDetailInfo data={data} />
        </div>
    )
}