"use client"
import { drawerState } from '@/atom/drawerAtom';
import React from 'react'
import Drawer from 'react-modern-drawer'
import { useRecoilState } from 'recoil';
import NavigationButton from './components/NavigationButton';
export default function Sidebar() {
    const [isDrawer,setIsDrawer] = useRecoilState(drawerState);
  return (
        <div className={isDrawer ? `flex w-48 flex-col fixed top-16 shadow-sm z-[20] bg-[#2a303c] bg-opacity-60 backdrop-blur-md ` : `hidden lg:w-48 md:w-14 flex-col md:flex md:top-16 md:sticky z-[20]`}>
            
          
            

            <NavigationButton text="Semua Artikel Anime" href="/"/>
            <NavigationButton text="Anime Musisman"/>
            <NavigationButton text="Anime Movie"/>
            <NavigationButton text="Anime Panjang"/>
            <NavigationButton text="Manga"/>
            <span className='text-white'>Catet moment anime mu!</span>
            <NavigationButton text="Kelola Postingan" href="/admin"/>

            

            
        </div>
  )
}
