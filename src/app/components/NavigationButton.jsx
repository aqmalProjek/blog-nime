import Link from 'next/link'
import React from 'react'

export default function NavigationButton({text, href = '/' }) {
    
  return (
    <div className='flex items-center space-x-3 cursor-pointer select-none  py-3 pl-3 transition-all duration-100 hover:scale-110 hover:rounded-sm hover:text-white hover:bg-emerald-400'>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                </div>
                <Link href={href}>
                <span className='md:hidden lg:block'>{text}</span>
                </Link>
    </div>
  )
}
