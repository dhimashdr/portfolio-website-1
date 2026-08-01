"use client";

import { usePathname } from "next/navigation"
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const Links = [
    {
        href: "/",
        label: "Home"
    },
    {
        href: "/products",
        label: "Produk"
    },
    {
        href: "/gallery",
        label: "Galeri"
    },
    {
        href: "/how-to-order",
        label: "Cara Pesan"
    },
    {
        href: "/contacts",
        label: "Kontak"
    },
]

export default function NavBar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuVariants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.2,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.2,
        when: "beforeChildren",
        staggerChildren: 0.05,
      },
    },
  };

  const linkVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 },
  };

  return (
    <nav className="sticky top-0 z-60 bg-white/80 backdrop-blur-md drop-shadow-lg shadow-black font-sans-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="shrink-0 flex items-center">
            <Link href="/" className="w-10 aspect-square relative">
              <Image src={`/images/no-image.png`} alt="logo" fill sizes="100"/>
            </Link>
          </div>

          <div className="hidden md:flex space-x-8">
            {Links.map((e, i) => {
                return (
                    <Link href={e.href} key={i} className={`font-semibold text-primary hover:text-red-700 hover:bg-red-700/10 transition-colors duration-300 rounded-md px-2 ${pathname.includes(e.href) && (e.href !== "/" || pathname === "/") ? "text-red-700 bg-red-700/10" : ""}`}>{e.label}</Link>
                )
            })}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            className="md:hidden overflow-hidden"
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="px-4 pt-2 pb-4 space-y-1">
              {Links.map((link) => (
                <motion.div key={link.href} variants={linkVariants}>
                  <Link
                    href={link.href}
                    className={`block px-3 py-2 rounded-md text-sm font-semibold text-black hover:text-red-700 hover:bg-red-700/10 ${pathname.includes(link.href) && (link.href !== "/" || pathname === "/") ? "text-red-700 bg-red-700/10" : ""}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}