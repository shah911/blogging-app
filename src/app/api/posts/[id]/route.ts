import { auth } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

type params = {
  params: {
    id: string;
  };
};

export const GET = async (req: NextRequest, { params }: params) => {
  const { id } = params;
  try {
    const post = await prisma.post.findUnique({
      where: { id: id },
      include: { user: true },
    });
    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      { status: 500 }
    );
  }
};

export const DELETE = async (req: NextRequest, { params }: params) => {
  const session = await auth();

  if (!session?.user?.isAdmin) {
    return new NextResponse(
      JSON.stringify({
        message: "You don't have admin rights to perform this action",
      }),
      {
        status: 401,
      }
    );
  }
  const { id } = params;
  try {
    await prisma.post.delete({
      where: { id: id },
    });
    return new NextResponse(
      JSON.stringify({ message: "The post has been deleted" }),
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      { status: 500 }
    );
  }
};

export const PUT = async (req: NextRequest, { params }: params) => {
  const session = await auth();

  if (!session?.user?.isAdmin) {
    return new NextResponse(
      JSON.stringify({
        message: "You don't have admin rights to perform this action",
      }),
      {
        status: 401,
      }
    );
  }
  const { id } = params;

  try {
    const body = await req.json();
    await prisma.post.update({
      where: { id: id },
      data: { ...body, userId: session.user?.id },
    });
    return new NextResponse(
      JSON.stringify({ message: "The post has been updated." }),
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      { status: 500 }
    );
  }
};
