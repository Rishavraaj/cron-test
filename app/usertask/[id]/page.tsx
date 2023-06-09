import TaskLifecycle from "@/components/TaskLifecycle";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const page = ({ params: { id } }: Props) => {
  return (
    <div className="w-full max-w-5xl mx-auto my-0">
      <TaskLifecycle id={id} />
    </div>
  );
};

export default page;
