"use client";
import { newPassword } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createNewPassword } from "../../../actions/new-password";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "@/components/Loader";

type searchParams = {
  searchParams: {
    token: string;
  };
};

const ResetPassword = ({ searchParams }: searchParams) => {
  const { token } = searchParams;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof newPassword>>({
    resolver: zodResolver(newPassword),
  });

  const [err, setErr] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (formData: z.infer<typeof newPassword>) => {
    setIsLoading(true);
    setErr("");
    setSuccess("");
    createNewPassword(formData, token).then((data) => {
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
          create a new PASSWORD
        </h1>
        <span className="text-sm font-[500] leading-[100%] text-center w-[90%] 2xl:text-[1vw]">
          Please enter your password below to create a one.
        </span>
        <div className="w-[90%] flex flex-col 2xl:gap-[0.3vw]">
          <label
            htmlFor="password"
            className="font-[500] capitalize text-lg 2xl:text-[1.25vw]"
          >
            password
          </label>
          <input
            {...register("password")}
            id="password"
            type="password"
            placeholder="Enter your new password"
            className="outline-none py-3 2xl:py-[1.2vw] 2xl:text-[1.25vw] border-black border-b placeholder:2xl:text-[1.25vw]"
          />
          {errors.password && (
            <span className="text-red-500 text-xs font-[500] 2xl:text-[0.9vw]">
              {errors.password?.message}
            </span>
          )}
        </div>
        <button
          type="submit"
          className="w-fit bg-black text-white  text-sm uppercase py-1 px-3 2xl:py-[0.65vw] 2xl:px-[1vw] 2xl:text-[1vw] rounded-[25px] 2xl:rounded-[2vw]"
        >
          reset
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
