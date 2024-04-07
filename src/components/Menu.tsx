"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

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

const main = {
  initial: {
    clipPath: "inset(0 0 100% 0)",
  },
  animate: {
    clipPath: "inset(0)",
    transition: {
      type: "tween",
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  exit: {
    clipPath: "inset(0 0 100% 0)",
    transition: {
      type: "tween",
      delay: 0.3,
      duration: 0.75,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const menuTitle = {
  initial: { y: "100%" },
  animate: (i: number) => ({
    y: 0,
    transition: {
      duration: 0.75,
      delay: 0.75 + i * 0.1,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
  exit: {
    y: "-100%",
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const separater = {
  initial: { scaleX: 0 },
  animate: {
    scaleX: 1,
    transformOrigin: "left",
    transition: {
      duration: 1.5,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
  exit: {
    scaleX: 0,
    transition: {
      duration: 0.75,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const desc = {
  initial: { y: "100%" },
  animate: (i: number) => ({
    y: 0,
    transition: {
      type: "tween",
      duration: 0.5,
      delay: 0.75 + i * 0.05,
    },
  }),
  exit: {
    y: "-100%",
    transition: { type: "tween" },
  },
};

const img = {
  initial: { left: 0 },
  animate: {
    left: "100%",
    transition: {
      type: "tween",
      delay: 0.75,
      duration: 0.75,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  exit: {
    left: 0,
    transition: {
      type: "tween",
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const pharse = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const Resize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    const Scroll = () => {
      setIsOpen(false);
    };
    window.addEventListener("resize", Resize);
    window.addEventListener("scroll", Scroll);
    return () => {
      window.removeEventListener("resize", Resize);
      window.removeEventListener("scroll", Scroll);
    };
  });

  const handleHamburgerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      <div className="w-[75px] relative">
        <label
          className="burger z-[14]"
          htmlFor="burger"
          onClick={() => setIsOpen(!isOpen)}
        >
          <input
            type="checkbox"
            id="burger"
            checked={isOpen}
            readOnly
            onClick={handleHamburgerClick}
          />
          <span></span>
          <span></span>
        </label>
      </div>
      <div></div>
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            variants={main}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed z-[12] bg-black top-[85px] left-0 lg:right-0  flex items-center justify-center h-[calc(100vh-85px)] lg:h-[500px] 2xl:h-[calc(100vh-100px)] w-[100%] lg:w-[97.5%] lg:mx-auto lg:rounded-md 2xl:rounded-[0.375vw] overflow-y-auto hide-scrollbar"
          >
            <div className="absolute top-[85px] lg:hidden flex flex-col items-center justify-center gap-6">
              {data.map((item, i) => (
                <div key={i} className="inline-block overflow-hidden">
                  <motion.div custom={i} variants={menuTitle}>
                    <Link
                      href={item.url}
                      className="text-[15vw] md:text-[12vw] uppercase font-[500] text-white"
                    >
                      {item.title}
                    </Link>
                  </motion.div>
                </div>
              ))}
            </div>
            <div className="hidden lg:flex items-center justify-center text-white h-[100%] w-[100%] overflow-hidden">
              <div className="flex-[3] flex flex-col items-center justify-center h-[100%]">
                {data.map((item, i) => (
                  <div
                    key={i}
                    className="inline-block overflow-hidden w-[95%] mx-auto"
                  >
                    <motion.div custom={i} variants={menuTitle}>
                      <Link
                        href={item.url}
                        className="text-[6vw] uppercase font-[500] text-white"
                      >
                        {item.title}
                      </Link>
                    </motion.div>
                    <motion.hr className="w-[100%]" variants={separater} />
                  </div>
                ))}
              </div>
              <div className="flex-[2] h-[100%] flex flex-col items-center justify-evenly">
                <div className="relative h-[250px] 2xl:h-[40vh] w-[30vw]">
                  <Image
                    src="/pexels-miggy-rivera-5665104.jpg"
                    alt=""
                    fill
                    className="object-cover rounded-md 2xl:rounded-[0.375vw]"
                  />
                  <motion.div
                    variants={img}
                    className="absolute top-0 h-[100%] w-[100%] bg-black rounded-md 2xl:rounded-[0.375vw]"
                  ></motion.div>
                </div>
                <div className="text-[2.5vw] w-[30vw] flex flex-wrap gap-x-[0.5vw]">
                  {pharse.split(" ").map((char, i) => (
                    <span className="inline-flex overflow-hidden" key={i}>
                      <motion.span variants={desc} custom={i}>
                        {char}
                      </motion.span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Menu;
