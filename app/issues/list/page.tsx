import Pagination from "@/components/Pagination";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import IssueActions from "./IssueActions";
import IssueTable, { IssueQuery, columnsName } from "./IssueTable";

interface Props {
  searchParams: IssueQuery;
}
const statuses = Object.values(Status);

const IssuesPage = async ({ searchParams }: Props) => {
  // filtering out which issues to fetch
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status };

  // setting the order in which issues need to be fetched
  const orderBy = columnsName.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  // prop values for Pagination component
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;
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
      <Pagination currentPage={page} itemCount={issueCount} pageSize={pageSize} />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
