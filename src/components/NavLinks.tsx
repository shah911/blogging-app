"use client";
import Link from "next/link";
import React from "react";
import AnimatedLinks from "./AnimatedLinks";
import { useSession } from "next-auth/react";

const data = [
  {
    title: "blog",
    url: "/blog",
  },
  {
    title: "post",
    url: "/post",
  },
  {
    title: "about",
    url: "/about",
  },
];

const NavLinks = () => {
  const session = useSession();
  console.log(session);
  return (
    <>
      {data.map((item, i) => (
        <Link href={item.url} key={i} className="overflow-hidden">
          <AnimatedLinks title={item.title} />
        </Link>
      ))}
      <button className=""></button>
    </>
  );
};

export default NavLinks;
