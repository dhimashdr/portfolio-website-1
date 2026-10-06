import { client } from "@/sanity/lib/client"
import { FilteredPosts } from "../components/posts"
import PostPagination from "./components/pagination"
import Section from "../components/section"

async function getTotalPosts(){
    const query = 'count(*[_type == "posts"])'
    const data = await client.fetch(query, {}, {next: {tags: ['artikel']}})

    return data as number
}

export default async function ProductsPage({searchParams} : {searchParams : Promise<{ page?: string, category?: string, search?: string }>}){

    const { page, category, search } = await searchParams
    const categories = category ? category?.split(" ") : []
    const searches = search ? search?.toLowerCase() : ''
    const totalPosts = await getTotalPosts()
    const currentPage = Number(page) || 1
    const itemsPerPage = 8
    const startIndex = (currentPage - 1) * itemsPerPage;
    const totalPages = Math.ceil(totalPosts/itemsPerPage)

    const filter = `title match "*${searches}*" && count(tags[lower(@) in [${categories.map((e) => `"${e}"`)}]]) == count(${`[${categories.map((e) => `"${e}"`)}]`})`

    return <div className="">
        {startIndex == 0 && 
        <Section title="Artikel" subtitle="Baca artikel kami untuk mengetahui lebih baik tentang kerajinan tembaga dan kuningan."/>
        }
        <br />
        
        <div className="px-8 md:px-16 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            <FilteredPosts start={startIndex} itemsPerPage={itemsPerPage} filter={filter}/>
        </div>
        <PostPagination currentPage={currentPage} totalPages={totalPages}/>
        <br />
        <br />
    </div>
}