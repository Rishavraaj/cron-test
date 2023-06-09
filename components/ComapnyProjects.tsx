"use client";
import React from "react";
import CompanyCard from "./CompanyCard";
import CustomLink from "./CustomLink";
import Link from "next/link";
import useFetch from "@/services/useFetch";
import { fetchAsanaApi } from "@/api/api";
import Async from "./Async";

const ComapnyProjects = () => {
  const { loading, data, error } = useFetch(
    "workspaces/1187384491238753/projects",
    fetchAsanaApi
  );

  return (
    <Async
      isLoading={loading}
      isError={error}
      onSuccess={
        <div className="w-full max-w-5xl min-h-screen mx-auto my-0">
          <div className="flex items-center justify-between h-16">
            <p className="text-xl font-bold uppercase">our Projects</p>

            <CustomLink variant="button" href="/">
              Home
            </CustomLink>
          </div>
          <div className="flex flex-wrap items-center justify-between w-full gap-5">
            {data.length > 0 &&
              data.map((items) => (
                <Link href={`/projects/${items?.gid}`} key={items.gid}>
                  <CompanyCard items={items} />
                </Link>
              ))}
          </div>
        </div>
      }
    />
  );
};

export default ComapnyProjects;
