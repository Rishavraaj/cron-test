import type { Meta, StoryObj } from "@storybook/react";
import CustomLink from "./CustomLink";

const meta: Meta<typeof CustomLink> = {
  title: "CustomLink",
  component: CustomLink,
};

export default meta;

type Stories = StoryObj<typeof CustomLink>;

export const Button: Stories = {
  args: {
   variant: "button",
   href: "/",
   children: "your text"
  },
};

export const Text: Stories = {
    args: {
        variant: "text",
        href: "/",
        children: "your text"
    }
}

