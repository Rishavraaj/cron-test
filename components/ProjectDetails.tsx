"use client";
import { fetchProjectData } from "@/api/api";
import React from "react";
import { useState, useEffect } from "react";
import { ProjectData } from "@/models/Company.interface";
import CustomLink from "./CustomLink";
import Async from "./Async";

type Props = {
  id?: string;
};

const ProjectDetails = ({ id }: Props) => {
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    fetchProjectDetails();
    setLoading(true);
  }, [id]);

  const fetchProjectDetails = async (): Promise<void> => {
    try {
      const res = await fetchProjectData(`${id}`);
      if (res) {
        setProjectData(res.data);
        setLoading(false);
      } else {
        setLoading(false);
        setError(true);
      }
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <Async
      isLoading={loading}
      isError={error}
      onSuccess={
        <div>
          <div className="flex items-center justify-between h-16">
            <p className="mb-3 text-lg font-bold uppercase">
              Project details of : {projectData?.name}
            </p>
            <div className="flex gap-10">
              <CustomLink variant="button" href="/projects">
                Projects
              </CustomLink>
              <CustomLink variant="button" href="/">
                Home
              </CustomLink>
            </div>
          </div>
          {projectData && (
            <ul className="flex flex-col items-start justify-center gap-3 p-3 bg-teal-400 rounded-lg">
              {projectData.gid && <li>GID: {projectData.gid}</li>}
              {projectData.resource_type && (
                <li>Resource Type: {projectData.resource_type}</li>
              )}
              {projectData.name && <li>Name: {projectData.name}</li>}
              {projectData.default_view && (
                <li>Default View: {projectData.default_view}</li>
              )}
              {projectData.notes && <li>Notes: {projectData.notes}</li>}
              {projectData.color && <li>Color: {projectData.color}</li>}
              {projectData.created_at && (
                <li>
                  Created At:{" "}
                  {new Date(projectData.created_at).toLocaleDateString()}
                </li>
              )}
              {projectData.modified_at && (
                <li>
                  Modified At:{" "}
                  {new Date(projectData.modified_at).toLocaleDateString()}
                </li>
              )}

              <li>
                Completed: {projectData.completed ? "Completed" : "In Progress"}
              </li>
            </ul>
          )}
        </div>
      }
    />
  );
};

export default ProjectDetails;
