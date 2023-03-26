"use client";
import { db } from "@/firebase";
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function GenreComponent({ userUid }) {
  const [genres, setGenres] = useState({});

  useEffect(() => {
    return onSnapshot(
      query(collection(db, "genres")),
      orderBy("updatedAt", "desc"),
      (snapshot) => {
        setGenres(snapshot);
      }
    );
  }, []);


  const handleDelete = async(genreId) =>{
    if( window.confirm("Yakin akan menghapus genre?")){
      try {
        
        await deleteDoc(doc(db, "genres", genreId))
      } catch (error) {
        console.log(error);
      }
   } else {
       return;
   }
  }

  return (
    <div className="w-full">
      <ul className="menu bg-base-100  w-full">
        {genres?.docs?.map((item, index) => {
          return (
            <li key={item?.id}>
              <span className="flex justify-between md:justify-around">
                <span>{item?.data().genreName}</span>
                <span>Pembuat Genre :{item?.data().userDisplayName}</span>
                {item?.data()?.userId == userUid ? (
                  <span>
                    <Link
                      href={`/admin/editgenre/${item?.id}`}
                      className="text-accent hover:text-blue-500 hover:underline"
                    >
                      Edit 
                    </Link>
                    &nbsp;||&nbsp; <button className="text-red-500 hover:opacity-90 hover:underline" onClick={() => handleDelete(item?.id)}> Delete</button>
                  </span>
                ) : (
                  ""
                )}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
