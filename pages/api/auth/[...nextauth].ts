import NextAuth from "next-auth/next";
import prisma from "../../../lib/prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import { Session, User } from "next-auth";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    //@ts-ignore
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    //@ts-ignore

    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    //@ts-ignore

    async session({ session, user, token }) {
      return session;
    },
  },
};

export default NextAuth(authOptions);
