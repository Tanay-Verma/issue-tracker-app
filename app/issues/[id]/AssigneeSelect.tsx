"use client";
import { Select, SelectGroup } from "@radix-ui/themes";
import React from "react";

const AssigneeSelect = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <SelectGroup>
          <Select.Label>Suggestion</Select.Label>
          <Select.Item value="1">Tanay Verma</Select.Item>
          <Select.Item value="2">Saumya Verma</Select.Item>
        </SelectGroup>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
