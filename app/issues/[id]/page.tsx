import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import EditButton from "./EditButton";
import IssueDetails from "./IssueDetails";
import DeleteButton from "./DeleteButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import AssigneeSelect from "./AssigneeSelect";

interface Props {
  params: { id: string };
}

const IssueDetailsPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) notFound();
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <div className="md:col-span-4">
        <IssueDetails issue={issue}/>
      </div>
      {session && <div className="flex flex-col gap-4">
        <AssigneeSelect/>
        <EditButton issueId={params.id}/>
        <DeleteButton issueId={params.id}/>
      </div>}
    </div>
  );
};

export default IssueDetailsPage;
