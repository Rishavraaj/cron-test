"use client";
import { fetchAsanaApi, fetchProjectSection } from "@/api/api";
import useFetch from "@/services/useFetch";
import React from "react";
import CompanyCard from "./CompanyCard";
import Async from "./Async";
import Link from "next/link";

type Props = {
  id?: string;
};

const ProjectSection = ({ id }: Props) => {
  const { loading, error, data } = useFetch(`${id}`, fetchProjectSection);

  return (
    <Async
      isLoading={loading}
      isError={error}
      onSuccess={
        <div>
          <p className="my-4 text-lg font-extrabold uppercase">All section</p>
          <div className="flex flex-wrap items-center justify-between gap-4">
            {data.length > 0 &&
              data.map((items) => (
                <Link
                  key={items.gid}
                  href={{
                    pathname: `/projects/${id}/${items.gid}`,
                    query: `${items.name}`,
                  }}
                >
                  <CompanyCard items={items} />
                </Link>
              ))}
          </div>
        </div>
      }
    />
  );
};

export default ProjectSection;
