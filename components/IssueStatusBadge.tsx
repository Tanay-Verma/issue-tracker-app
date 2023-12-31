import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";

const statusMap: Record<
  Status,
  { lable: string; color: "red" | "green" | "violet" }
> = {
  CLOSED: { lable: "Closed", color: "green" },
  IN_PROGRESS: { lable: "In Progress", color: "violet" },
  OPEN: { lable: "Open", color: "red" },
};

const IssueStatusBadge = ({ status }: { status: Status }) => {
  return <Badge color={statusMap[status].color}>{statusMap[status].lable}</Badge>;
};

export default IssueStatusBadge;
