import { PortableTextComponents } from '@portabletext/react';

export const myPortableTextComponents: PortableTextComponents = {
  // --- KONFIGURASI BLOCK (Heading, Paragraf, Blockquote) ---
  block: {
    h1: ({ children }) => <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-bold mt-8 mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-bold mt-6 mb-3">{children}</h3>,
    h4: ({ children }) => <h4 className="text-xl font-bold mt-5 mb-2">{children}</h4>,
    h5: ({ children }) => <h5 className="text-lg font-bold mt-4 mb-2">{children}</h5>,
    h6: ({ children }) => <h6 className="text-base font-bold mt-4 mb-2">{children}</h6>,
    normal: ({ children }) => <p className="my-3 text-gray-700 leading-relaxed">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 py-1 italic text-gray-600 my-5 bg-gray-50 rounded-r">
        {children}
      </blockquote>
    ),
  },

  // --- KONFIGURASI MARKS (Inline Styles & Link) ---
  marks: {
    strong: ({ children }) => <strong className="font-bold text-gray-900">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <u className="underline underline-offset-2">{children}</u>,
    code: ({ children }) => (
      <code className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded-md font-mono text-sm border border-gray-200">
        {children}
      </code>
    ),
    'strike-through': ({ children }) => <del className="line-through text-gray-500">{children}</del>,
    link: ({ value, children }) => {
      // Pengecekan target _blank jika link mengarah ke website luar
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return (
        <a 
          href={value?.href} 
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-blue-600 underline hover:text-blue-800 transition-colors"
        >
          {children}
        </a>
      );
    },
  },

  // --- KONFIGURASI LIST (Bullet & Number) ---
  list: {
    bullet: ({ children }) => <ul className="list-disc ml-6 space-y-1 my-4">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal ml-6 space-y-1 my-4">{children}</ol>,
  },
  
  // --- KONFIGURASI LIST ITEM ---
  listItem: {
    bullet: ({ children }) => <li className="text-gray-700">{children}</li>,
    number: ({ children }) => <li className="text-gray-700">{children}</li>,
  },

  // --- KONFIGURASI CUSTOM TYPES (Image, dll) ---
  types: {
    image: ({ value }) => (
      <div className="my-6">
        <img 
          src={value?.imageUrl} 
          alt={value?.alt || 'Image'} 
          className="w-full max-w-2xl rounded-lg shadow-sm"
        />
        {/* Render caption jika ada */}
        {value?.caption && (
          <p className="text-sm text-center text-gray-500 mt-2">{value.caption}</p>
        )}
      </div>
    ),
  },
};