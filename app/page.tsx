import Link from 'next/link';
import Advantages from './components/advantages';
import FAQ from './components/faq';
import AutoSlideshow from './components/hero-section';
import { SixProducts, AllProducts } from './components/products';
import CTA from './components/cta';
import Stats from './components/stats';

export default function Home(){
  return (
    <div>
      <AutoSlideshow/>
      <br />
      <br />
      <section className='flex flex-col gap-2 lg:gap-4 px-6 md:px-8 lg:px-16 text-center'>
        <Stats/>
        <br />
        <h1 className='font-bold text-2xl lg:text-4xl'>Produk Kami</h1>
        <p className='font-light text-balance lg:w-1/2 mx-auto text-xs md:text-sm lg:text-md'>Kami telah mengerjakan berbagai produk original dan custom. Menghasilkan karya dengan presisi tinggi dan mengedepankan kebutuhan client.</p>
        <br />
        <div className='grid grid-cols-2 lg:grid-cols-3 gap-8'>
          <SixProducts/>
        </div>
        <br />
        <Link className='font-semibold bg-red-700 text-white w-fit mx-auto py-2 px-8 rounded-md drop-shadow-md drop-shadow-black/20 hover:bg-red-800 active:scale-95 transition-all text-sm lg:text-xl' href={'/products'}>Jelajahi produk lainnya</Link>
        <br />
        <Advantages/>
        <br />
        <h1 className='text-center font-bold text-2xl slg:text-4xl'>FAQ</h1>
        <FAQ/>
        </section>
        <br />
        <br />
        <CTA/>
        <br />
        <br />
        <br />
    </div>
  )
}