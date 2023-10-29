"use client";
import { Issue, User } from "@prisma/client";
import { Select, SelectGroup } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "@/components/Skeleton";
import axios from "redaxios";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get("/api/users");
      return res.data;
    },
    staleTime: 60 * 1000,
    retry: 3,
  });

  if (isLoading) return <Skeleton height="2rem" />;

  if (error) return null;

  return (
    <Select.Root
      defaultValue={issue.assignedToUserId || "null"}
      onValueChange={(userId) => {
        axios.patch(`/api/issues/${issue.id}`, {
          assignedToUserId: userId !== "null" ? userId:null,
        });
      }}
    >
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <SelectGroup>
          <Select.Label>Suggestion</Select.Label>
          <Select.Item value="null">Unassigned</Select.Item>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </SelectGroup>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
