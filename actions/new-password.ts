"use server";

import { getPasswordResetTokenByToken } from "@/utils/password-reset-token";
import { newPassword } from "@/utils/schema";
import { getUserByEmail } from "@/utils/user";
import { z } from "zod";
import bcrypt from "bcryptjs";
import prisma from "@/utils/connect";

export const createNewPassword = async (
  args: z.infer<typeof newPassword>,
  token?: string | null
) => {
  if (!token) {
    return { error: "missing token!" };
  }

  const validateFields = newPassword.safeParse(args);

  if (!validateFields.success) {
    return { error: "invalid fields" };
  }

  const { password } = validateFields.data;
  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: "invalid token" };
  }

  const isTokenExpired = new Date(existingToken.expires) < new Date();

  if (isTokenExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "email does not exist!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await prisma.resetPasswordToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Password updated!" };
};
