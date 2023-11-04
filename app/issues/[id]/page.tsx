import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import AssigneeSelect from "./AssigneeSelect";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import IssueDetails from "./IssueDetails";
import { cache } from "react";

const fetchIssue = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

interface Props {
  params: { id: string };
}

const IssueDetailsPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const issue = await fetchIssue(parseInt(params.id));
  if (!issue) notFound();
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <div className="md:col-span-4">
        <IssueDetails issue={issue} />
      </div>
      {session && (
        <div className="flex flex-col gap-4">
          <AssigneeSelect issue={issue} />
          <EditButton issueId={params.id} />
          <DeleteButton issueId={params.id} />
        </div>
      )}
    </div>
  );
};

export default IssueDetailsPage;

export const generateMetadata = async ({ params }: Props) => {
  const issue = await fetchIssue(parseInt(params.id));
  return {
    title: `Issue Tracker | ${issue?.title}`,
    description: `Details of issue ${issue?.id}`,
  };
};
