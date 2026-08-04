"use client"

import { urlFor } from "@/sanity/lib/image"
import Image from "next/image"
import { useState } from "react"

interface metadata{
    dimensions: any,
    lqip: string
}

interface Photos{
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

    return <div className="w-full relative">
    <div className="columns-3 md:columns-4 md:space-y-4 md:gap-4 space-y-2 gap-2">
            {photos.map((image, i) => {
                return <div key={i} onClick={() => setIndex(i)} className="w-full group overflow-hidden">
                    <Image src={image.url} alt={`galeri-${i}`} className="w-full h-auto object-cover group-hover:scale-110 transition-all" width={image.metadata.dimensions.width} height={image.metadata.dimensions.height} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" placeholder="blur" blurDataURL={image.metadata.lqip}></Image>
                </div>
            })}
        </div>
        {index != null && <div className="w-full h-full fixed z-60 bg-black/80 left-0 top-0 flex items-center-safe justify-center-safe" onClick={removeImage}>
            <div className="w-2/3 md:w-1/3 overflow-hidden cursor-zoom-in">
                <Image src={photos[index].url} alt="showed-up" className="object-cover transition-transform hover:scale-125 duration-300" width={photos[index].metadata.dimensions.width} height={photos[index].metadata.dimensions.height} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" placeholder="blur" blurDataURL={photos[index].metadata.lqip}></Image>
            </div>
        </div>}
    </div>
}