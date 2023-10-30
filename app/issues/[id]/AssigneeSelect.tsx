"use client";
import { Issue, User } from "@prisma/client";
import { Select, SelectGroup } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "@/components/Skeleton";
import axios from "redaxios";
import toast, { Toaster } from "react-hot-toast";

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
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || "null"}
        onValueChange={async (userId) => {
          try {
            await axios.patch(`/api/issues/${issue.id}`, {
              assignedToUserId: userId !== "null" ? userId : null,
            });
            toast.success(`${userId === "null" ? "Unassigned successfully":"Assigned successfully"}`)
          } catch (error) {
            toast.error("Changes could not be saved")
          }
          
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
      <Toaster/>
    </>
  );
};

export default AssigneeSelect;
