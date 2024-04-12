import { auth } from "@/utils/auth";
import prisma from "@/utils/connect";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const postPerPage = 4;
  const { searchParams } = new URL(req.url);
  const page =
    Number(searchParams.get("page")) > 0 ? Number(searchParams.get("page")) : 1;
  const latest = searchParams.get("latest");

  const orderBy: Prisma.PostOrderByWithRelationInput = latest
    ? { createdAt: Prisma.SortOrder.desc }
    : {};

  const query = {
    take: latest ? 4 : postPerPage,
    skip: latest ? 0 : postPerPage * (page - 1),
    include: {
      user: true,
    },
    orderBy,
  };

  try {
    const Posts = await prisma.post.findMany(query);
    return new NextResponse(JSON.stringify({ Posts }), { status: 200 });
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  const session = await auth();
  if (!session?.user.id) {
    return new NextResponse(JSON.stringify({ message: "Not Authenticated" }), {
      status: 401,
    });
  } else {
    try {
      const body = await req.json();
      const post = await prisma.post.create({
        data: { ...body, userId: session.user?.id },
      });
      return new NextResponse(JSON.stringify(post), { status: 200 });
    } catch (err) {
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong" }),
        { status: 500 }
      );
    }
  }
};
