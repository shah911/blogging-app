import Google from "next-auth/providers/google";
import { type DefaultSession } from "next-auth";
import type { NextAuthConfig } from "next-auth";
import { getUserByEmail, getUserById } from "@/utils/user";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "@/utils/schema";
import bcrypt from "bcryptjs";
import prisma from "@/utils/connect";

type ExtendedUser = DefaultSession["user"] & {
  isAdmin: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = loginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) return user;
        }
        return null;
      },
    }),
  ],
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session) {
        session.user.isAdmin = token.isAdmin as boolean;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const currentUser = await getUserById(token.sub);
      if (!currentUser) return token;

      token.isAdmin = currentUser.isAdmin;

      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.AUTH_SERECT,
} satisfies NextAuthConfig;
