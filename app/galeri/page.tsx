import { client } from "@/sanity/lib/client"
import Gallery from "./components/gallery"
import Section from "../components/section"
import { Metadata } from "next"

// 1. Pindahkan metadata ke sini. 
// Tidak perlu tulis metadataBase lagi karena sudah diwariskan otomatis dari root layout.tsx
export const metadata: Metadata = {
  title: 'Galeri Karya', // Nanti otomatis jadi "Galeri Karya | Copper Craftie" berkat template di root
  description: "Lihat berbagai dokumentasi dan portofolio produk kerajinan tembaga dan kuningan yang telah kami buat.",
  alternates: {
    canonical: '/galeri',
  }
};

export const revalidate = 3600; 

interface Photos {
    productImages: Array<any>
}

async function getPhotos() {
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