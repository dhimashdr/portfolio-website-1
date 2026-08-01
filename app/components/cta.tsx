import Link from "next/link"
import { FaWhatsapp } from "react-icons/fa"

export default function CTA(){
    return (
        <div className="text-center flex flex-col gap-2 items-center p-8 lg:p-16 relative bg-black/70 bg-[url(/images/section-background.jpg)] bg-cover bg-center bg-blend-multiply text-white font-sans-1">
            <h1 className="font-bold text-xl lg:text-3xl lg:w-1/2 text-pretty">Tertarik untuk memesan kerajinan tembaga atau kuningan?</h1>
            <p className="font-light text-xs text-balance lg:text-md">Hubungi kami untuk mendapatkan informasi harga produk, konsultasi, atau pemesanan custom.</p>
            <br />
            <Link href="https://wa.me/6285812780604" className="flex bg-green-500 py-2 px-8 text-white items-center gap-2 rounded-sm hover:bg-green-600 active:scale-95 transition-all drop-shadow-md drop-shadow-black/20">
                <FaWhatsapp className="size-5 lg:size-6"/>
                <h1 className="font-bold text-sm lg:text-lg">Hubungi kami</h1>
            </Link>
        </div>
    )
}