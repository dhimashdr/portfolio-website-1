import { client } from "@/sanity/lib/client"
import { FilteredProducts } from "../components/products"
import ProductPagination from "./components/pagination"
import Section from "../components/section"
import Filter from "./components/filter"
import Search from "./components/search"

async function getCategories(){
    const query = `array::unique(*[_type == "products" && defined(tags)].tags[])`
    const data = await client.fetch(query, {}, {next: {revalidate: 60}})

    return data as Array<string>
}

async function getTotalProducts(){
    const query = 'count(*[_type == "products"])'
    const data = await client.fetch(query, {}, {next: {revalidate: 60}})

    return data as number
}

export default async function ProductsPage({searchParams} : {searchParams : Promise<{ page?: string, category?: string, search?: string }>}){

    const { page, category, search } = await searchParams
    const categories = category ? category?.split(" ") : []
    const searches = search ? search?.toLowerCase() : ''
    const totalProducts = await getTotalProducts()
    const currentPage = Number(page) || 1
    const itemsPerPage = 8
    const startIndex = (currentPage - 1) * itemsPerPage;
    const totalPages = Math.ceil(totalProducts/itemsPerPage)
    const categoriesList = await getCategories()
    const categoriesArray = categoriesList.map((e) => e.toLocaleLowerCase())

    const filter = `title match "*${searches}*" && count(tags[lower(@) in [${categories.map((e) => `"${e}"`)}]]) == count(${`[${categories.map((e) => `"${e}"`)}]`})`

    return <div className="">
        {startIndex == 0 && 
        <Section title="Produk" subtitle="Telusuri berbagai kerajinan yang telah kami kerjakan untuk berbagai client."/>
        }
        <br />
        {/* <div className="w-full grid grid-cols-2 px-16 gap-4">
            <Search/>
            <Filter categoryArray={categoriesArray}/>
        </div> */}
        <div className="flex w-full gap-2 px-8 md:px-16 flex-col md:flex-row md:justify-between">
            <div className="flex-7/12">
                <Search/>
            </div>
            <div className="flex-5/12">
                <Filter categoryArray={categoriesArray}/>
            </div>
        </div>
        <br />
    <div className="px-8 md:px-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        <FilteredProducts start={startIndex} itemsPerPage={itemsPerPage} filter={filter}/>
    </div>
    <ProductPagination currentPage={currentPage} totalPages={totalPages}/>
    <br />
    <br />
    </div>
}