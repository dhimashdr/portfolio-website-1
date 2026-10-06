"use client"

import { urlFor } from "@/sanity/lib/image"
import Image from "next/image"
import { useState } from "react"

interface metadata {
    dimensions: any,
    lqip: string
}

interface Photos {
    metadata: metadata,
    url: string
}

export default function Gallery({photos} : {photos : Array<Photos>}){
    const [index, setIndex] = useState<number | null>(null)

    const removeImage = (event : any) => {
        if (event.target !== event.currentTarget) {
            return;
        }
        setIndex(null)
    };

    return (
        <div className="w-full relative">
            <div className="columns-2 md:columns-4 md:space-y-4 md:gap-4 space-y-2 gap-2">
                {photos.map((image, i) => {
                    // OPTIMASI 4: Gunakan urlFor() untuk mengubah ukuran ke 400px dan format WebP.
                    // Ini membuat ukuran file sangat kecil saat ditampilkan dalam bentuk grid.
                    const thumbnailUrl = urlFor(image.url).width(400).format('webp').url()

                    return (
                        <div key={i} onClick={() => setIndex(i)} className="w-full group overflow-hidden cursor-pointer">
                            <Image 
                                src={thumbnailUrl} 
                                alt={`galeri-${i}`} 
                                className="w-full h-auto object-cover group-hover:scale-110 transition-all" 
                                width={image.metadata.dimensions.width} 
                                height={image.metadata.dimensions.height} 
                                // Sesuaikan ukuran sizes dengan jumlah kolom (50% di hp, 25% di desktop)
                                sizes="(max-width: 768px) 50vw, 25vw" 
                                placeholder="blur" 
                                blurDataURL={image.metadata.lqip}
                                unoptimized // OPTIMASI 5: Wajib ditambahkan agar hemat CPU 10ms
                            />
                        </div>
                    )
                })}
            </div>
            
            {index != null && (
                // Perbaikan z-index ke standar tailwind (z-50)
                <div className="w-full h-full fixed z-50 bg-black/80 left-0 top-0 flex items-center justify-center" onClick={removeImage}>
                    <div className="w-[90%] md:w-2/3 lg:w-1/3 overflow-hidden cursor-zoom-out">
                        {/* OPTIMASI 6: Render resolusi tinggi (1200px) hanya saat modal galeri dibuka */}
                        <Image 
                            src={urlFor(photos[index].url).width(1200).format('webp').url()} 
                            alt="showed-up" 
                            className="object-cover transition-transform hover:scale-125 duration-300 w-full h-auto" 
                            width={photos[index].metadata.dimensions.width} 
                            height={photos[index].metadata.dimensions.height} 
                            sizes="100vw" 
                            placeholder="blur" 
                            blurDataURL={photos[index].metadata.lqip}
                            unoptimized // OPTIMASI 5: Wajib ditambahkan agar hemat CPU 10ms
                        />
                    </div>
                </div>
            )}
        </div>
    )
}