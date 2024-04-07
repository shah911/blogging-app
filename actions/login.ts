"use server";

import { signIn } from "@/utils/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/utils/routes";
import { loginSchema } from "@/utils/schema";
import { AuthError } from "next-auth";
import { z } from "zod";

export const login = async (args: z.infer<typeof loginSchema>) => {
  const validatedFields = loginSchema.safeParse(args);
  if (!validatedFields.success) {
    return { error: "invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    return { success: "success" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "invalid credentials" };

        default:
          return { error: "something went wrong" };
      }
    }
    throw error;
  }
};
