"use client"
import BasicTemplate from "@/app/components/BasicTemplate";
import { db } from "@/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, {  useEffect, useState } from "react";
import Moment from "react-moment";

export default function page({ params }) {
  const router = useRouter();
  const [blog,setBlog] = useState(null);

  useEffect(
    () =>
      onSnapshot(doc(db, "blogs", params.blogId), (snapshot) => {
        setBlog(snapshot)
      }),
    [db, params.blogId]
  );


  const backHandle = () => {
    router.push("/admin");
  }
  console.log(blog);
  return (
    <BasicTemplate>
      <div className="flex w-full flex-col min-h-[500px] mx-1 shadow-md rounded-md bg-white items-center px-2 py-1">
        {blog !== null ? (<>
        <div className="w-full flex flex-col py-3 px-2 relative">
          <div className="" onClick={backHandle}>
            <button className="rounded-full bg-primary flex justify-center items-center p-2 w-20 h-20 text-white">Mundur</button>
          </div>
          <div className="flex justify-between">
          <h2 className="text-xl block">{blog?.data()?.title}</h2>
          <span><Moment fromNow>{blog?.data()?.updatedAt.toDate()}</Moment></span>
          </div>
          <div className="flex justify-between">
          <h2 className="text-sm block">Penulis : {blog?.data()?.userDisplayName}</h2>
          </div>
          <div className="w-full min-h-[250px] sm:h-[330px] relative md:h-[400px] lg:h-[500px]">
            <Image src={blog?.data().postImage} className="relative w-full h-full object-cover" placeholder="blur" blurDataURL="https://images6.alphacoders.com/731/thumb-1920-731739.png" priority fill alt="backgourd image"/>
          </div>
          <p className="text-justify ">{blog?.data()?.content}</p>
        </div>
          
        </>) : ('')}
        
      </div>
    </BasicTemplate>
  );
}
