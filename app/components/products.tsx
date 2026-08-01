import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import Image from "next/image"
import Link from "next/link"

interface Products{
    cover: any,
    title: string,
    slug: any
}

const revalidate = 60

async function getData(){
  const query = `*[_type == "products"] | order(_createdAt desc){cover, title, slug}`
  const data = await client.fetch(query, {}, {next: {revalidate: 60}})

  return data as Array<Products>
}

async function getSixData(){
  const query = `*[_type == "products"] | order(_createdAt desc)[0...6]{cover, title, slug}`
  const data = await client.fetch(query, {}, {next: {revalidate: 60}})

  return data as Array<Products>
}

async function getFilteredData(start : number, itemsPerPage : number){
  const query = `*[_type == "products"] | order(_createdAt desc)[${start}...${start + itemsPerPage}]{cover, title, slug}`
  const data = await client.fetch(query, {}, {next: {revalidate: 60}})

  return data as Array<Products>
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
                <ProductsCards data={e} key={i}/>
            )
        })
    )
}

export async function SixProducts(){
    const data = await getSixData()
    return (
        data.map((e, i) => {
            return (
                <ProductsCards data={e} key={i}/>
            )
        })
    )
}

export function AllProductsSkeleton(){
    return(
        <div></div>
    )
}