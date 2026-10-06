'use client';

import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';
import { PortableText } from 'next-sanity';
import { FaCalendarAlt, FaArrowRight } from 'react-icons/fa';

export interface PostItem {
  cover: any,
  title: string,
  slug: { current: string },
  _updatedAt: string,
  content: any
}

export function PostCards({ data }: { data: PostItem }) {
  const date = new Date(data._updatedAt);
  const formattedDate = date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC' 
  });

  return (
    <Link href={`/posts/${data.slug.current}`} className="flex flex-col justify-center bg-white drop-shadow-black/20 drop-shadow-md rounded-md font-sans-1 group hover:bg-red-700 hover:text-white hover:scale-105 duration-500 transition-all">
      <div className="w-full aspect-6/4 relative rounded-t-md overflow-clip">
        <Image
          src={urlFor(data.cover).url()}
          alt={data.title}
          fill
          sizes="1"
          loading="eager"
          className="object-cover"
        />
      </div>
      <div className='flex flex-col p-2 gap-2'>
        <div className='flex items-center gap-2 text-neutral-600 group-hover:text-white duration-500 transition-all'>
        <FaCalendarAlt className='size-3'/>
        <p className='font-light text-xs'>{formattedDate}</p>
      </div>
      <h1 className="font-bold text-xs lg:text-lg">{data.title}</h1>
      <div className='text-xs flex items-end'>
        <PortableText value={data.content[0]}/>
      </div>
      <div className='flex gap-2 items-center ml-auto text-red-600 group-hover:text-white duration-500 transition-all'>
        <p className='font-light text-xs'>Baca Selengkapnya</p>
        <FaArrowRight className='size-3'/>
      </div>
      </div>
    </Link>
  );
}