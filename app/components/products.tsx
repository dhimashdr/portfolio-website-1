import { client } from "@/sanity/lib/client"
import { ProductsCards, ProductsCards2 } from "./product-cards"

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

async function getData(){
  const query = `*[_type == "products"] | order(_createdAt desc){cover, title, slug}`
  const data = await client.fetch(query, {}, {next: {tags: ['katalog-produk']}})

  return data as Array<Products>
}

async function getSixData(){
  const query = `*[_type == "products"] | order(_createdAt desc)[0...6]{cover, title, slug, shortDescription, tags}`
  const data = await client.fetch(query, {}, {next: {tags: ['katalog-produk']}})

  return data as Array<Products2>
}

async function getFilteredData(start : number, itemsPerPage : number, filter : string){
  const query = `*[_type == "products" && ${filter}] | order(_createdAt desc)[${start}...${start + itemsPerPage}]{cover, title, slug, shortDescription, tags}`
  const data = await client.fetch(query, {}, {next: { tags: ['katalog-produk'] }})

  return data as Array<Products2>
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

export async function FilteredProducts({start, itemsPerPage, filter} : {start : number, itemsPerPage : number, filter: string}){
    const data = await getFilteredData(start, itemsPerPage, filter)

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