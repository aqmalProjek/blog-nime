"use client"
import { db } from '@/firebase'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'

export default function GenreComponent() {

  const [genres,setGenres] = useState({});

  useEffect(() => {
    return  onSnapshot(query(collection(db,"genres")), orderBy("updatedAt","desc"), (snapshot) =>{
      setGenres(snapshot)
    })
  },[db])

  console.log(genres);

  return (
    <div className="w-full">
  

  <ul className="menu bg-base-100  w-full">
  {genres?.docs?.map((item,index) => {
    return (

      <li key={item?.id}><span className='flex justify-between md:justify-around'><span>{item?.data().genreName}</span> <span>Pembuat Genre :{item?.data().userDisplayName}</span></span></li>
    )
  })}
</ul>
</div>
  )
}
