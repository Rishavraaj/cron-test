import type { Meta, StoryObj } from "@storybook/react";
import CompanyCard from "./CompanyCard";

const meta: Meta<typeof CompanyCard> = {
  title: "companycard",
  component: CompanyCard,
};

export default meta;

type Stories = StoryObj<typeof CompanyCard>;

export const Small: Stories = {
  args: {
    size: "small",
    items: {
      gid: "123",
      name: "Company Name",
      resource_type: "small company",
    },
  },
};

export const Medium: Stories = {
  args: {
    size: "medium",
    items: {
      gid: "123",
      name: "Company Name",
      resource_type: "medium company",
    },
  },
};

export const Large: Stories = {
  args: {
    size: "large",
    items: {
      gid: "123",
      name: "Company Name",
      resource_type: "large company",
    },
  },
};
