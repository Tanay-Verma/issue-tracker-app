"use client";
import { User } from "@prisma/client";
import { Select, SelectGroup } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import axios from "redaxios";
const AssigneeSelect = () => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get<User[]>("/api/users");
      setUsers(data);
    };
    fetchUser();
  },[]);
  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <SelectGroup>
          <Select.Label>Suggestion</Select.Label>
          {users.map((user) => (
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
