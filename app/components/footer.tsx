import Image from "next/image"
import Link from "next/link"
import { FaInstagram, FaWhatsapp, FaFacebook, FaTiktok, FaPhone, FaEnvelope } from "react-icons/fa";

const socials = [
    {
        icon: <FaInstagram className="w-full h-full"/>,
        url: "https://instagram.com"
    },
    {
        icon: <FaWhatsapp className="w-full h-full"/>,
        url: "https://wa.me/6285812780604"
    },
    {
        icon: <FaFacebook className="w-full h-full"/>,
        url: "https://facebook.com"
    },
    {
        icon: <FaTiktok className="w-full h-full"/>,
        url: "https://tiktok.com"
    },
]

const contacts = [
    {
        icon: <FaPhone className="w-full h-full"/>,
        value: "0858-1278-0604"
    },
    {
        icon: <FaWhatsapp className="w-full h-full"/>,
        value: "0858-1278-0604"
    },
    {
        icon: <FaEnvelope className="w-full h-full"/>,
        value: "dhimashdr@gmail.com"
    },
]

export default function Footer(){
    return <div className="bg-primary text-white">
    <div className="w-full flex flex-col gap-8 md:gap-2 md:flex-row px-6 lg:px-16 py-8 font-sans-1">
        <div className="flex flex-col flex-1/2 gap-6 lg:gap-8">
            <h1 className="text-md lg:text-2xl font-bold">Tentang Kami</h1>
            <div className="flex items-center gap-2">
                <div className="h-12 w-12 relative">
                    <Image src={'/images/no-image.png'} alt="logo" fill sizes="1"></Image>
                </div>
                <h1 className="font-light text-xs lg:text-sm">nama brand</h1>
            </div>
            <p className="text-[0.625rem] lg:text-sm text-balance">Menerima pemesanan kerajinan tembaga dan kuningan dengan kualitas dan presisi yang tinggi. Bebas melakukan custom design sesuai kebutuhan Anda. Bebas konsultasi untuk mengetahui harga dan detail kerajinan yang Anda inginkan!</p>
            <div className="flex gap-4">
                {socials.map((e, i) => {
                    return <Link href={e.url} key={i}>
                        <div className="w-6 md:w-8 border border-white p-1 md:p-2 rounded-sm aspect-square hover:bg-gray-500">
                            {e.icon}
                        </div>
                    </Link>
                })}
            </div>
        </div>
        <div className="flex flex-col flex-1/2 gap-4">
            <h1 className="font-bold text-md lg:text-2xl">Alamat :</h1>
            <p className="text-balance text-xs lg:text-md">Banaran RT 03/RW 08, Desa Cepogo, Kecamatan Cepogo, Kabupaten Boyolali, Jawa Tengah, 57362</p>
            <hr className="text-gray-600 my-2 lg:my-8"/>
            <div className="flex flex-col gap-4 justify-center">
                {contacts.map((e, i) => {
                    return <div className="flex gap-4" key={i}>
                        <div className="w-4 lg:w-6 aspect-square">
                            {e.icon}
                        </div>
                        <p className="text-[0.625rem] lg:text-sm">
                            {e.value}
                        </p>
                    </div>
                })}
            </div>
        </div>
    </div>
    <br />
    <hr className="mx-6 lg:mx-16 text-gray-700"/>
    <br />
    <div className="flex px-16 items-center justify-center text-xs md:text-sm text-gray-500 ">
        <h1></h1>
        <h1 className="mx-auto">© 2026, diverse.id</h1>
    </div>
    <br />
    </div>
}