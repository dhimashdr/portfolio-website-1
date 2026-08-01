import { client } from "@/sanity/lib/client"
import { FilteredProducts } from "../components/products"
import ProductPagination from "./components/pagination"
import Section from "../components/section"

async function getTotalProducts(){
    const query = 'count(*[_type == "products"])'
    const data = await client.fetch(query, {}, {next: {revalidate: 60}})

    return data as number
}

export default async function ProductsPage({searchParams} : {searchParams : Promise<{ p?: string }>}){

    const { p } = await searchParams
    const totalProducts = await getTotalProducts()
    const currentPage = Number(p) || 1
    const itemsPerPage = 8
    const startIndex = (currentPage - 1) * itemsPerPage;
    const totalPages = Math.ceil(totalProducts/itemsPerPage)

    return <div className="">
        {startIndex == 0 && 
        <Section title="Produk" subtitle="Telusuri berbagai kerajinan yang telah kami kerjakan untuk berbagai client."/>
        }
    <div className="p-8 md:p-16 grid grid-cols-2 md:grid-cols-4 gap-8">
        <FilteredProducts start={startIndex} itemsPerPage={itemsPerPage}/>
    </div>
    <ProductPagination currentPage={currentPage} totalPages={totalPages}/>
    <br />
    <br />
    </div>
}