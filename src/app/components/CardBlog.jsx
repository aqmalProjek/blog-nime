import React from "react";

export default function CardBlog() {
  return (
    <div className="flex relative w-full h-[300px] md:max-w-[350px] md:max-h-[350px]  mx-2 my-1 rounded-xl overflow-hidden shadow-sm shadow-slate-500">
      <img
        src="https://source.unsplash.com/random"
        className="w-full h-full relative z-10 object-cover"
      />
      <div className="flex flex-col absolute z-10 w-full h-full">
        <div className="flex-1 flex w-full  max-h-[50%]"></div>
        <div className="flex flex-col flex-1 w-full  py-2 px-1 bg-[#2a303c] bg-opacity-75 backdrop-blur-sm text-white">
          <div className="flex-1 ">
            <span className=" px-2 py-1 rounded-full text-white text-xs">
              FOOD
            </span>
          </div>
          <div className="flex-1 text-xm md:truncate">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.  Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, reprehenderit?
          </div>
          <div className="flex flex-1 justify-between items-center">
            <div className="flex flex-1 items-center pr-2">
            <img 
            src="https://c4.wallpaperflare.com/wallpaper/592/699/728/gintama-sakata-gintoki-man-sword-wallpaper-preview.jpg" 
            className="rounded-full w-16 h-16 object-cover border-2 border-white"
            />
            <span className="ml-2 truncate text-xs">Muchamad Aqmal hidayat</span>
            </div>

            <div className="flex text-xs">
                12 Jan 2022
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
