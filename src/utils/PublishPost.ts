import { NextResponse } from "next/server";

export const PublishPost = async (title: string, desc: string, img: string) => {
  try {
    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        desc: desc,
        img: img,
      }),
    });
    const data = await res.json();
    return new NextResponse(data, { status: 200 });
  } catch (error: any) {
    return new NextResponse(error, { status: 500 });
  }
};
