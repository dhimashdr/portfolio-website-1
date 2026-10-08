'use client'

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PostPaginationInfo{
  currentPage: number,
  totalPages: number
}

export default function PostPagination({currentPage, totalPages} : PostPaginationInfo){
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
  <div className="flex items-center justify-center gap-4 sm:gap-6 mt-8 mx-auto w-fit select-none">
    {/* Tombol Previous */}
    <button
      className={`group flex items-center justify-center p-2 sm:px-3 sm:py-2 rounded-lg transition-all duration-200 border active:scale-95 ${
        currentPage <= 1
          ? "bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-red-50 border-red-100 text-red-600 hover:bg-red-100 hover:border-red-200 hover:text-red-700 shadow-sm hover:shadow"
      }`}
      disabled={currentPage <= 1}
      onClick={() => handlePage(currentPage - 1)}
    >
      <FaChevronLeft className="size-4 sm:size-5 transition-transform group-hover:-translate-x-1" />
    </button>

    {/* Indikator Halaman */}
    <div className="text-xs sm:text-sm font-medium text-gray-500 flex items-center gap-1.5 sm:gap-2">
      Halaman
      <span className="text-gray-900 font-bold bg-gray-100 px-2.5 py-0.5 rounded-md min-w-[2rem] text-center border border-gray-200">
        {currentPage}
      </span>
      dari
      <span className="text-gray-900 font-semibold">
        {totalPages}
      </span>
    </div>

    {/* Tombol Next */}
    <button
      className={`group flex items-center justify-center p-2 sm:px-3 sm:py-2 rounded-lg transition-all duration-200 border active:scale-95 ${
        currentPage >= totalPages
          ? "bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-red-50 border-red-100 text-red-600 hover:bg-red-100 hover:border-red-200 hover:text-red-700 shadow-sm hover:shadow"
      }`}
      disabled={currentPage >= totalPages}
      onClick={() => handlePage(currentPage + 1)}
    >
      <FaChevronRight className="size-4 sm:size-5 transition-transform group-hover:translate-x-1" />
    </button>
  </div>
);
}