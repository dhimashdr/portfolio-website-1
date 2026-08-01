import Section from "../components/section"

const steps = [
    {
        step: 1,
        title: "Pilih produk yang anda inginkan",
        description: "Kirimkan gambar atau informasi mengenai produk yang anda inginkan melalui Whatsapp."
    },
    {
        step: 2,
        title: "Anda memperoleh informasi produk",
        description: "Kami akan memberi tahu informasi mengenai detail, harga, dan kesediaan barang kepada Anda."
    },
    {
        step: 3,
        title: "Sistem pembayaran DP 50%",
        description: "Pembayaran dilakukan dua tahap, pertama DP 50% di awal. Setelah barang sudah jadi dan siap dikirimkan, pembeli melakukan pelunasan. Semua transaksi hanya melalui rekening a.n. Dimas Hendrico"
    },
    {
        step: 4,
        title: "Produk sampai ke tangan penerima",
        description: "Pastikan barang yang diterima sesuai dengan pesanan."
    }
]

function StepCard({step, title, description} : {step : number, title : string, description : string}){
    return     <div className="flex gap-4">
        <div className="flex-1/12 flex flex-col items-center justify-center gap-1">
        <h1 className="font-bold flex h-12 lg:h-16 aspect-square border border-gray-500 text-center text-lg md:text-2xl justify-center items-center">{step}</h1>
        </div>
        <div className="flex-11/12 flex flex-col gap-2">
        <h1 className="text-lg md:text-xl font-bold">{title}</h1>
        <p className="text-xs md:text-sm font-light">{description}</p>
        </div>
    </div>
}

export default function HowPage(){
    return <div>
        <Section title="Cara Pesan" subtitle="Panduan berikut adalah alur pemesanan produk kami"/>
        <div className="flex flex-col gap-8 p-8 md:p-16">
        {steps.map((e, i) => {
            return <StepCard key={i} step={e.step} title={e.title} description={e.description}/>
        })}
    </div>
    </div>
}