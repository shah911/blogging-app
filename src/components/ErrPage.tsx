"use client";
import React from "react";

type Prop = {
  message: string;
};

function ErrPage({ message }: Prop) {
  return (
    <div className="w-[95%] mx-auto h-[600px] lg:h-[100vh] flex flex-col items-center justify-center gap-4 2xl:gap-[1vw]">
      <p className="capitalize text-[42px] 2xl:text-[3vw] font-[500] tracking-tighter leading-[100%] text-center">
        {message}
      </p>
      <span
        className="underline font-[500] cursor-pointer 2xl:text-[1.25vw]"
        onClick={() => location.reload()}
      >
        Try Again?
      </span>
    </div>
  );
}

export default ErrPage;
