"use client"

import { useState } from "react"
import { urlFor } from "@/sanity/lib/image"
import { PortableText } from "next-sanity"
import Image from "next/image"
import { myPortableTextComponents } from "./portable-components"
import { FaWhatsapp, FaCalendarAlt } from "react-icons/fa"
import Link from "next/link"

export interface PostDetail{
    title: string,
    cover: any,
    content: any,
    _updatedAt: any
}

export function PostDetailInfo({data} : {data : PostDetail}){
    const date = new Date(data._updatedAt);
    const formattedDate = date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC' 
    });

    return <div className="flex flex-col gap-2">
        <div className="w-full aspect-4/1 relative bg-cover bg-center" style={{backgroundImage: `url("${urlFor(data.cover).width(600).format('webp').quality(80).url()}")`}}>
        </div>
        <div className="p-8 lg:p-16">
            <p className="font-bold text-2xl lg:text-3xl">{data.title}</p>
            <div className="flex items-center gap-2 text-xs text-neutral-400">
                <FaCalendarAlt/>
                <p>{formattedDate}</p>
            </div>
            <div className="text-sm">
                <PortableText value={data.content} components={myPortableTextComponents}></PortableText>
            </div>
        </div>
    </div>
}