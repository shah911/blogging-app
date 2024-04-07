import NextAuth, { DefaultSession } from "next-auth";
import authConfig from "../../auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./connect";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
