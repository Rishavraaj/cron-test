import React from "react";
import SectionTasks from "@/components/SectionTasks";

type Props = {
  params: {
    gid: string;
  };
  searchParams: {
    [key: string]: string;
  };
};

const page = ({ params: { gid }, searchParams }: Props) => {
  const sectionName = Object.keys(searchParams).join(",");

  return (
    <div className="w-full max-w-5xl mx-auto my-0">
      <SectionTasks gid={gid} sectionName={sectionName} />
    </div>
  );
};

export default page;
