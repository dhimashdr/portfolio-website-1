import { client } from "@/sanity/lib/client"
import { FilteredProducts } from "../components/products"
import ProductPagination from "./components/pagination"
import Section from "../components/section"
import Filter from "./components/filter"
import Search from "./components/search"
import type { Metadata } from "next";

type PageProps = {
    searchParams: Promise<{ page?: string; category?: string; search?: string }>
}

// 1. Metadata Dinamis untuk Paginasi & Filter (Menggantikan metadata statis)
export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
    const { page, category, search } = await searchParams;
    const currentPage = Number(page) || 1;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://coppercraftie.com';

    let title = "Katalog Produk Kerajinan Tembaga & Kuningan";
    if (search) {
        title = `Pencarian: "${search}" | Katalog Produk`;
    } else if (category) {
        title = `Kategori: ${category.replace(/-/g, ' ')} | Katalog Produk`;
    }

    if (currentPage > 1) {
        title = `${title} - Halaman ${currentPage}`;
    }

    const description = "Jelajahi katalog produk kerajinan tembaga dan kuningan berkualitas tinggi dari Copper Craftie.";

    return {
        title,
        description,
        alternates: {
            canonical: `${baseUrl}/produk${currentPage > 1 ? `?page=${currentPage}` : ''}`
        },
        openGraph: {
            title,
            description,
            url: `${baseUrl}/produk`,
            siteName: "Copper Craftie",
            images: ['/og-image.jpg'],
            locale: 'id_ID',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ['/og-image.jpg'],
        },
        robots: {
            // Jangan indeks halaman hasil pencarian internal agar tidak dinilai spam thin content oleh Google
            index: !search,
            follow: true,
        }
    }
}

async function getCategories(){
    const query = `array::unique(*[_type == "products" && defined(tags)].tags[])`
    const data = await client.fetch(query, {}, {next: {tags: ['katalog-produk']}})
    return data as Array<string>
}

async function getTotalProducts(filter: string){
    const query = `count(*[_type == "products" && ${filter}])`
    const data = await client.fetch(query, {}, {next: {tags: ['katalog-produk']}})
    return data as number
}

export default async function ProductsPage({ searchParams }: PageProps){
    const { page, category, search } = await searchParams
    const categories = category ? category.split(",") : []
    const searches = search ? search.toLowerCase().replace(/["*]/g, '') : '' // Sanitasi sederhana untuk GROQ
    
    const filter = `title match "*${searches}*" && count(tags[lower(@) in [${categories.map((e) => `"${e}"`)}]]) == count(${`[${categories.map((e) => `"${e}"`)}]`})`
    
    const currentPage = Number(page) || 1
    const itemsPerPage = 8
    const startIndex = (currentPage - 1) * itemsPerPage;

    // 2. Fetch data secara paralel menggunakan Promise.all (Jauh lebih cepat)
    const [totalProducts, categoriesList] = await Promise.all([
        getTotalProducts(filter),
        getCategories()
    ]);

    const totalPages = Math.ceil(totalProducts / itemsPerPage)
    
    // 3. Tambahkan filter(Boolean) untuk keamanan tipe data
    const categoriesArray = (categoriesList || [])
        .filter(Boolean)
        .map((e) => e.toLocaleLowerCase())

    return (
        <div className="">
            <Section 
                title="Produk" 
                subtitle="Telusuri berbagai kerajinan yang telah kami kerjakan untuk berbagai client."
            />
            
            <br />
            
            <div className="flex w-full gap-2 px-8 md:px-16 flex-col md:flex-row md:justify-between">
                <div className="flex-7/12">
                    <Search />
                </div>
                <div className="flex-5/12">
                    <Filter categoryArray={categoriesArray} />
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
    )
}