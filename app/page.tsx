"use client";
import CompanyDetail from "@/components/CompanyDetail";
import CustomLink from "@/components/CustomLink";

export default function Home() {
  return (
    <main className="w-full max-w-5xl mx-auto my-0">
      <div className="flex items-center h-16 gap-5">
        <CustomLink variant="button" href="/projects">
          Project
        </CustomLink>
        <CustomLink variant="button" href="/usertask">
          User Tasks
        </CustomLink>
        <CustomLink variant="button" href="/slack">
          Slack Notification
        </CustomLink>
      </div>
      <CompanyDetail />
    </main>
  );
}
