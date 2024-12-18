"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React from "react";
import Loader from "./Loader";
import { useMutation } from "react-query";

type Props = {
  postId: string;
};

const DeletePost = ({ postId }: Props) => {
  const router = useRouter();

  const { mutate, isLoading, isError } = useMutation(
    async () => {
      const res = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete the post!");
      }
    },
    {
      onError: () => {
        window.scrollTo(0, 0);
      },
      onSuccess: () => {
        router.push("/blog");
      },
    }
  );

  const handleDelete = () => {
    mutate();
  };

  return (
    <div className="relative">
      <button
        onClick={handleDelete}
        disabled={isLoading || isError}
        className="relative cursor-pointer p-[1.5vw] md:p-[1vw] rounded-[50%] text-white text-xs 2xl:text-[1vw] font-[600] capitalize w-fit bg-black flex items-center justify-center"
      >
        {isLoading && (
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5, transition: { duration: 0.3 } }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              className="z-10 absolute top-0 h-[100%] w-[100%] flex items-center justify-center rounded-md 2xl:rounded-[0.375vw] bg-white"
            >
              <Loader />
            </motion.div>
          </AnimatePresence>
        )}
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
      </button>

      {isError && (
        <div className="absolute top-[100%] left-0 w-fit text-center p-[1.5vw] md:p-[1vw] rounded-[25px] 2xl:rounded-[25vw] text-white text-xs 2xl:text-[1vw] font-[500] capitalize bg-red-500 mt-2">
          Oops! Something went wrong while deleting this post
        </div>
      )}
    </div>
  );
};

export default DeletePost;
