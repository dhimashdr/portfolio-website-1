'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaChevronLeft } from "react-icons/fa";

const faq = [
    {
        question: "Bagaimana cara order?",
        answer: "Untuk melakukan order bisa menghubungi Whatsapp yang tertera."
    },
    {
        question: "Apakah packing aman?",
        answer: "Packing dijamin aman karena menggunakan packing kayu serta proteksi untuk melindungi produk dari kerusakan."
    },
    {
        question: "Apakah bisa membuat kerajinan selain yang ada di daftar katalog?",
        answer: "Sangat bisa, silakan untuk konsultasikan terlebih dahulu terkait detail kerajinan yang diinginkan melalui whatsapp, gratis konsultasi."
    },
    {
        question: "Bagaimana sistem pembayarannya?",
        answer: "Sistem pembayaran dilakukan dengan DP 50% ke nomor rekening ..., kemudian melakukan pelunasan ketika barang sudah jadi (akan dihubungi lagi setelah barang sudah jadi)."
    },
]

const variants = {
    closed: { height: 0, opacity: 0, y: -10 },
    open: { height: "auto", opacity: 1, y: 0 },
};

export default function FAQ(){
    const [openIndexes, setOpenIndexes] = useState<number[]>([]);

    const toggleQuestion = (index : number) => {
        if (openIndexes.includes(index)) {
            setOpenIndexes(openIndexes.filter((item) => item !== index));
        } else {
            setOpenIndexes([...openIndexes, index]);
        }
    };

    return <div className='flex flex-col gap-2 font-sans-1'>
        {faq.map((e, i) => {
            const isCurrentlyOpen = openIndexes.includes(i);

            return (
                    <div className='flex flex-col w-full border border-black px-4 py-2 text-left' key={i}>
                        <div onClick={() => toggleQuestion(i)} className='flex items-center cursor-pointer py-0.5'>
                            <h1 className='font-semibold text-sm lg:text-lg text-pretty'>{e.question}</h1>
                            <div className='ml-auto h-4 aspect-auto'>
                                {isCurrentlyOpen ? <FaChevronDown className='size-3 lg:size-4'></FaChevronDown> : <FaChevronLeft className='size-3 lg:size-4'></FaChevronLeft>}
                            </div>
                        </div>
                        <AnimatePresence>{isCurrentlyOpen && <motion.div variants={variants} initial="closed" animate="open" exit="closed" transition={{duration: 0.3}} className='text-xs lg:text-sm flex flex-col gap-2'><hr className='text-gray-300'/>{e.answer}</motion.div>}</AnimatePresence>
                    </div>
            )
        })}
    </div>
}