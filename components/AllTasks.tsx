"use client";
import React from "react";
import { useState, useEffect } from "react";
import { fetchCustomField, fetchFilteredTasks, fetchUsers } from "@/api/api";
import { CustomField, Enum, ProjectTasks } from "@/models/Company.interface";
import useFetch from "@/services/useFetch";
import Async from "./Async";
import CustomLink from "./CustomLink";
import Link from "next/link";
import { sortByStatus } from "@/utils/Tasks";

const AllTasks = () => {
  const [taskData, setTaskData] = useState<ProjectTasks[]>([]);
  const [assignee, setAssignee] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [customFields, setCustomFields] = useState<CustomField | null>(null);
  const [taskStatus, setTaskStatus] = useState<string>("all");
  const [sortStatusBy, setSortStatusBy] = useState<string | null>(null);
  const [status, setStatus] = useState<string[]>([]);

  const { data } = useFetch(`users`, fetchUsers);

  useEffect(() => {
    fetchCustomfields();
  }, []);

  useEffect(() => {
    filteredTasks();
    setLoading(true);
  }, [assignee, sortBy, taskStatus, sortStatusBy]);

  const filteredTasks = async (): Promise<void> => {
    try {
      const filters = {
        resource_subtype: "default_task",
        ...(assignee && { "assignee.any": assignee }),
        ...(sortBy && { sort_by: sortBy }),
        sort_ascending: "false",
        opt_fields: "name,resource_subtype,custom_fields",
      };

      const res = await fetchFilteredTasks(`tasks/search`, filters);
      let filteredData = res?.data;

      if (taskStatus !== "all") {
        filteredData = filteredData.filter(
          (item: ProjectTasks) =>
            item.custom_fields[0]?.display_value === taskStatus
        );
      }

      let sortedData = filteredData;

      if (sortStatusBy) {
        sortByStatus(filteredData, status);
      }

      setTaskData(sortedData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  const fetchCustomfields = async () => {
    try {
      const res = await fetchCustomField();
      setCustomFields(res?.data);
      setLoading(false);
      setStatus(res?.data?.enum_options?.map((item: Enum) => item.name || []));
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  const handleAssigneeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const assignee = e.target.value;
    setAssignee(assignee);
    if (assignee === "filter") {
      setAssignee(null);
    } else {
      setAssignee(assignee);
    }
  };

  const handleSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortBy = e.target.value;
    if (sortBy === "sort") {
      setSortBy(null);
      setSortStatusBy(null);
    } else if (sortBy === "status") {
      setSortStatusBy("status");
    } else {
      setSortBy(sortBy);
      setSortStatusBy(null);
    }
  };

  const handleStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value;

    if (status === "all") {
      setTaskStatus("all");
    } else {
      setTaskStatus(status);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between w-full h-16">
        <select
          data-testid="select-option"
          name="Filter"
          onChange={handleAssigneeChange}
        >
          <option value="filter">Filter</option>

          {data.length > 0 &&
            data.map((users) => (
              <option key={users.gid} value={`${users.gid}`}>
                {users.name}
              </option>
            ))}
        </select>

        <select name="status" value={taskStatus} onChange={handleStatus}>
          <option value="all">All</option>

          {customFields &&
            customFields.enum_options?.map((item) => (
              <option key={item.gid} value={item.name}>
                {item.name}
              </option>
            ))}
        </select>
        <select
          data-testid="sort-by-option"
          name="sort by"
          onChange={handleSortBy}
        >
          <option value="sort">sort by</option>
          <option value="status">Sort by status</option>
          <option value="created_at">created_at</option>
          <option value="modified_at">modified_at</option>
          <option value="completed_at">Completed</option>
        </select>

        <CustomLink variant="button" href="/">
          Home
        </CustomLink>
      </div>

      <Async
        isError={error}
        isLoading={loading}
        onSuccess={
          <div className="flex flex-wrap items-center justify-between gap-5">
            {taskData.length > 0 ? (
              taskData.map((items) => (
                <Link
                  href={`/usertask/${items.gid}`}
                  key={items.gid}
                  className="flex flex-col items-center justify-center w-1/4 gap-1 px-5 py-3 overflow-hidden text-lg text-center bg-green-300 rounded-3xl text-ellipsis"
                >
                  <ul>
                    <li>{items.gid}</li>
                    <li>{items?.custom_fields[0]?.display_value}</li>
                    <li>{items.name}</li>
                    <li>{items.resource_subtype}</li>
                  </ul>
                </Link>
              ))
            ) : (
              <p>No tasks available</p>
            )}
          </div>
        }
      />
    </div>
  );
};

export default AllTasks;
