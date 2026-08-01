'use client'

import { motion } from "framer-motion"

const variants = {
    initial: {y: 16, opacity: 0},
    animate: {y: 0, opacity: 1},
}

export default function Stats(){
    return <div className="grid grid-cols-3">
        <div className="flex flex-col justify-center border-r border-gray-500">
            <motion.h1 variants={variants} initial="initial" whileInView="animate" transition={{duration: 0.5, ease: "easeOut"}} viewport={{once: true}} className="font-bold text-red-700 text-2xl lg:text-4xl">100+</motion.h1>
            <motion.p variants={variants} initial="initial" whileInView="animate" transition={{duration: 0.5, ease: "easeOut"}} viewport={{once: true}} className="font-light text-[0.625rem] lg:text-sm">pengiriman ke berbagai daerah di Indonesia</motion.p>
        </div>
        <div className="flex flex-col justify-center border-r border-gray-500">
            <motion.h1 variants={variants} initial="initial" whileInView="animate" transition={{duration: 0.5, ease: "easeOut"}} viewport={{once: true}} className="font-bold text-red-700 text-2xl lg:text-4xl">20+</motion.h1>
            <motion.p variants={variants} initial="initial" whileInView="animate" transition={{duration: 0.5, ease: "easeOut"}} viewport={{once: true}} className="font-light text-[0.625rem] lg:text-sm">client yang telah melakukan repeat order</motion.p>
        </div>
        <div className="flex flex-col justify-center">
            <motion.h1 variants={variants} initial="initial" whileInView="animate" transition={{duration: 0.5, ease: "easeOut"}} viewport={{once: true}} className="font-bold text-red-700 text-2xl lg:text-4xl">99%</motion.h1>
            <motion.p variants={variants} initial="initial" whileInView="animate" transition={{duration: 0.5, ease: "easeOut"}} viewport={{once: true}} className="font-light text-[0.625rem] lg:text-sm">produk sesuai dan aman sampai ke tangan penerima</motion.p>
        </div>
    </div>
}