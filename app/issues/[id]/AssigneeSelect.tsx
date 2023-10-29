"use client";
import { User } from "@prisma/client";
import { Select, SelectGroup } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "@/components/Skeleton";
import axios from "redaxios";
const AssigneeSelect = () => {
  const {data:users, error, isLoading} = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get("/api/users");
      return res.data;
    },
    staleTime:60*1000,
    retry:3
  });

  if(isLoading) return <Skeleton height="2rem"/>

  if(error) return null
  
  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <SelectGroup>
          <Select.Label>Suggestion</Select.Label>
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
