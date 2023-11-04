import { Status } from "@prisma/client";
import { Card, Text } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueRename = ({ closed, inProgress, open }: Props) => {
  const containers: { label: string; status: Status; value: number }[] = [
    { label: "Open Issues", status: "OPEN", value: open },
    { label: "Closed Issues", status: "CLOSED", value: closed },
    { label: "In-progress Issues", status: "IN_PROGRESS", value: inProgress },
  ];
  return (
    <div className="flex gap-4">
      {containers.map((container) => (
        <Card key={container.status}>
          <div className="flex flex-col gap-1">
            <Link href={`/issues/list?status=${container.status}`} className="font-medium text-md">
              {container.label}
            </Link>
            <Text size="5" className="font-bold">{container.value}</Text>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default IssueRename;
