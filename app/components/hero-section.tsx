'use client'

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = ["/images/hero-section/hero-1.jpg", "/images/hero-section/hero-2.jpg", "/images/hero-section/hero-3.jpg", "/images/hero-section/hero-4.jpg", "/images/hero-section/hero-5.jpg"];
const AUTO_PLAY_INTERVAL = 3000; // 3 seconds

export default function AutoSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, AUTO_PLAY_INTERVAL);

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  return (
    <div className="relative overflow-hidden w-full aspect-16/7 font-sans-1 text-white">
      <AnimatePresence mode="sync">
        <motion.div 
            key={index}
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            exit={{ opacity: 0}}
            transition={{ duration: 3, ease: "easeOut" }}
            className={`absolute w-full h-full bg-cover bg-center`} style={{backgroundImage: `url(${images[index]})`}}>
        </motion.div>
      </AnimatePresence>
      <div className='relative w-full h-full bg-black/64 flex flex-col justify-center-safe p-8 lg:p-16 gap-4'>
        <h1 className='font-bold text-2xl lg:text-4xl text-shadow-md text-shadow-black/50'>Kerajinan Tembaga Kuningan</h1>
        <p className='font-light text-xs lg:text-sm text-shadow-xs text-shadow-black/50 text-pretty lg:w-1/2'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias nobis atque quisquam dolore sequi inventore velit perspiciatis corrupti quo explicabo! Illum unde libero ipsum, veritatis molestias assumenda quidem accusantium veniam nihil qui dicta magni numquam quia. Mollitia quam maiores nihil animi magnam asperiores veniam deleniti?</p>
      </div>
    </div>
  );
}
