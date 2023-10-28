import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import EditButton from "./EditButton";
import IssueDetails from "./IssueDetails";
import DeleteButton from "./DeleteButton";

interface Props {
  params: { id: string };
}

const IssueDetailsPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) notFound();
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <div className="md:col-span-4">
        <IssueDetails issue={issue}/>
      </div>
      <div className="flex flex-col gap-4">
        <EditButton issueId={params.id}/>
        <DeleteButton issueId={params.id}/>
      </div>
    </div>
  );
};

export default IssueDetailsPage;
