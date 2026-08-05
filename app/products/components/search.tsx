'use client'

import { FaSearch } from "react-icons/fa";
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useDebouncedCallback } from 'use-debounce';
import { motion as m } from 'framer-motion'

export default function Search(){
    const searchParams = useSearchParams()
    const pathName = usePathname()
    const { replace } = useRouter()

    const handleSearch = useDebouncedCallback((term : string) => {
        const params = new URLSearchParams(searchParams)
        if (term) {
            params.delete('page')
            params.set('search', term)
        } else {
            params.delete('search')
        }
        replace(`${pathName}?${params.toString()}`)
    }, 500)

    return <m.div className="flex w-full bg-slate-100 rounded-3xl px-4 py-1 border md:border-2 text-xs md:text-sm focus-within:border-red-400 border-slate-400 items-center justify-center transition-colors duration-300" layout>
        <input placeholder="Cari produk" type="text" onChange={(e) => handleSearch(e.target.value)} defaultValue={searchParams.get('search')?.toString()} className="focus:ring-0 focus:outline-none flex-1/2 placeholder-slate-400"/>
        <FaSearch className="w-5 text-slate-400"/>
    </m.div>
}