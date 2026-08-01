import { client } from "@/sanity/lib/client"
import Gallery from "./components/gallery"
import Section from "../components/section"

interface Photos{
    productImages: Array<any>
}

async function getPhotos(){
    const query = `*[_type == "products"] | order(_createdAt desc)[0...20]{productImages}`
    const data = await client.fetch(query, {}, {next: {revalidate: 60}})

    return data as Array<Photos>
}

export default async function GalleryPage(){
    const arrayPhotos = await getPhotos()
    const photos = arrayPhotos.flatMap(item => item.productImages);

    return <div className="w-full h-full">
        <Section title="Galeri" subtitle="lihat berbagai dokumentasi dari kerajinan yang telah dibuat"/>
        <Gallery photos={photos}/>
    </div>
}