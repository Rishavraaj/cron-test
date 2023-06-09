import { Details } from "@/models/Company.interface";
import React from "react";
import clsx from "clsx";

type CardProps = {
  size?: "small" | "medium" | "large";
  items?: Details;
};

const CompanyCard = ({ size = "medium", items }: CardProps) => {
  let sizeClass = "";

  sizeClass =
    size === "small"
      ? "text-sm px-6 py-3"
      : size === "medium"
      ? "text-lg px-10 py-4"
      : size === "large"
      ? "text-2xl px-12 py-6"
      : "";

  return (
    <ul
      className={clsx(
        "flex flex-col items-center justify-center bg-rose-100 h-fit rounded-2xl w-fit",
        sizeClass
      )}
      data-testid="company-card"
    >
      <li>{items?.gid}</li>
      <li>{items?.name}</li>
      <li>{items?.resource_type}</li>
    </ul>
  );
};

export default CompanyCard;
