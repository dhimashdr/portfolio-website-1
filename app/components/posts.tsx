import { client } from "@/sanity/lib/client"
import { PostCards, PostItem } from "./post-cards"

async function getFilteredData(start : number, itemsPerPage : number){
    const query = `*[_type == "posts"] | order(_createdAt desc)[${start}...${start + itemsPerPage}]{cover, title, slug, _updatedAt, content}`
    const data = await client.fetch(query, {}, {next: { tags: ['artikel'] }})
    
    return data as Array<PostItem>
}

export async function FilteredPosts({start, itemsPerPage} : {start : number, itemsPerPage : number, filter: string}){
    const data = await getFilteredData(start, itemsPerPage)

    return (
        data.map((e, i) => {
            return (
                <PostCards data={e} key={i}/>
            )
        })
    )
}
