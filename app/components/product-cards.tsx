'use client';

import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';
import { sendGTMProductClick } from '../lib/gtm';

export interface ProductItem {
  cover: any;
  title: string;
  slug: { current: string };
  shortDescription?: string;
  tags?: Array<string>;
}

export function ProductsCards({ data }: { data: ProductItem }) {
  const handleClick = () => {
    sendGTMProductClick({
      id: data.slug.current,
      name: data.title
    });
  };

  return (
    <Link href={`/products/${data.slug.current}`}
          onClick={handleClick} className="flex flex-col items-center justify-center bg-white drop-shadow-black/20 drop-shadow-md rounded-md font-sans-1 group hover:scale-105 duration-300 transition-all">
      <div className="w-full aspect-5/4 relative rounded-t-md overflow-clip">
        <Image
          src={urlFor(data.cover).url()}
          alt={data.title}
          fill
          sizes="1"
          loading="eager"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-2 px-2 py-4 items-center justify-center">
        <h1 className="font-bold text-sm lg:text-lg text-center">{data.title}</h1>
        <div
          className="border border-red-700 text-red-700 rounded-full w-fit px-4 py-0.5 lg:px-6 lg:py-1 group-hover:bg-red-700 group-hover:text-white transition-colors font-medium text-[0.5rem] lg:text-sm duration-300"
        >
          lihat selengkapnya
        </div>
      </div>
    </Link>
  );
}

export function ProductsCards2({ data }: { data: ProductItem }) {
  const handleClick = () => {
    sendGTMProductClick({
      id: data.slug.current,
      name: data.title
    });
  };

  return (
    <Link
      href={`/products/${data.slug.current}`}
      onClick={handleClick}
      className="flex flex-col bg-white border border-black font-sans-1 relative group"
    >
      <div className="w-full aspect-3/2 relative overflow-clip">
        <Image
          src={urlFor(data.cover).url()}
          alt={data.title}
          fill
          sizes="1"
          loading="eager"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col px-2 md:px-4 py-4 text-left">
        <h1 className="font-bold text-sm lg:text-xl">{data.title}</h1>
        {data.shortDescription && (
          <p className="font-light text-[0.5rem] lg:text-xs text-pretty">
            {data.shortDescription}
          </p>
        )}
      </div>
      <div className="w-full bottom-0 left-0 bg-black/70 absolute h-0 group-hover:h-full transition-all flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
        <p className="text-white">Lihat selengkapnya</p>
      </div>
    </Link>
  );
}