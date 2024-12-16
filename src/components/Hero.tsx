import React from "react";
import RecentPosts from "./RecentPosts";
import ErrPage from "./ErrPage";

const title = ["bl", "og", "new", "s"];
type singlePost = {
  img: string;
  createdAt: string;
  title: string;
  id: string;
  desc: string;
};

const getRecentPosts = async () => {
  try {
    const res = await fetch(
      `https://blogging-app-rh8v.vercel.app/api/posts?latest=true`,
      {
        next: { revalidate: 6000 },
      }
    );
    return res.json();
  } catch (error) {
    return error;
  }
};
const Hero = async () => {
  const { Posts, error } = await getRecentPosts();

  if (error) {
    return (
      <ErrPage message="something went wrong, while fetching the latest posts" />
    );
  }

  return (
    <div className="flex flex-col lg:flex-row pt-10 2xl:pt-[5vw] w-[95%] mx-auto">
      <h1 className="block pb-[10vw] md:pb-0 uppercase font-[500] text-[20vw] md:text-[150px] tracking-tighter leading-[100%] w-[100%] mx-auto lg:hidden">
        news
      </h1>
      <div className="flex-[2] hidden lg:block">
        <div className="sticky top-[115px] w-[100%] flex flex-col items-end">
          {title.map((item, i) => (
            <h1
              key={i}
              className="uppercase font-[500] text-[125px] 2xl:text-[10vw] tracking-tighter leading-[75%] w-[85%]"
            >
              {item}
            </h1>
          ))}
          <h2 className="capitalize font-[500] text-[25px] 2xl:text-[2vw] w-[40%] tracking-tighter leading-[100%] absolute top-[80%] left-[37.5%]">
            latest news and updates
          </h2>
        </div>
      </div>
      <div className="flex-[3] flex flex-col h-[100%]">
        {Posts?.map((post: singlePost, i: number) => (
          <RecentPosts key={i} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Hero;
