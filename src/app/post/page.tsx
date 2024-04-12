"use client";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { useRouter } from "next/navigation";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/utils/firebase";
import dynamic from "next/dynamic";
import Loader from "@/components/Loader";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";

type FormData = {
  img: File[];
  title: string;
  content: string;
};

const msg = {
  initial: { y: 0, opacity: 0 },
  animate: { y: "100%", opacity: 1, transition: { type: "tween" } },
  exit: { y: 0, opacity: 0, transition: { type: "tween" } },
};

const PublishPost = () => {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<string | null>("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageIsLoading, setImageIsLoading] = useState(false);
  const [err, setErr] = useState(false);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike"],
          ["blockquote", "code-block"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ direction: "rtl" }],
          [{ header: [4, 5, 6, false] }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          ["link", "image", "video"],
        ],
      },
    }),
    []
  );

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageIsLoading(true);
    const file = e.target.files && e.target.files[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result as string);
        setImageIsLoading(false);
      };

      reader.readAsDataURL(file);
    } else {
      setImageIsLoading(false);
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const editorContent = watch("content");

  useEffect(() => {
    register("content", {
      required: "the content is required to publish a post",
      minLength: {
        value: 300,
        message: "the post should be atleast 300 characters",
      },
    });
  }, [register, editorContent]);

  const handleChange = (content: any) => {
    setValue("content", content);
  };

  const PublishPost = async (title: string, desc: string, img: string) => {
    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        desc: desc,
        img: img,
      }),
    });
    if (res.status === 200 || 201) {
      const data = await res.json();
      router.push(`/blog/${data?.id}`);
    } else {
      window.scrollTo(0, 0);
      setIsLoading(false);
      return setErr(true);
    }
  };

  const onSubmit = async (formData: FormData) => {
    const { title, content } = formData;
    const storage = getStorage(app);
    if (file) {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);
      const upload = () => {
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            //console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                //console.log("Upload is paused");
                break;
              case "running":
                //console.log("Upload is running");
                break;
            }
          },
          (error) => {
            if (error) {
              window.scrollTo(0, 0);
              setIsLoading(false);
              return setErr(true);
            }
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              PublishPost(title, content, downloadURL);
              setIsLoading(false);
            });
          }
        );
      };
      setIsLoading(true);
      upload();
    }
  };

  return (
    <div className="w-[95%] mx-auto flex items-center justify-center py-10 2xl:py-[5vw]">
      <AnimatePresence mode="wait">
        {err && (
          <motion.div
            className="absolute flex items-center justify-center gap-2 top-[5%] lg:top-[7.5%] bg-black py-1 px-2 rounded-xl z-10"
            variants={msg}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <span className="text-white text-xs text-center font-[300] capitalize">
              something went wrong while publishing this blog post
            </span>
            <svg
              className="h-4 w-4 text-white cursor-pointer"
              onClick={() => setErr(false)}
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex flex-col justify-center gap-10 2xl:gap-[2.5vw] w-[100%]"
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
        <div>
          <input
            {...register("img", {
              required: "a main image is required to publish a post",
              validate: {
                acceptedFormats: (file) =>
                  ["image/jpeg", "image/jpg"].includes(file[0].type) ||
                  "Only JPG, JPEG formats are allowed",
                fileSize: (file) =>
                  file[0].size < 1000000 ||
                  "the size of the file can't be larger than 1MB",
              },
            })}
            type="file"
            id="image"
            placeholder="main Image"
            className="hidden"
            onChange={(e) => {
              handleImageUpload(e);
              register("img").onChange(e);
            }}
          />

          <div className="flex flex-col gap-[1vw]">
            <div className="relative h-[427.5px] 2xl:h-[66.5vh] w-[100%] border border-black rounded-md 2xl:rounded-[0.375vw]">
              {image && (
                <Image
                  src={image}
                  alt="chosen"
                  fill
                  className="object-cover rounded-md 2xl:rounded-[0.375vw]"
                />
              )}

              {image ? (
                <div
                  onClick={() => setImage(null)}
                  className="absolute top-0 left-0 right-0 bottom-0 z-10 cursor-pointer w-[100%] h-[100%] flex items-center justify-center"
                >
                  {imageIsLoading ? (
                    <Loader />
                  ) : (
                    <svg
                      className="h-5 w-5 2xl:h-[1.5vw] 2xl:w-[1.5vw]"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  )}
                </div>
              ) : (
                <label
                  htmlFor="image"
                  className="absolute top-0 left-0 right-0 bottom-0 z-10 cursor-pointer w-[100%] h-[100%] flex items-center justify-center"
                >
                  {imageIsLoading ? (
                    <Loader />
                  ) : (
                    <svg
                      className="h-5 w-5 2xl:h-[1.5vw] 2xl:w-[1.5vw]"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.5 1H12.5C13.3284 1 14 1.67157 14 2.5V12.5C14 13.3284 13.3284 14 12.5 14H2.5C1.67157 14 1 13.3284 1 12.5V2.5C1 1.67157 1.67157 1 2.5 1ZM2.5 2C2.22386 2 2 2.22386 2 2.5V8.3636L3.6818 6.6818C3.76809 6.59551 3.88572 6.54797 4.00774 6.55007C4.12975 6.55216 4.24568 6.60372 4.32895 6.69293L7.87355 10.4901L10.6818 7.6818C10.8575 7.50607 11.1425 7.50607 11.3182 7.6818L13 9.3636V2.5C13 2.22386 12.7761 2 12.5 2H2.5ZM2 12.5V9.6364L3.98887 7.64753L7.5311 11.4421L8.94113 13H2.5C2.22386 13 2 12.7761 2 12.5ZM12.5 13H10.155L8.48336 11.153L11 8.6364L13 10.6364V12.5C13 12.7761 12.7761 13 12.5 13ZM6.64922 5.5C6.64922 5.03013 7.03013 4.64922 7.5 4.64922C7.96987 4.64922 8.35078 5.03013 8.35078 5.5C8.35078 5.96987 7.96987 6.35078 7.5 6.35078C7.03013 6.35078 6.64922 5.96987 6.64922 5.5ZM7.5 3.74922C6.53307 3.74922 5.74922 4.53307 5.74922 5.5C5.74922 6.46693 6.53307 7.25078 7.5 7.25078C8.46693 7.25078 9.25078 6.46693 9.25078 5.5C9.25078 4.53307 8.46693 3.74922 7.5 3.74922Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  )}
                </label>
              )}
            </div>
            {errors.img && (
              <span className="text-red-500 font-bold text-xs capitalize 2xl:text-[0.75vw] w-fit">
                {errors.img?.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-[1vw]">
          <input
            {...register("title", {
              required: "a main title is reqiured to publish a post",
              minLength: {
                value: 5,
                message: "the title should be atleast of 5 characters",
              },
              maxLength: {
                value: 20,
                message: "the title cannot exceed 20 characters",
              },
            })}
            type="text"
            placeholder="Title"
            className="outline-none py-5 2xl:py-[1.75vw] w-[100%] md:w-[75%] lg:w-[60%] text-[42px] 2xl:text-[3vw] font-bold border-black border-b placeholder:text-[42px] placeholder:text-black placeholder:2xl:text-[3vw]"
          />
          {errors.title && (
            <span className="text-red-500 font-bold text-xs capitalize 2xl:text-[0.75vw] w-fit">
              {errors.title?.message}
            </span>
          )}
        </div>
        <div className="min-h-[450px] 2xl:min-h-[70vh]">
          <ReactQuill
            className="textArea w-[100%] h-[450px] 2xl:h-[70vh]"
            placeholder="Tell Your Story"
            value={editorContent}
            onChange={handleChange}
            modules={modules}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            disabled={isLoading}
            className="w-fit  bg-black text-white  text-sm capitalize mt-16 py-1 px-3 2xl:py-[0.65vw] 2xl:px-[1vw] 2xl:text-[1vw] rounded-[25px] 2xl:rounded-[2vw]"
          >
            publish
          </button>
        </div>
        {errors.content && (
          <span className="text-red-500 font-bold text-xs capitalize 2xl:text-[0.75vw] w-fit">
            {errors.content?.message}
          </span>
        )}
      </form>
    </div>
  );
};

export default PublishPost;
