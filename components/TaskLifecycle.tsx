"use client";
import { fetchTaskLifecycle } from "@/api/api";
import useFetch from "@/services/useFetch";
import React, { useState } from "react";
import CustomLink from "./CustomLink";
import Async from "./Async";
import { filterTaskStories, getAssignee } from "@/utils/Tasks";

type Props = {
  id?: string;
};

const TaskLifecycle = ({ id }: Props) => {
  const { loading, error, data } = useFetch(`${id}`, fetchTaskLifecycle);

  const [subtypeFilter, setSubtypeFilter] = useState<string>("");

  const handleSubtypeFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSubtypeFilter(e.target.value);
  };

  const filteredData = filterTaskStories(data, subtypeFilter);

  return (
    <Async
      isLoading={loading}
      isError={error}
      onSuccess={
        <div>
          <div className="flex items-center justify-between h-20">
            <p className="text-lg font-bold uppercase">Lifecycle of Task</p>
            <select
              data-testid="filter-option"
              name="status"
              value={subtypeFilter}
              onChange={handleSubtypeFilterChange}
            >
              <option value="All">All</option>
              <option value="Assigned/Unassigned">Assigned/Unassigned</option>
              <option value="enum_custom_field_changed">
                enum_custom_field_changed
              </option>
            </select>
            <CustomLink href="/usertask" variant="button">
              User Tasks
            </CustomLink>
          </div>
          <ul className="flex justify-around w-full pb-5 mt-3 font-extrabold tracking-wider uppercase border-b-2 border-slate-300">
            <li className="text-center basis-1/5">Created by</li>
            <li className="text-center basis-1/5">Created at</li>
            <li className="text-center basis-1/5">Status</li>
            <li className="text-center basis-1/5">text</li>
            <li className="text-center basis-1/5">Assignee</li>
          </ul>
          {filteredData.length > 0 &&
            filteredData.map((item, index) => {
              const previousAssignee =
                index > 0 ? filteredData[index - 1].assignedTo : null;
              item.previousAssignee = previousAssignee;
              item.assignedTo = getAssignee(item);

              return (
                <ul
                  key={item.gid}
                  className="flex items-center justify-around gap-4 px-8 py-8 text-sm border-b-2 border-slate-300"
                >
                  <li className="text-center basis-1/5">
                    {item?.created_by?.name || "Unknown"}
                  </li>
                  <li className="text-center basis-1/5">
                    {new Date(item.created_at).toLocaleDateString()}
                  </li>
                  <li className="text-center basis-1/5">
                    {item.resource_subtype}
                  </li>
                  <li className="overflow-hidden text-center basis-1/5 whitespace-nowrap text-ellipsis">
                    {item.text}
                  </li>
                  <li className="text-center basis-1/5">{item.assignedTo}</li>
                </ul>
              );
            })}
        </div>
      }
    />
  );
};

export default TaskLifecycle;
