"use client";
import { fetchProjectTasks } from "@/api/api";
import useFetch from "@/services/useFetch";
import Async from "./Async";

type Props = {
  id?: string;
};

const ProjectTask = ({ id }: Props) => {
  const { loading, data, error } = useFetch(`${id}`, fetchProjectTasks);

  return (
    <Async
      isLoading={loading}
      isError={error}
      onSuccess={
        <div>
          <p className="my-4 text-lg font-extrabold uppercase">All Tasks</p>
          <div className="flex flex-wrap items-center justify-between gap-5">
            {data.length > 0 &&
              data.map((items) => (
                <ul
                  key={items.gid}
                  className="flex flex-col items-center justify-center w-1/4 gap-1 px-5 py-3 overflow-hidden text-lg text-center bg-green-300 rounded-3xl text-ellipsis"
                >
                  <li>{items.gid}</li>
                  <li>{items.name}</li>
                  <li>{items.resource_type}</li>
                  <li>{items.resource_subtype}</li>
                </ul>
              ))}
          </div>
        </div>
      }
    />
  );
};

export default ProjectTask;
