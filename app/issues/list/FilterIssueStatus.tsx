"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];
const FilterIssueStatus = () => {
  const router = useRouter();
  return (
    <Select.Root
      onValueChange={(status) => {
        const searchParam = status === "ALL" ? "" : `?status=${status}`;
        router.push(`/issues/list${searchParam}`)
      }}
    >
      <Select.Trigger placeholder="Filter by status" />
      <Select.Content>
        <Select.Group>
          {statuses.map((status) => (
            <Select.Item key={status.value} value={status.value ?? "ALL"}>
              {status.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default FilterIssueStatus;
