import Link from "next/link"
import Section from "../components/section"
import { FaWhatsapp, FaEnvelope } from "react-icons/fa"

const contacts = [
    {
        icon: <FaWhatsapp className="size-6 text-green-500"/>,
        value: "62 858 1278 0604",
        href: "https://wa.me/6285812780604"
    },
    {
        icon: <FaEnvelope className="size-6 text-purple-500"/>,
        value: "dhimashdr@gmail.com",
        href: "mailto:dhimashdr@gmail.com"
    },
]

export default function ContactsPage(){
    return <div className="font-sans-2">
        <Section title="Kontak" subtitle="Informasi kontak kami yang dapat Anda hubungi"/>
        <div className="flex flex-col gap-8 lg:gap-2 lg:flex-row p-8 md:p-16">
        <div className="flex-1/2 gap-4 flex flex-col">
        <p className="text-balance text-sm md:text-lg font-bold">Konsultasikan dengan kami terkait kerajinan tembaga dan kuningan yang Anda inginkan melalui kontak berikut : </p>
        {contacts.map((e, i) => {
            return <div key={i} className="flex items-center-safe gap-2">
                {e.icon}<Link href={e.href} className="text-sm">{e.value}</Link>
            </div>
        })}
        </div>
        <div className="flex-1/2 flex flex-col gap-4">
        <h1 className="font-bold text-sm lg:text-lg">Alamat kami :</h1>
            <div className="w-full md:w-2/3 aspect-video relative">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1595.1973649939491!2d110.51762427045765!3d-7.502178882467227!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a6506e65c78b3%3A0x4a6a446291741889!2sWallCovering(%20kerajinan%20Tembaga%20%26%20Kuningan)!5e0!3m2!1sid!2sid!4v1785826903352!5m2!1sid!2sid" className="w-full h-full" loading="lazy"></iframe>
            </div>
            <p className="text-xs lg:text-sm text-balance">Dukuh Banaran RT 03 / RW 08, Desa Cepogo, Kecamatan Cepogo, Kabupaten Boyolali, Provinsi Jawa Tengah, 57362</p>
        </div>
    </div>
    </div>
}