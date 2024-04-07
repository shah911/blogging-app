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

// const data = [
//   {
//     img: "/pexels-format-1029757.jpg",
//     date: "jan, 2024",
//     title: "Lorem ipsum dolor sit amet",
//     id: "1",
//     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//   },
//   {
//     img: "/pexels-miggy-rivera-5665104.jpg",
//     date: "feb, 2024",
//     title: "Sed ut perspiciatis unde",
//     id: "2",
//     desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
//   },
//   {
//     img: "/pexels-stefan-stefancik-91227.jpg",
//     date: "mar, 2024",
//     title: "At vero eos et accusamus",
//     id: "3",
//     desc: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
//   },
//   {
//     img: "/pexels-tranmautritam-326502.jpg",
//     date: "dec, 2023",
//     title: "Et harum quidem rerum",
//     id: "4",
//     desc: "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
//   },
// ];

let err: boolean;

const getRecentPosts = async () => {
  const res = await fetch(`${process.env.URL}/api/posts?latest=true`, {
    next: { revalidate: 600000 },
  });
  if (!res.ok) {
    return { err: true };
  }
  return res.json();
};
const Hero = async () => {
  const data = await getRecentPosts();
  const posts = await data.Posts;

  if (err) {
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
        {posts?.map((post: singlePost, i: number) => (
          <RecentPosts key={i} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Hero;
