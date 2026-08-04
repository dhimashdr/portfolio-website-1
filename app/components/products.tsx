import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import Image from "next/image"
import Link from "next/link"

interface Products{
    cover: any,
    title: string,
    slug: any
}

interface Products2{
    cover: any,
    title: string,
    slug: any,
    shortDescription: string,
    tags: Array<string>
}

const revalidate = 60

async function getData(){
  const query = `*[_type == "products"] | order(_createdAt desc){cover, title, slug}`
  const data = await client.fetch(query, {}, {next: {revalidate: 60}})

  return data as Array<Products>
}

async function getSixData(){
  const query = `*[_type == "products"] | order(_createdAt desc)[0...6]{cover, title, slug, shortDescription, tags}`
  const data = await client.fetch(query, {}, {next: {revalidate: 60}})

  return data as Array<Products2>
}

async function getFilteredData(start : number, itemsPerPage : number){
  const query = `*[_type == "products"] | order(_createdAt desc)[${start}...${start + itemsPerPage}]{cover, title, slug, shortDescription, tags}`
  const data = await client.fetch(query, {}, {next: {revalidate: 60}})

  return data as Array<Products2>
}


export function ProductsCards({data} : {data : Products}){
    return (
        <div className="flex flex-col items-center justify-center bg-white drop-shadow-black/20 drop-shadow-md rounded-md font-sans-1">
            <div className="w-full aspect-square relative rounded-t-md overflow-clip">
                <Image src={urlFor(data.cover).url()} alt={data.title} fill sizes="1" loading="eager" className="object-cover"/>
            </div>
            <div className="flex flex-col gap-2 px-2 py-4 items-center justify-center">
                <h1 className="font-bold text-xs lg:text-lg text-center">{data.title}</h1>
            <Link href={`/products/${data.slug.current}`} className="border border-red-700 text-red-700 rounded-full w-fit px-4 py-0.5 lg:px-6 lg:py-1 hover:bg-red-700 hover:text-white transition-colors font-medium text-[0.5rem] lg:text-sm">lihat selengkapnya</Link>
            </div>
        </div>
    )
}

export async function AllProducts(){
    const data = await getData()
    return (
        data.map((e, i) => {
            return (
                <ProductsCards data={e} key={i}/>
            )
        })
    )
}

export async function FilteredProducts({start, itemsPerPage} : {start : number, itemsPerPage : number}){
    const data = await getFilteredData(start, itemsPerPage)

    return (
        data.map((e, i) => {
            return (
                <ProductsCards2 data={e} key={i}/>
            )
        })
    )
}

export async function SixProducts(){
    const data = await getSixData()
    return (
        data.map((e, i) => {
            return (
                <ProductsCards2 data={e} key={i}/>
            )
        })
    )
}

export function AllProductsSkeleton(){
    return(
        <div></div>
    )
}

export function ProductsCards2({data} : {data : Products2}){
    return (
        <Link href={`/products/${data.slug.current}`} className="flex flex-col bg-white border border-black font-sans-1 relative group">
            <div className="w-full aspect-3/2 relative overflow-clip">
                <Image src={urlFor(data.cover).url()} alt={data.title} fill sizes="1" loading="eager" className="object-cover"/>
            </div>
            {/* <div className="flex bg-secondary-1 px-2">
                <div className="text-bg-1 uppercase font-light text-[0.5rem] text-left">{data.tags.map((e) => `${e} / `)}</div>
            </div> */}
            <div className="flex flex-col px-2 md:px-4 py-4 text-left">
                <h1 className="font-bold text-sm lg:text-xl">{data.title}</h1>
                <p className="font-light text-[0.5rem] lg:text-xs text-pretty">{data.shortDescription}</p>
            </div>
            <div className="w-full bottom-0 left-0 bg-black/70 absolute h-0 group-hover:h-full transition-all flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
            <p className="text-white ">Lihat selengkapnya</p>
            </div>
        </Link>
    )
}