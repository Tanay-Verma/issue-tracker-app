"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useSearchParams, useRouter } from "next/navigation";
import React from "react";

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];
const FilterIssueStatus = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Select.Root
      defaultValue={searchParams.get("status") ?? 'ALL'}
      onValueChange={(status) => {

        const params = new URLSearchParams();
        if(status !== 'ALL') params.append("status",status);
        if(searchParams.get("orderBy")) params.append("orderBy",searchParams.get("orderBy")!)
        const query = params.size ? `?${params.toString()}` : "";
        router.push(`/issues/list${query}`);
      }}
    >
      <Select.Trigger placeholder="Filter by status" />
      <Select.Content>
        <Select.Group>
          {statuses.map((status) => (
            <Select.Item
              key={status.value ?? "ALL"}
              value={status.value ?? "ALL"}
            >
              {status.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default FilterIssueStatus;
