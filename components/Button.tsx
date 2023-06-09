"use client";
import React from "react";

type ButtonProps = {
  onClick: () => void;
  text: string;
};

const Button = ({ onClick, text }: ButtonProps) => {
  return (
    <div
      className="flex items-center w-full h-16 max-w-5xl mx-auto my-0"
      onClick={onClick}
    >
      <button className="px-4 py-2 uppercase border-none cursor-pointer w-50 bg-lime-400 rounded-3xl">
        {text}
      </button>
    </div>
  );
};

export default Button;
