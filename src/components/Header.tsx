import Link from "next/link";
import React from "react";
import AnimatedLinks from "./AnimatedLinks";
import Menu from "./Menu";
import { auth } from "@/utils/auth";
import Logout from "./Logout";

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

const Header = async () => {
  const session = await auth();

  return (
    <div className="h-[75px] w-[95%] mx-auto flex items-center justify-center">
      <div className="flex-[1] h-[100%] flex items-center">
        <Link href="/" className="font-bold text-[42px]">
          Shah.
        </Link>
      </div>
      <div className="flex-[3] h-[100%] w-[100%] hidden lg:flex items-center justify-evenly">
        {data.map((item, i) => (
          <Link href={item.url} key={i} className="overflow-hidden">
            <AnimatedLinks title={item.title} />
          </Link>
        ))}
        {session?.user && <Logout />}
      </div>
      <div className="block lg:hidden">{session?.user && <Logout />}</div>
      <div className="flex-[1] flex items-center justify-end">
        <Menu />
      </div>
    </div>
  );
};

export default Header;
