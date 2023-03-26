"use client";
import BasicTemplate from "@/app/components/BasicTemplate";
import { db } from "@/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function page({ params }) {
  const router = useRouter();
  // console.log(providers);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session && session !== undefined) {
      router.push("/");
    }
  }, [session, router]);

  const [genreName, setGenreName] = useState("");
  const [genreDescription, setGenreDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(
    () =>
      onSnapshot(doc(db, "genres", params.genreId), (snapshot) => {
        setGenreName(snapshot.data().genreName);
        setGenreDescription(snapshot.data().genreDescription);
      }),
    [db, params.genreId]
  );


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    if (genreName == "" || genreDescription == "") {
      setError("isi semua form");
      setIsLoading(false);
      return;
    }
    try {
      const docRef = await updateDoc(doc(db, "genres",params.genreId), {
        genreName,
        genreDescription,
        userDisplayName: session?.user?.name,
        userId: session?.user?.uid,
        userImage: session?.user?.image,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
    router.push('/admin');
  };

  if (session == undefined) {
    return <BasicTemplate>Membaca credential</BasicTemplate>;
  }

  return (
    <BasicTemplate>
      <div className="flex w-full flex-col h-[100vw] mx-1 shadow-md rounded-md bg-white items-center px-2 py-1">
        <h3 className="text-3xl">Edit Genre </h3>
        <div className="w-full md:w-1/2 md:flex-col md:items-center ">
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Nama Genre</span>
              </label>
              <input
                type="text"
                placeholder="Nama Genre"
                className="input input-bordered w-full "
                value={genreName}
                onChange={(e) => setGenreName(e.target.value)}
              />
            </div>

            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Genre Deskripsi</span>
              </label>
              <textarea
                className="textarea textarea-bordered"
                placeholder="Genre Deskripsi"
                defaultValue={genreDescription}
                onChange={(e) => setGenreDescription(e.target.value)}
              ></textarea>
            </div>

            <span className="my-2 text-error block">{error}</span>
            <button className={`btn btn-primary mt-2 ${isLoading && 'loading'}`} type="submit">
              Simpan
            </button>
          </form>
        </div>
      </div>
    </BasicTemplate>
  );
}
