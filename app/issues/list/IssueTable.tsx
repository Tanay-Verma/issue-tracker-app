import { IssueStatusBadge } from "@/components";
import Link from "@/components/Link";
import { PageSize } from "@/components/Pagination";
import { Issue, Status } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import NextLink from "next/link";
import { GoSortAsc, GoSortDesc } from "react-icons/go";

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  order: "asc" | "desc";
  page: string;
  pageSize:PageSize;
  assignee:string
}

interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}

const IssueTable = ({issues,searchParams}:Props) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
              <NextLink
                href={{ query: { ...searchParams, orderBy: column.value, order: (searchParams.order === "asc" && searchParams.orderBy === column.value) ? "desc":"asc" } }}
              >
                {column.label}
              </NextLink>
              { 
                column.value === searchParams.orderBy ? searchParams.order === "asc" ? <GoSortAsc className="inline text-xl ml-1"/> : <GoSortDesc className="inline text-xl ml-1" />:<></>
              }
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              <div className="block md:hidden">
                <IssueStatusBadge status={issue.status} />
              </div>
              <div className="block md:hidden">
                {issue.createdAt.toDateString()}
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {issue.createdAt.toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

const columns: {
  label: string;
  value: keyof Issue;
  className?: string;
}[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  {
    label: "Created At",
    value: "createdAt",
    className: "hidden md:table-cell",
  },
];

export const columnsName = columns.map((column) => column.value);

export default IssueTable;
