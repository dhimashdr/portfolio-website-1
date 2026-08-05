'use client'

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface ProductPaginationInfo{
  currentPage: number,
  totalPages: number
}

export default function ProductPagination({currentPage, totalPages} : ProductPaginationInfo){
  const pageParams = useSearchParams()
  const pathName = usePathname()
  const router = useRouter()
  
  const handlePage = (page : number) => {
      const params = new URLSearchParams(pageParams)
      if (page > 1 && page <= totalPages) {
          params.set('page', page.toString())
      } else {
          params.delete('page')
      }
      router.replace(`${pathName}?${params.toString()}`)
  }

  return (
    <div className="flex gap-4 mt-8 mx-auto w-fit text-xs md:text-sm items-center">
      <button
        className={`font-light border-2 border-white/10 px-2 py-1 rounded-sm ${currentPage <= 1 ? "bg-neutral-600/40 text-neutral-500" : "text-red-500 bg-red-100 hover:bg-red-200"}`}
        disabled={currentPage <= 1}
        onClick={() => handlePage(currentPage - 1)}
      >
        <FaChevronLeft className="size-3 lg:size-5"/>
      </button>

      <span className="text-xs lg:text-sm">halaman {currentPage} dari {totalPages}</span>

      <button
      className={`font-light border-2 border-white/10 px-2 py-1 rounded-sm ${currentPage >= totalPages ? "bg-neutral-600/40 text-neutral-500" : "text-red-500 bg-red-100 hover:bg-red-200"}`}
        disabled={currentPage >= totalPages}
        onClick={() => handlePage(currentPage + 1)}
      >
        <FaChevronRight className="size-3 lg:size-5"/>
      </button>
    </div>
  );
}