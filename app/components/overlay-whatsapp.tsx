import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export default function OverlayWhatsapp(){
    return <Link href="https://wa.me/6285812780604" className="flex gap-2 md:px-4 p-2 rounded-full fixed z-70 bottom-4 left-4 bg-green-500 text-white text-shadow-md text-shadow-black/20 items-center justify-center hover:scale-105 hover:bg-green-600 transition-all duration-300">
        <FaWhatsapp className="size-6"/>
        <p className="text-sm font-medium hidden md:block">Chat via WhatsApp</p>
    </Link>
}