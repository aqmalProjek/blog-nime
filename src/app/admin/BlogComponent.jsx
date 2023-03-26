import { db } from "@/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function BlogComponent({ session }) {
  const [blogs, setBlogs] = useState({});
  useEffect(() => {
    return onSnapshot(
      query(collection(db, "blogs")),
      orderBy("updatedAt", "desc"),
      (snapshot) => {
        setBlogs(snapshot);
      }
    );
  }, []);

  console.log(blogs);
  return (
    <div className="w-full">
      <ul className="menu bg-base-100  w-full truncate relative">
        {blogs?.docs?.map((item, index) => {
          return (
            <li key={item?.id} className="relative">
              <span className="flex justify-between md:justify-between  ">
                <span className="truncate w-1/2 hover:text-blue-500 hover:underline block">
                <Link href={`/admin/detailblog/${item.id}`}>
                  {index + 1} {item?.data().title}  asdasd asdasdad asdasd  asda
                </Link>
                </span>

                <span className="absolute right-2">
                  <Link
                    href={`/admin/editgenre/${item?.id}`}
                    className="text-accent hover:text-blue-500 hover:underline"
                  >
                    Edit
                  </Link>
                  &nbsp;||&nbsp;{" "}
                  <button
                    className="text-red-500 hover:opacity-90 hover:underline"
                    onClick={() => handleDelete(item?.id)}
                  >
                    {" "}
                    Delete
                  </button>
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
