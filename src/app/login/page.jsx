"use client"
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
// import {getProviders, signIn} from "next-auth/react"
import React, { useEffect } from "react";
import BasicTemplate from "../components/BasicTemplate";

// async function getAllProviders(){
//     const provider = await getProviders();
//     return JSON.parse(provider)
// }

export default  function LoginPage() {
    // const providers = await getAllProviders();
    const router = useRouter();
    // console.log(providers);
    const {data:session} = useSession();

    useEffect(() => {
      if(session) {
        router.push('/');
      }

    },[session])


   
  return (
    <BasicTemplate>

    <div className="flex justify-center items-center md:justify-center w-full md:w-1/4">

    <div className="flex flex-col bg-white justify-center items-center shadow-md rounded-lg w-96 min-h-[24rem]">
      <h2>Login Menggunakan</h2>
    <div className="mt-5">
      <button className="btn bg-red-600 text-white border-white" onClick={() => signIn("google")}>
          Google Provider
      </button>
    </div>
    </div>

      

    </div>


    </BasicTemplate>
  );
}
