import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

// Secret token yang Anda buat sendiri di Sanity Dashboard
const secret = process.env.SANITY_WEBHOOK_SECRET

export async function POST(req: NextRequest) {
  try {
    // Validasi bahwa request benar-benar datang dari Sanity
    const { isValidSignature, body } = await parseBody(req, secret)

    if (!isValidSignature) {
      return NextResponse.json({ message: 'Invalid signature' }, { status: 401 })
    }

    if (!body?._type) {
      return NextResponse.json({ message: 'Bad Request' }, { status: 400 })
    }

    const documentType = body?._type

    // Meruntuhkan cache berdasarkan tag (misalnya tag 'katalog-produk')
    if (documentType === 'products') {
        revalidateTag('katalog-produk', 'max')
    } 
    else if (documentType === 'posts') {
        revalidateTag('artikel', 'max')
    }

    return NextResponse.json({ 
      status: 200, 
      revalidated: true, 
      now: Date.now(), 
      body 
    })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}