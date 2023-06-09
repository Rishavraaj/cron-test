import React, { ReactNode } from "react";
import Link from "next/link";
import clsx from "clsx";

type CustomLinkProps = {
  variant: "text" | "button";
  href: string;
  children: ReactNode;
};

const CustomLink = ({ variant, href, children }: CustomLinkProps) => {
  const classNames = clsx("border rounded-full py-2 px-4", {
    "bg-green-600 text-white": variant === "button",
    "border-green-600 text-green-600": variant === "text",
  });

  return (
    <Link className={classNames} href={href}>
      {children}
    </Link>
  );
};

export default CustomLink;
