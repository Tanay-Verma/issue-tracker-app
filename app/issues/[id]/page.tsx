import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import EditButton from "./EditButton";
import IssueDetails from "./IssueDetails";

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
        <IssueDetails issue={issue}/>
      </div>
      <div>
        <EditButton issueId={params.id}/>
      </div>
    </div>
  );
};

export default IssueDetailsPage;
