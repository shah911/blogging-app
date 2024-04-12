"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Loader from "./Loader";

type Props = {
  postId: string;
};

const DeletePost = ({ postId }: Props) => {
  const [notify, setNotify] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    setIsLoading(true);
    const res = await fetch(`/api/posts/${postId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      router.push("/blog");
      setIsLoading(false);
    } else {
      setNotify(true);
      setIsLoading(false);
    }
  };

  if (notify) {
    return (
      <span className="text-center p-[1.5vw] md:p-[1vw] rounded-[25px] 2xl:rounded-[25vw] text-white text-xs 2xl:text-[1vw] font-[500] capitalize bg-black flex items-center justify-center">
        Oops! Something went wrong
      </span>
    );
  }

  return (
    <span
      onClick={handleClick}
      className="relative cursor-pointer p-[1.5vw] md:p-[1vw] rounded-[50%] text-white text-xs 2xl:text-[1vw] font-[600] capitalize w-fit bg-black flex items-center justify-center"
    >
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5, transition: { duration: 0.3 } }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            className="z-10 absolute top-0 h-[100%] w-[100%] flex items-center justify-center rounded-md 2xl:rounded-[0.375vw] bg-white"
          >
            <Loader />
          </motion.div>
        )}
      </AnimatePresence>
      <svg
        className="h-5 w-5 2xl:h-[1.5vw] 2xl:w-[1.5vw]"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
        ></path>
      </svg>
    </span>
  );
};

export default DeletePost;
