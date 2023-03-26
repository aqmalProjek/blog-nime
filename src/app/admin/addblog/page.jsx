"use client";
import BasicTemplate from "@/app/components/BasicTemplate";
import { db, storage } from "@/firebase";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";

export default function page() {
  const router = useRouter();
  // console.log(providers);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session && session !== undefined) {
      router.push("/");
    }
  }, [session, router]);

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

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [error, setError] = useState("");
  let tmp = [];
  const [selectedGenre, setSelectedGenre] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    if (title == "" || content == "") {
      setError("isi semua form");
      setIsLoading(false);
      return;
    }
    try {
      const docRef = await addDoc(collection(db, "blogs"), {
        title,
        content,
        type: selectedType,
        userDisplayName: session?.user?.name,
        userId: session?.user?.uid,
        genreSnippet: selectedGenre,
        userImage: session?.user?.image,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      if (selectedFile) {
        const imageRef = ref(storage, `blogs/${docRef.id}/image`);
        //upload string
        await uploadString(imageRef, selectedFile, "data_url").then(
          async () => {
            //dapatkan downloadurl
            const downloadURL = await getDownloadURL(imageRef);
            //update collection post dengan id tertentu dan tambahkan field image : download url
            await updateDoc(doc(db, "blogs", docRef.id), {
              postImage: downloadURL,
            });
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
    router.push("/admin");
  };

  if (session == undefined) {
    return <BasicTemplate>Membaca credential</BasicTemplate>;
  }

  const addImageToBlog = (e) => {
    const reader = new FileReader();
    console.log(e.target.files[0]);
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      const uploadData = readerEvent.target.result;
      setSelectedFile(uploadData);
    };
  };

  const handleSelect = (e) => {
    if (selectedFile.includes(e.target.value)) {
      console.log("di temukan");
      return;
    } else {
      setSelectedGenre([...selectedGenre, e.target.value]);
      // const index = selectedGenre.indexOf(e.target.value);
      // if (index > -1) { // only splice array when item is found
      //   selectedGenre.splice(index, 1); // 2nd parameter means remove one item only
      // }
      console.log("tidak ditemukan");
    }
    console.log({ selectedGenre });
  };

  return (
    <BasicTemplate>
      <div className="flex w-full flex-col min-h-[100vw] mx-1 shadow-md rounded-md bg-white items-center px-2 py-1">
        <h3 className="text-3xl">Tambah Artikel</h3>
        <div className="w-full md:w-1/2 md:flex-col md:items-center ">
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Judul Artikel</span>
              </label>
              <input
                type="text"
                placeholder="Judul Artikel"
                className="input input-bordered w-full "
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Foto Artikel</span>
              </label>
              <input
                type="file"
                placeholder="Type here"
                className="file-input file-input-bordered w-full"
                onChange={addImageToBlog}
                required
              />
            </div>

            {selectedFile && (
              <div className="relative">
                <ImCross
                  className="text-2xl p-1 text-black cursor-pointer absolute bg-white opacity-70 rounded-full top-1 left-1"
                  onClick={() => setSelectedFile("")}
                />
                <img
                  src={selectedFile}
                  alt=""
                  className={`${
                    isLoading && "animate-pulse"
                  } mt-2 w-[450px] h-[450px] object-cover`}
                />
              </div>
            )}

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">
                  Pilih genre ||{" "}
                  <span className="text-red-500">
                    genre terpilih : {` ${selectedGenre}`}
                  </span>{" "}
                  {selectedFile.length === 0 && (
                    <span
                      className="text-yellow-500 cursor-pointer"
                      onClick={() => setSelectedGenre([])}
                    >
                      &nbsp;&nbsp;&nbsp;&nbsp;Reset Genre
                    </span>
                  )}
                </span>
              </label>
              <select
                className="select select-bordered"
                multiple={true}
                defaultValue={selectedGenre}
              >
                <option disabled value="">
                  Pilih Genre
                </option>
                {genres?.docs?.map((item, index) => {
                  if (!selectedGenre.includes(item?.data()?.genreName))
                    return (
                      <option
                        key={index}
                        value={item?.data()?.genreName}
                        onClick={handleSelect}
                      >
                        {item?.data()?.genreName}
                      </option>
                    );
                })}
              </select>
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">
                  Pilih Tipe Artikel
                </span>
              </label>
              <select className="select select-bordered" defaultValue={""} onChange={e => setSelectedType(e.target.value)}>
                <option disabled value={""}>
                  Pilih satu
                </option>
                <option value={"anime season"}>Anime Season</option>
                <option value={"anime panjang"}>Anime Panjang</option>
                <option value={"anime movie"}>Anime Movie</option>
                <option value={"manga"}>Manga</option>
              </select>
              <label className="label">
                <span className="label-text-alt">Alt label</span>
                <span className="label-text-alt">Alt label</span>
              </label>
            </div>

            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Content</span>
              </label>
              <textarea
                className="textarea textarea-bordered"
                placeholder="Content"
                defaultValue={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>

            <span className="my-2 text-error block">{error}</span>
            <button
              className={`btn btn-primary mt-2 ${isLoading && "loading"}`}
              type="submit"
            >
              Simpan
            </button>
          </form>
        </div>
      </div>
    </BasicTemplate>
  );
}
