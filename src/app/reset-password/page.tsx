"use client";
import { resetPasswordSchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { reset } from "../../../actions/reset";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "@/components/Loader";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const [err, setErr] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (formData: z.infer<typeof resetPasswordSchema>) => {
    setIsLoading(true);
    setErr("");
    setSuccess("");
    reset(formData).then((data) => {
      setErr(data?.error);
      setSuccess(data?.success);
      setIsLoading(false);
    });
  };

  return (
    <div className="w-[95%] mx-auto h-[600px] 2xl:h-[100vh] flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative h-[80%] w-[100%] md:w-[50%] lg:w-[30vw] flex flex-col items-center justify-evenly border border-black rounded-md 2xl:rounded-[0.375vw]"
      >
        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5, transition: { duration: 0.3 } }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              className="z-10 absolute top-0 h-[100%] w-[100%] flex items-center justify-center rounded-md 2xl:rounded-[0.375vw] bg-white"
            >
              <Loader />
            </motion.div>
          )}
        </AnimatePresence>
        <h1 className="text-center uppercase leading-[100%] text-3xl 2xl:text-[2.25vw] font-[500] w-[90%]">
          FORGOT YOUR PASSWORD?
        </h1>
        <span className="text-sm font-[500] leading-[100%] text-center w-[90%] 2xl:text-[1vw]">
          Please enter your email address below to receive a password reset
          link.
        </span>
        <div className="w-[90%] flex flex-col 2xl:gap-[0.3vw]">
          <label
            htmlFor="name"
            className="font-[500] capitalize text-lg 2xl:text-[1.25vw]"
          >
            email
          </label>
          <input
            {...register("email")}
            id="email"
            type="email"
            placeholder="Enter your Email Address"
            className="outline-none py-3 2xl:py-[1.2vw] 2xl:text-[1.25vw] border-black border-b placeholder:2xl:text-[1.25vw]"
          />
          {errors.email && (
            <span className="text-red-500 text-xs font-[500] 2xl:text-[0.9vw]">
              {errors.email?.message}
            </span>
          )}
        </div>
        <button
          type="submit"
          className="w-fit bg-black text-white  text-sm uppercase py-1 px-3 2xl:py-[0.65vw] 2xl:px-[1vw] 2xl:text-[1vw] rounded-[25px] 2xl:rounded-[2vw]"
        >
          send
        </button>
        {err && (
          <span className="text-sm capitalize 2xl:text-[1vw] text-red-500 font-[500]">
            {err}
          </span>
        )}
        {success && (
          <span className="text-sm capitalize 2xl:text-[1vw] font-[500]">
            {success}
          </span>
        )}
      </form>
    </div>
  );
};

export default ResetPassword;
