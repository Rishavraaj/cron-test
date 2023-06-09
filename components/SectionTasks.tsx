"use client";
import { fetchSectionTasks } from "@/api/api";
import { SectionTaskDetails } from "@/models/Company.interface";
import React, { useEffect, useState } from "react";
import CustomLink from "./CustomLink";
import Async from "./Async";

type Props = {
  gid?: string;
  sectionName?: string;
};

const SectionTasks = ({ gid, sectionName }: Props) => {
  const [sectionTask, setSectionTasks] = useState<SectionTaskDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    fetchSectionTask();
    setLoading(true);
  }, [gid]);

  const fetchSectionTask = async (): Promise<void> => {
    try {
      const params = {
        limit: "50",
        section: `${gid}`,
        opt_fields: "completed,due_on,name,resource_subtype",
      };
      const res = await fetchSectionTasks(params);

      setSectionTasks(res?.data);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  const incompleteTasks = sectionTask.filter(
    (item) => item.due_on !== null && item.completed === false
  );

  return (
    <Async
      isLoading={loading}
      isError={error}
      onSuccess={
        <div>
          <div className="flex items-center justify-between h-20">
            <p className="my-4 text-lg font-extrabold uppercase">
              {incompleteTasks.length > 0
                ? "Incompleted Tasks beyond due date"
                : `No incomplete tasks beyond the due date in section ${sectionName} `}
            </p>
            <CustomLink href="/projects" variant="button">
              Projects
            </CustomLink>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-5">
            {incompleteTasks.length > 0 &&
              incompleteTasks.map((items) => (
                <ul
                  key={items.gid}
                  className="flex flex-col items-center justify-center w-1/4 gap-1 px-5 py-3 overflow-hidden text-lg text-center bg-green-300 rounded-3xl text-ellipsis"
                >
                  <li>{items.gid}</li>
                  <li>{items.name}</li>
                  <li>{items.resource_subtype}</li>
                </ul>
              ))}
          </div>
        </div>
      }
    />
  );
};

export default SectionTasks;
