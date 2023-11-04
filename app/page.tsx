import Pagination from "@/components/Pagination";
import { Button } from "@radix-ui/themes";
import LatestIssues from "./LatestIssues";
import IssueSummary from "./IssueSummary";
import prisma from "@/prisma/client";
import IssueChart from "./IssueChart";
import { Metadata } from "next";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex flex-col gap-5">
        <IssueSummary closed={closed} inProgress={inProgress} open={open}/>
        <IssueChart closed={closed} inProgress={inProgress} open={open} />
      </div>
      <LatestIssues/>
    </div>
  );
}

export const metadata:Metadata = {
  title:"Issue Tracker | Dashboard",
  description: "View a summary of project issues",
}
