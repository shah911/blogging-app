"use server";

import { sendPasswordResetEmail } from "@/utils/mail";
import { resetPasswordSchema } from "@/utils/schema";
import { generatePasswordResetToken } from "@/utils/token";
import { getUserByEmail } from "@/utils/user";
import { z } from "zod";

export const reset = async (args: z.infer<typeof resetPasswordSchema>) => {
  const validateFields = resetPasswordSchema.safeParse(args);

  if (!validateFields.success) {
    return { error: "invalid fields" };
  }

  const { email } = validateFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "email not found!" };
  }

  const resetPasswordToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    resetPasswordToken.email,
    resetPasswordToken.token
  );

  return { success: "Reset Email sent!" };
};
