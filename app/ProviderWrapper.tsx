"use client";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

type Props = {
  session?: Session | null;
  children: React.ReactNode;
};

export default function ProviderWrapper({ children, session }: Props) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
