import Link from "next/link";
import React from "react";

function notFound() {
  return (
    <div className="h-[600px] 2xl:h-[100vh] w-[95%] mx-auto flex flex-col items-center justify-center">
      <div className="flex items-center justify-center h-[70%] w-[100%]">
        <div className="flex-[2] h-[100%] flex items-center justify-center">
          <h1 className="font-[500] text-[8vw] uppercase leading-[100%] tracking-tighter">
            not found
          </h1>
        </div>
        <div className="flex-[3] h-[100%] flex items-center justify-start">
          <span className="font-[500] opacity-50 text-[25vw] leading-[100%] tracking-tighter">
            404
          </span>
        </div>
      </div>
      <div className="h-[30%] w-[100%]">
        <p className="uppercase leading-[100%] tracking-tighter text-[3.5vw]">
          it looks like you are lost. donot worry. you can head back to{" "}
          <Link className="underline" href="/">
            homepage
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

export default notFound;
