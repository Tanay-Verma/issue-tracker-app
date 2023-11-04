import React, { cache } from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "@/app/issues/_components/IssueFormSkeleton";
const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const fetchIssue = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

interface Props {
  params: { id: string };
}

const EditPage = async ({ params }: Props) => {
  const issue = await fetchIssue(parseInt(params.id));
  if (!issue) notFound();
  return <IssueForm issue={issue} />;
};

export default EditPage;

export const generateMetadata = async ({ params }: Props) => {
  const issue = await fetchIssue(parseInt(params.id));
  return {
    title: `Issue Tracker | ${issue?.title} | Edit`,
    description: `Edit issue ${issue?.id}`,
  };
};
