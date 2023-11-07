import Pagination, { AllowedPageSizes } from "@/components/Pagination";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import IssueActions from "./IssueActions";
import IssueTable, { IssueQuery, columnsName } from "./IssueTable";
import { Metadata } from "next";

interface Props {
  searchParams: IssueQuery;
}
const statuses = Object.values(Status);
const allowedPageSizes :AllowedPageSizes = ["5","10","15"]
const IssuesPage = async ({ searchParams }: Props) => {
  // filtering out which issues to fetch
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status };

  // setting the order in which issues need to be fetched
  const orderBy = columnsName.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: searchParams.order }
    : undefined;

  // prop values for Pagination component
  const page = parseInt(searchParams.page) || 1;
  const pageSize = searchParams.pageSize ? allowedPageSizes.includes(searchParams.pageSize) ? parseInt(searchParams.pageSize):10:10;
  const issueCount = await prisma.issue.count({
    where,
  });

  // fetching the issues
  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return (
    <div className="flex flex-col gap-3">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        currentPage={page}
        itemCount={issueCount}
        pageSize={pageSize}
      />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;

export const metadata: Metadata = {
  title: "Issue Tracker | Issue List",
  description: "View all project issues",
};
