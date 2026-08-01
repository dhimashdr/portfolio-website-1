import Image from "next/image"

export default function Section({title, subtitle} : {title : string, subtitle : string}){
    return <div className="w-full aspect-3/1 lg:aspect-5/1 relative">
        <Image src={"/images/section-background.jpg"} draggable="false" fill sizes="1" alt="section-background" className="object-cover"></Image>
        <div className="absolute bg-black/80 top-0 left-0 w-full h-full flex flex-col items-center-safe justify-center-safe text-white font-sans-1">
        <h1 className="font-bold text-2xl lg:text-4xl text-center">{title}</h1>
        <p className="font-light text-xs lg:text-sm text-center">{subtitle}</p>
        </div>
    </div>
}