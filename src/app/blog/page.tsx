"use client";
import ErrPage from "@/components/ErrPage";
import Loader from "@/components/Loader";
import RecentPosts from "@/components/RecentPosts";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import { motion } from "framer-motion";

const data = [
  {
    img: "/pexels-format-1029757.jpg",
    date: "jan, 2024",
    title: "Lorem ipsum dolor sit amet",
    id: "1",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    img: "/pexels-miggy-rivera-5665104.jpg",
    date: "feb, 2024",
    title: "Sed ut perspiciatis unde",
    id: "2",
    desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
  },
  {
    img: "/pexels-stefan-stefancik-91227.jpg",
    date: "mar, 2024",
    title: "At vero eos et accusamus",
    id: "3",
    desc: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
  },
  {
    img: "/pexels-tranmautritam-326502.jpg",
    date: "dec, 2023",
    title: "Et harum quidem rerum",
    id: "4",
    desc: "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
  },
];

type Post = {
  img: string;
  createdAt: string;
  title: string;
  id: string;
  desc: string;
};

const postVariants = {
  initial: { opacity: 0 },
  animate: (i: number) => ({
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: [0.76, 0, 0.24, 1],
    },
  }),
};

const Blog = () => {
  const fetchPosts = async (nextPage = 1) => {
    const response = await fetch(`/api/posts?page=${nextPage}`);
    return response.json();
  };

  const { data, fetchNextPage, hasNextPage, isLoading, isError, isFetching } =
    useInfiniteQuery("posts", ({ pageParam = 1 }) => fetchPosts(pageParam), {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.Posts.length === 0) {
          return null; // no more pages
        }
        return pages.length + 1; // next page number
      },
      staleTime: 600000,
    });

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && !isLoading && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isLoading, isFetching, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="mx-auto h-[100vh] w-[95%] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return <ErrPage message="Oops! Something went wrong." />;
  }

  return (
    <div className="w-[95%] mx-auto min-h-[100vh]">
      {data?.pages.map((page, pageIndex) => (
        <div key={pageIndex}>
          {page.Posts.map((post: Post, i: number) => (
            <motion.div
              custom={i}
              variants={postVariants}
              initial="initial"
              animate="animate"
              key={post.id}
            >
              <RecentPosts post={post} />
            </motion.div>
          ))}
        </div>
      ))}
      {hasNextPage && (
        <div ref={ref} className="mt-8 flex items-center justify-center">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Blog;
