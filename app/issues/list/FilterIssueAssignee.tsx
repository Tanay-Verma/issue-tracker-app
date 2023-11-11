"use client";
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "redaxios";
import Skeleton from "@/components/Skeleton";
import { useRouter, useSearchParams } from "next/navigation";
const FilterIssueAssignee = () => {
  const { data: assignees, error, isLoading } = useAssignee();
  const router = useRouter();
  const searchParams = useSearchParams()
  if (isLoading) return <Skeleton height="2rem" />;

  if (error) return null;

  return (
    <Select.Root
    defaultValue={searchParams.get("assignee") ?? undefined}
    onValueChange={async(assigneeId) => {
      const params = new URLSearchParams(Array.from(searchParams.entries()));
      params.delete("page")
      if(params.has("assignee")) params.delete("assignee")
      if(assigneeId !== "all") params.append("assignee",assigneeId);
      const query = params.size ? `?${params.toString()}` : "";
      router.push(`/issues/list${query}`);
    }}>
      <Select.Trigger placeholder="Filter by Assignee" />
      <Select.Content>
        <Select.Group>
          <Select.Label>Assignee</Select.Label>
          <Select.Item value="all">All</Select.Item>
          <Select.Item value="unassigned">Unassigned</Select.Item>
          {assignees?.map((assignee) => (
            <Select.Item
              key={assignee.assignedToUser.id}
              value={assignee.assignedToUser.id}
            >
              {assignee.assignedToUser.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default FilterIssueAssignee;

const useAssignee = () =>
  useQuery<{ assignedToUser: User }[]>({
    queryKey: ["assignees"],
    queryFn: async () => {
      const res = await axios.get("/api/issues/assignees");
      return res.data;
    },
    staleTime: 60 * 1000,
    retry: 3,
  });
