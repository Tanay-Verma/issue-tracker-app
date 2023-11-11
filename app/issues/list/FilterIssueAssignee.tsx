"use client"
import { Select } from "@radix-ui/themes"

const FilterIssueAssignee = () => {
  return (
    <Select.Root>
        <Select.Trigger placeholder="Filter by Assignee"/>
        <Select.Content>
            <Select.Group>
                <Select.Label>Assignee</Select.Label>
                <Select.Item value="null">Unassigned</Select.Item>
                
            </Select.Group>
        </Select.Content>
    </Select.Root>
  )
}

export default FilterIssueAssignee