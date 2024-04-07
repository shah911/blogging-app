"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

type Props = {
  title: string;
};

type AnimateWordProps = {
  title: string;
  animationVariants: any;
  isHovered: boolean;
};

const titleAnimation = {
  initail: {
    transition: {
      staggerChildren: 0.025,
    },
  },
  animate: {
    transition: {
      staggerChildren: 0.025,
    },
  },
};

const letterAnimation = {
  initail: {
    y: 0,
  },
  animate: {
    y: -25,
    transition: {
      type: "tween",
      duration: 0.3,
      ease: [0.6, 0.01, 0.05, 0.95],
    },
  },
};

const letterAnimationTwo = {
  initail: {
    y: 25,
  },
  animate: {
    y: 0,
    transition: {
      type: "tween",
      duration: 0.3,
      ease: [0.6, 0.01, 0.05, 0.95],
    },
  },
};

export default function AnimatedLinks({ title }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative overflow-hidden cursor-pointer flex flex-col"
    >
      <AnimateWord
        title={title}
        animationVariants={letterAnimation}
        isHovered={isHovered}
      />
      <div className="absolute top-0">
        <AnimateWord
          title={title}
          animationVariants={letterAnimationTwo}
          isHovered={isHovered}
        />
      </div>
    </motion.div>
  );
}

const AnimateWord = ({
  title,
  animationVariants,
  isHovered,
}: AnimateWordProps) => {
  return (
    <motion.span
      variants={titleAnimation}
      initial="animate"
      animate={isHovered ? "animate" : "initail"}
      className="relative whitespace-nowrap"
    >
      {title.split("").map((char, i) =>
        char === " " ? (
          <span key={i}>&nbsp;</span>
        ) : (
          <motion.span
            variants={animationVariants}
            key={i}
            className="relative inline-flex whitespace-nowrap uppercase font-[500] 2xl:text-lg"
          >
            {char}
          </motion.span>
        )
      )}
    </motion.span>
  );
};
