"use client"

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import BasicTemplate from '../components/BasicTemplate'
import BlogComponent from './BlogComponent';
import GenreComponent from './GenreComponent';



export default function adminPage() {
  const router = useRouter();
  // console.log(providers);
  const {data:session} = useSession();
  console.log(session);
  

  useEffect(() => {
    

    if(!session && session !== undefined) {
      router.push('/');
    }

  },[session,router])

  if(session == undefined) {
    return (
      <BasicTemplate>
        Membaca credential
      </BasicTemplate>
    )
  }
    
  return (
    <BasicTemplate>
        <div className='flex w-full flex-col h-[100vw] mx-1 shadow-md rounded-md bg-white items-center px-2 py-1'>
            <h2 className='text-center text-xl underline '>Kelolah Data Postingan</h2>
            <p>Halaman untuk mengelolah postingan kamu, disini kamu bisa mengelolah data postingan, juga mengelolah data genre pada postingan kamu.!</p>
            <h2>Artikel kamu saat ini</h2>
            <div className='flex flex-col items-start space-y-2 w-full'>
            <Link className="text-xl text-primary" href="/admin/addblog/">Tambah Artikel</Link>

            <BlogComponent session={session}/>
            </div>
            <h2>Genre postingan yang tersedia</h2>
            <div className='flex flex-col items-start space-y-2 w-full'>
                <Link className="text-xl text-primary" href="/admin/addgenre/">Tambah Genre</Link>

                <GenreComponent userUid={session?.user?.uid}/>
            </div>
        </div>
    </BasicTemplate>
  )
}
