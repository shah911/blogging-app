"use server";

import prisma from "@/utils/connect";
import { RegisterSchema } from "@/utils/schema";
import { getUserByEmail } from "@/utils/user";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const Register = async (args: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(args);
  if (!validatedFields.success) {
    return { error: "invalid fields!" };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "this email is already registered" };
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return { success: "User created" };
};
