import { client } from "@/sanity/lib/client"
import ProductDetailInfo from "../components/product-detail"
import { Metadata, ResolvingMetadata } from "next"
import { urlFor } from "@/sanity/lib/image"

interface ProductDetail{
    title: string,
    cover: any,
    productImages: Array<any>,
    description: any
}

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> },
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { slug } = await params
    const product = await getProductDetail(slug)

    // Fallback jika produk tidak ditemukan
    if (!product) {
        return {
            title: 'Produk Tidak Ditemukan',
            description: 'Produk yang Anda cari tidak tersedia.'
        }
    }

    // Ekstrak deskripsi (Jika menggunakan Portable Text Sanity, Anda mungkin perlu mengubahnya ke plain text dulu. 
    // Di sini diasumsikan description adalah string atau kita ambil fallback)
    const plainDescription = typeof product.description === 'string' 
        ? product.description.substring(0, 160) 
        : "Beli produk terbaik kami dengan harga spesial dan kualitas terjamin."; 

    // Ekstrak URL gambar cover (Pastikan Anda memiliki fungsi helper urlFor dari Sanity)
    const coverImageUrl = product.cover ? urlFor(product.cover).url() : '/images/section-background.jpg';

    return {
        title: `${product.title} | Wall Covering Art`, // Selalu tambahkan brand name di belakang
        description: plainDescription,
        openGraph: {
            title: `${product.title} | Nama Toko Anda`,
            description: plainDescription,
            url: `https://domainanda.com/products/${slug}`,
            siteName: 'Nama Toko Anda',
            images: [
                {
                    url: coverImageUrl,
                    width: 1200,
                    height: 630,
                    alt: product.title,
                },
            ],
            locale: 'id_ID',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${product.title} | Nama Toko Anda`,
            description: plainDescription,
            images: [coverImageUrl],
        },
        alternates: {
            canonical: `https://domainanda.com/products/${slug}`, // Sangat penting untuk menghindari duplicate content
        },
    }
}

async function getProductDetail(slug : string){
    const query = `*[_type == "products" && slug.current == "${slug}"]{title, cover, productImages, description}`
    const data = await client.fetch(query, {}, {next: {revalidate: 60}})

    return data[0] as ProductDetail
}

export default async function DetailProduct({ params }: {params : Promise<{ slug: string }>}){
    const { slug } = await params
    const data = await getProductDetail(slug)

    if (!data) {
        return <div className="p-8 lg:p-16 text-center">Produk tidak ditemukan.</div>
    }
    
    return <div className="p-8 lg:p-16">
    <ProductDetailInfo data={data}></ProductDetailInfo>
    </div>
}