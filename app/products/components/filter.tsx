// import bookData from "../../data/bookData.json";
'use client'

import { FaFilter, FaArrowRight, FaTrashAlt } from "react-icons/fa";
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { motion as m } from "framer-motion"

export default function Filter({categoryArray}: {categoryArray: Array<string>}){
    const filterParams = useSearchParams()
const pathName = usePathname()
const { replace } = useRouter()

const handleFilter = (filter : Array<string>) => {
    const params = new URLSearchParams(filterParams)
    if (filter.length != 0) {
        params.delete('page')
        params.set('category', filter.map(g => g.toString()).join(' '))
    } else {
        params.delete('category')
    }
    replace(`${pathName}?${params.toString()}`)
}

function inputFilter() {
    const checkboxes = document.querySelectorAll('input[name="category"]:checked');
    const selectedcategory = Array.from(checkboxes).map(cb => (cb as HTMLInputElement).value);

    handleFilter(selectedcategory);
    document.getElementById("Categories")?.classList.toggle("hidden");
}

function clearFilter() {
    const checkboxes = document.querySelectorAll('input[name="category"]:checked');
    checkboxes.forEach(cb => (cb as HTMLInputElement).checked = false);
    const params = new URLSearchParams(filterParams)
    params.delete('category')
    replace(`${pathName}?${params.toString()}`)
    document.getElementById("Categories")?.classList.toggle("hidden");
}

function showFilter(){
    document.getElementById("Categories")?.classList.toggle("hidden");
}

let categoryPlaceholder = 'Kategori'
if (filterParams.get('category')) {
    categoryPlaceholder = filterParams.get('category')?.toString().split(' ').map(g => g.charAt(0).toUpperCase() + g.slice(1)).join(', ') || 'category'
}


    return <>
    <m.div className="text-xs md:text-sm relative font-sans" layout>
        <button onClick={showFilter} className="px-4 w-full bg-slate-100 text-left hover:bg-slate-300 rounded-full delay-50 transition-all py-1 border md:border-2 border-slate-400 focus:border-red-400">
            <div className="flex items-center justify-center text-slate-400">
                <span className="flex-1/2 my-auto">{categoryPlaceholder}</span>
                <FaFilter className="w-5"/>
            </div>
        </button>
        <m.div id="Categories" className="hidden absolute z-55 w-full" layout>
            <form className="bg-slate-100 border border-black grid-cols-2 p-2 grid gap-1">
        {categoryArray.map((g, i) => {
            return <label key={i} className="flex items-center gap-1"><input type="checkbox" name="category" id="category" value={g.toLowerCase()}/> {g} </label>
        })}
        </form>
        <div className="w-full flex font-semibold text-bg-2">
            <label className="flex-1/2 bg-green-700 p-2 hover:bg-green-800 flex"><button type="button" onClick={inputFilter} className="flex-1/2 text-left">Show</button> 
            <FaArrowRight className="w-5"/>
            </label>
            <label className="flex-1/2 bg-red-700 p-2 hover:bg-red-950 flex"><button type="button" onClick={clearFilter} className="flex-1/2 text-left">Reset</button>
            <FaTrashAlt className="w-5"/>
            </label>
        </div>
        </m.div>
    </m.div>
    </>
}