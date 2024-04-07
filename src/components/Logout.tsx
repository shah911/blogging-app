"use client";
import { signOut } from "next-auth/react";
import React from "react";

function Logout() {
  return (
    <button
      onClick={() => signOut()}
      className="w-fit bg-black text-white  text-sm uppercase py-1 px-3 rounded-[25px]"
    >
      Logout
    </button>
  );
}

export default Logout;
