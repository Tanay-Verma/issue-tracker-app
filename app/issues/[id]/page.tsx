import { IssueStatusBadge } from "@/components";
import prisma from "@/prisma/client";
import { Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { BiEdit } from "react-icons/bi";

interface Props {
  params: { id: string };
}

const IssueDetailsPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) notFound();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div>
        <Heading>{issue.title}</Heading>
        <Flex gap="3" my="2">
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className="prose" mt="4">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </div>
      <div>
        <Button>
          <BiEdit />
          <Link href={`issues/${issue.id}/edit`}>Edit Issue</Link>
        </Button>
      </div>
    </div>
  );
};

export default IssueDetailsPage;
