"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const Transition = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <>
      <AnimatePresence mode="wait" key={pathname}>
        <motion.div
          initial={{
            clipPath: "inset(0)",
          }}
          animate={{
            clipPath: "inset(100% 0 0 0)",
            transition: {
              type: "tween",
              duration: 1.5,
              delay: 0.5,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          className="bg-black fixed top-0 h-[100vh] w-[100%] z-[99]"
        ></motion.div>
      </AnimatePresence>
      {children}
    </>
  );
};

export default Transition;
