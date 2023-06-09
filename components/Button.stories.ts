import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
};

export default meta;

type Stories = StoryObj<typeof Button>;

export const Primary: Stories = {
  args: {
    onClick() {
        alert("Button clicked")
    },
  text:"Click me"
  },
};

