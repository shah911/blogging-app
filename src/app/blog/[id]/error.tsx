"use client";
import React from "react";

function ErrorResponse({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="w-[95%] mx-auto h-[600px] lg:h-[100vh] flex flex-col items-center justify-center gap-4 2xl:gap-[1vw]">
      <p className="capitalize text-[42px] 2xl:text-[3vw] font-[500] tracking-tighter leading-[100%] text-center">
        {error.message}
      </p>
      <span
        className="underline font-[500] cursor-pointer 2xl:text-[1.25vw]"
        onClick={reset}
      >
        Try Again?
      </span>
    </div>
  );
}

export default ErrorResponse;
