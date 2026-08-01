'use client'

import { motion, AnimatePresence } from 'framer-motion'

const advantages = [
    {
        headline: "Custom Karya",
        desc: "Wujudkan ide Anda dalam bentuk kerajinan tembaga atau kuningan",
        img: "/images/advantages/adv-1.jpg"
    },
    {
        headline: "Detail dan Presisi",
        desc: "Dibuat dengan mengedepankan detail karya dan keakuratan yang tinggi",
        img: "/images/advantages/adv-2.jpg"
    },
    {
        headline: "Bahan Premium",
        desc: "Menggunakan logam berkualitas dan premium untuk menjamin kualitas karya",
        img: "/images/advantages/adv-3.jpg"
    },
    {
        headline: "Packing Aman",
        desc: "Produk terlindungi dan terjaga dengan aman hingga ke tangan penerima",
        img: "/images/advantages/adv-4.jpg"
    },
]

const variants = {
    initial: {y: 16, opacity: 0},
    animate: {y: 0, opacity: 1}
}

export default function Advantages(){
    return (
        advantages.map((e, i) => {
            return <motion.div variants={variants} initial="initial" whileInView="animate" transition={{duration: 0.5, ease: "easeOut"}} viewport={{once: true}} className='relative overflow-hidden w-full aspect-8/1 shadow-md shadow-black/20 rounded-lg text-left' key={i}>
                <div className={`absolute w-full h-full bg-cover bg-center`} style={{backgroundImage: `url(${e.img})`}}></div>
                <div className={`z-50 p-2 lg:p-8 relative from-white to-transparent from-40% w-full h-full flex items-center ${i % 2 == 0 ? "bg-linear-90" : "bg-linear-270 flex-row-reverse text-right"}`}>
                    <div className='flex flex-col'>
                        <h1 className='font-bold text-red-700 text-[0.6rem] lg:text-2xl'>{e.headline}</h1>
                        <p className='font-light text-[0.4rem] lg:text-sm'>{e.desc}</p>
                    </div>
                </div>
            </motion.div>
        })
    )
}