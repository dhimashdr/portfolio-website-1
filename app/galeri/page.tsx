import { client } from "@/sanity/lib/client"
import Gallery from "./components/gallery"
import Section from "../components/section"

// OPTIMASI 1: Jadikan halaman ini cache-statis dengan revalidasi periodik.
// Ini mencegah Cloudflare Worker melakukan fetch dan render ulang setiap ada pengunjung.
export const revalidate = 3600; 

interface Photos {
    productImages: Array<any>
}

async function getPhotos() {
    // OPTIMASI 2: Tambahkan [0...30] untuk mencegah RAM Worker kehabisan memori (Error 1102)
    // akibat memuat JSON katalog yang terlalu raksasa.
    const query = `*[_type == "products"]{
        "productImages": productImages[isInGallery].asset->{
            url,
            metadata {
                dimensions {
                    width,
                    height
                },
                lqip
            }
        }
    }[0...30]` 
    
    const data = await client.fetch(query, {}, {next: {tags: ['katalog-produk']}})
    return data as Array<Photos>
}

export default async function GalleryPage() {
    const arrayPhotos = await getPhotos()
    
    // OPTIMASI 3: Tambahkan filter(Boolean) untuk mencegah error jika ada data null
    const photos = arrayPhotos.flatMap(item => item.productImages).filter(Boolean);

    return (
        <div className="w-full h-full">
            <Section title="Galeri Kerajinan" subtitle="Lihat berbagai dokumentasi dari kerajinan yang telah dibuat"/>
            <div className="p-8 lg:p-16">
                <Gallery photos={photos}/>
            </div>
        </div>
    )
}