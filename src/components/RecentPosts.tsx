import Image from "next/image";
import Link from "next/link";
import React from "react";
import convertDateFormat from "./Dateformatter";

type Prop = {
  post: {
    img: string;
    createdAt: string;
    title: string;
    id: string;
    desc: string;
  };
};

const RecentPosts = ({ post }: Prop) => {
  return (
    <div className="flex flex-col h-[768px] md:h-[500px] 2xl:h-[75vh] w-[100%] mx-auto lg:w-[100%] lg:mx-0">
      <div className="h-[100%] w-[100%] flex flex-col items-center justify-center md:flex-row gap-4 2xl:gap-[1vw]">
        <div className="flex-[2] relative h-[350px] 2xl:h-[60vh] w-[100%]">
          <Image
            src={post.img}
            alt=""
            fill
            className="object-cover rounded-md 2xl:rounded-[0.375vw]"
          />
        </div>
        <div className="flex-[3] flex flex-col justify-evenly h-[350px] 2xl:h-[60vh]">
          <span className="text-xs 2xl:text-[1vw] font-[600] capitalize w-fit">
            {convertDateFormat(post.createdAt)}
          </span>
          <h1 className="text-[42px] 2xl:text-[3vw] font-bold capitalize leading-[100%] tracking-tighter w-[90%]">
            {post.title}
          </h1>
          <Link
            href={`/blog/${post.id}`}
            className="w-fit bg-black text-white text-sm capitalize py-1 px-3 2xl:py-[0.65vw] 2xl:px-[1vw] 2xl:text-[1vw] rounded-[25px] 2xl:rounded-[2vw]"
          >
            discover
          </Link>
          <div
            dangerouslySetInnerHTML={{
              __html: post.desc.substring(0, 200),
            }}
            className="text-xs w-[90%] text-justify font-[500] 2xl:text-[0.85vw] 2xl:leading-[125%]"
          />
        </div>
      </div>
      <hr className="w-[95%] py-[10vw] md:py-0" />
    </div>
  );
};

export default RecentPosts;
