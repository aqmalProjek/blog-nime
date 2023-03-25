import Image from 'next/image'
import React from 'react'

export default function BasicTemplate({children}) {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      <div className="flex-1 flex items-center bg-white relative  md:max-h-96 md:min-h-[300px] min-h-[600px] rounded-t-2xl overflow-hidden">
        <Image src="https://images6.alphacoders.com/731/thumb-1920-731739.png" className="relative w-full h-full object-cover" placeholder="blur" blurDataURL="https://images6.alphacoders.com/731/thumb-1920-731739.png" priority fill alt="backgourd image" />
        <div className="absolute w-full h-full bg-[#2a303c] backdrop-blur-sm bg-opacity-40 justify-center">

        <span className="ml-4 mt-4 text-3xl absolute text-white">Beranda Blog Nime</span>
        <span className="ml-4 mt-14 text-sm absolute text-white">Kata kunci : Semua Anime</span>
        </div>
      </div>
    <div className="flex w-full flex-wrap md:-mt-10  mt-36 justify-around absolute z-10 md:relative">
      {children}
    </div>

  </div>
  )
}
