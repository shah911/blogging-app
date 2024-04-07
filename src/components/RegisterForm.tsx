"use client";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Register } from "../../actions/register";
import { z } from "zod";
import { RegisterSchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "./Loader";
import { login } from "../../actions/login";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
  });

  const [err, setErr] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (formData: z.infer<typeof RegisterSchema>) => {
    setIsLoading(true);
    setErr("");
    setSuccess("");
    Register(formData)
      .then((data) => {
        setErr(data?.error);
        setSuccess(data?.success);
        if (data?.success) {
          login(formData)
            .then((data) => {
              setErr(data?.error);
              setSuccess(data?.success);
            })
            .finally(() => {
              setIsLoading(false);
            });
        } else {
          setIsLoading(false);
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative h-[90%] w-[100%] md:w-[50%] lg:w-[30vw] flex flex-col items-center justify-evenly border border-black rounded-md 2xl:rounded-[0.375vw]"
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
      <h1 className="uppercase text-3xl 2xl:text-[2.25vw] font-[500]">
        signup
      </h1>
      <div className="w-[90%] flex flex-col 2xl:gap-[0.3vw]">
        <label
          htmlFor="name"
          className="font-[500] capitalize text-lg 2xl:text-[1.25vw]"
        >
          Name
        </label>
        <input
          {...register("name")}
          id="name"
          type="text"
          placeholder="Enter your Name"
          className="outline-none py-3 2xl:py-[1.2vw] 2xl:text-[1.25vw] border-black border-b placeholder:2xl:text-[1.25vw]"
        />
        {errors.name && (
          <span className="text-red-500 text-xs font-[500] 2xl:text-[0.9vw]">
            {errors.name?.message}
          </span>
        )}
      </div>
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
      <div className="w-[90%] flex flex-col 2xl:gap-[0.3vw]">
        <label
          htmlFor="name"
          className="font-[500] capitalize w-[90%] text-lg 2xl:text-[1.25vw]"
        >
          password
        </label>
        <input
          {...register("password")}
          id="password"
          type="password"
          placeholder="Enter your Password"
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
        signup
      </button>
      {err && (
        <span className="text-sm capitalize 2xl:text-[1vw] text-red-500 font-[500]">
          {err}
        </span>
      )}
      {/* {success && (
        <span className="text-sm capitalize 2xl:text-[1vw] font-[500]">
          {success}
        </span>
      )} */}
      <div className="flex items-center justify-between w-[90%]">
        <hr className="w-[40%] border border-b-black" />
        <span className="font-[500] uppercase text-lg 2xl:text-[1.25vw]">
          Or
        </span>
        <hr className="w-[40%] border border-b-black" />
      </div>
      <div
        onClick={() => {
          setIsLoading(true);
          signIn("google");
        }}
        className="py-2 2xl:py-[0.75vw] w-[90%] flex items-center justify-center gap-4 2xl:gap-[1vw] border border-black rounded-[25px] 2xl:rounded-[2vw] cursor-pointer transition-colors duration-300 hover:bg-black hover:text-white"
      >
        <span className="font-[500] capitalize text-lg 2xl:text-[1.25vw]">
          continue with
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 2xl:h-[2vw] 2xl:w-[2vw]"
          viewBox="0 0 48 48"
        >
          <path
            fill="#FFC107"
            d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
          ></path>
          <path
            fill="#FF3D00"
            d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
          ></path>
          <path
            fill="#4CAF50"
            d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
          ></path>
          <path
            fill="#1976D2"
            d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
          ></path>
        </svg>
      </div>
    </form>
  );
};

export default RegisterForm;
