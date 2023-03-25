import BasicTemplate from "@/app/components/BasicTemplate";
import React from "react";

export default function page() {
  return (
    <BasicTemplate>
      <div className="flex w-full flex-col h-[100vw] mx-1 shadow-md rounded-md bg-white items-center px-2 py-1">
        <h3 className="text-3xl">Tambah Genre</h3>
      </div>
    </BasicTemplate>
  );
}
