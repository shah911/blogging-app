import Image from "next/image";
import React from "react";

function Section() {
  return (
    <div className="h-[600px] 2xl:h-[100vh] flex items-center justify-center">
      <div className="h-[85%] lg:h-[75%] bg-black text-white w-[95%] rounded-md 2xl:rounded-[0.375vw] mx-auto relative">
        <div className="absolute bottom-3 right-3 2xl:bottom-[0.75vw] 2xl:right-[0.75vw]">
          <div className="relative 2xl:h-[60vh] 2xl:w-[20vw] h-[300px] w-[200px] md:h-[350px] md:w-[250px]">
            <Image
              src="/pexels-miggy-rivera-5665104.jpg"
              alt=""
              fill
              className="object-cover  rounded-md 2xl:rounded-[0.375vw]"
            />
          </div>
        </div>
        <div className="flex flex-col gap-6 2xl:gap-[2.5vw] w-[95%] mx-auto pt-8 2xl:pt-[2vw]">
          <p className="text-xs 2xl:text-[0.8vw]">
            Lorem ipsum dolor sit <strong>Shah.</strong>
          </p>
          <h1 className="text-[24px] md:text-[28px] lg:text-[4vw] tracking-tighter leading-[100%]">
            nostrud exercitation laboris? <br />
            aliquip ex ea consequat.
          </h1>
          <button className="w-fit 2xl:py-[0.8vw] 2xl:px-[1.25vw] 2xl:text-[1vw] 2xl:rounded-[25vw] py-1 px-3 rounded-[25px] bg-white text-black text-sm">
            Lorem ipsum
          </button>
        </div>
      </div>
    </div>
  );
}

export default Section;
