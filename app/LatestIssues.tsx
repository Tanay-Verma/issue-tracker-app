import { IssueStatusBadge } from "@/components";
import prisma from "@/prisma/client";
import { Avatar, Card, Heading, Table, Text } from "@radix-ui/themes";
import Link from "next/link";

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: { assignedToUser: true },
  });
  return (
    <Card>
      <Heading size="4">Latest Issues</Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <div className="flex justify-between">
                  <div className="flex flex-col items-start gap-2">
                    <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                    <IssueStatusBadge status={issue.status} />
                    <Text>{issue.createdAt.toDateString()}</Text>
                  </div>
                  {issue.assignedToUser && (
                    <div className="flex flex-col justify-center items-center">
                      <Avatar
                        fallback="?"
                        src={issue.assignedToUser.image ?? undefined}
                        size="2"
                        radius="full"
                      />
                      <Text>{issue.assignedToUser.name}</Text>
                    </div>
                  )}
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
