import { client } from "@/sanity/lib/client"
import ProductDetailInfo from "../components/product-detail"

interface ProductDetail{
    title: string,
    cover: any,
    productImages: Array<any>,
    description: any
}

async function getProductDetail(slug : string){
    const query = `*[_type == "products" && slug.current == "${slug}"]{title, cover, productImages, description}`
    const data = await client.fetch(query, {}, {next: {revalidate: 60}})

    return data[0] as ProductDetail
}

export default async function DetailProduct({ params }: {params : Promise<{ slug: string }>}){
    const { slug } = await params
    const data = await getProductDetail(slug)

    return <div className="p-16">
    <ProductDetailInfo data={data}></ProductDetailInfo>
    </div>
}