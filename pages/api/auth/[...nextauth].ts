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
      checks: ["none"],
    }),
  ],

  jwt: {
    // A secret to use for key generation. Defaults to the top-level `secret`.
    secret: process.env.SECRET,
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    maxAge: 60 * 60 * 24 * 30,
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behavior.
    //@ts-ignore
    async encode({ secret, token, maxAge }) {},
    //@ts-ignore
    async decode({ secret, token }) {},
  },

  // secret: process.env.SECRET,
};

export default NextAuth(authOptions);
