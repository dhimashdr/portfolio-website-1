"use client"

import { urlFor } from "@/sanity/lib/image"
import Image from "next/image"
import { useState } from "react"

interface Photos{
    cover: any
}

export default function Gallery({photos} : {photos : Array<Photos>}){
    const [index, setIndex] = useState<number | null>(null)

    return <div className="w-full relative">
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-16">
            {photos.map((e, i) => {
                return <div key={i} onClick={() => setIndex(i)} className="w-full aspect-square relative group overflow-hidden">
                    <Image src={urlFor(e).url()} alt={`galeri-${i}`} className="object-cover group-hover:scale-110 transition-all" fill sizes="1"></Image>
                </div>
            })}
        </div>
        {index != null && <div className="w-full h-full fixed z-60 bg-black/80 left-0 top-0 flex items-center-safe justify-center-safe">
        <div className="h-full flex-1/4" onClick={() => setIndex(null)}></div>
            <div className="min-w-1/3 aspect-square relative overflow-hidden cursor-zoom-in">
                <Image src={urlFor(photos[index]).url()} alt="showed-up" fill sizes="1" className="object-cover transition-transform hover:scale-125 duration-300"></Image>
            </div>
            <div className="flex-1/4 h-full" onClick={() => setIndex(null)}></div>
        </div>}
    </div>
}