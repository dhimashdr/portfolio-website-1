"use client"

import { useState } from "react"
import { urlFor } from "@/sanity/lib/image"
import { PortableText } from "next-sanity"
import Image from "next/image"
import { myPortableTextComponents } from "./portable-components"
import { FaWhatsapp } from "react-icons/fa"
import Link from "next/link"

interface ProductDetail{
    title: string,
    cover: any,
    productImages: Array<any>,
    description: any
}

export default function ProductDetailInfo({data} : {data : ProductDetail}){
    const images = [data.cover, ...data.productImages]
    const [index, setIndex] = useState(0)
    const textMessage = encodeURIComponent(`Halo, saya ingin mengetahui detail produk ${data.title}.`);

    return <div className="flex flex-col md:flex-row w-full gap-8 md:gap-16 font-sans-1">
    <div className="flex flex-col flex-1/3 gap-2">
        <div className="relative w-full aspect-square">
            <Image src={urlFor(images[index]).url()} fill sizes="1" className="object-cover" alt={`${data.title}-${index}`} loading="eager"></Image>
        </div>
        <div className="flex gap-2">
            {images.map((e, i) => {
                return <div onClick={() => setIndex(i)} className="relative w-12 lg:w-16 aspect-square cursor-pointer p-2" key={i}>
                    {index == i && <div className="w-full h-full absolute bg-white/50 z-10 left-0 top-0  border-4 border-red-400"></div>}
                    <Image src={urlFor(e).url()} alt={`${data.title}-${i}`} fill sizes="1" className="object-cover" loading="eager"></Image>
                </div>
            })}
        </div>
    </div>
    <div className="flex-2/3 flex flex-col gap-8">
        <h1 className="font-bold text-4xl">{data.title}</h1>
        <div className="font-sans text-balance">
            <p className="font-light text-gray-500 text-sm">Deskripsi</p>
            <hr className="md:w-1/2 text-gray-300"/>
            <PortableText value={data.description} components={myPortableTextComponents}/>
        </div>
        <div className="mt-auto mx-auto">
            <Link href={`https://wa.me/6285812780604?text=${textMessage}`} className="flex items-center p-2 bg-green-500 text-white w-fit gap-2 rounded-md hover:bg-green-600 active:scale-95 transition-all">
            <FaWhatsapp className="size-6"/>
            <p className="text-sm font-semibold">pesan sekarang</p>
            </Link>
        </div>
    </div>
    </div>
}