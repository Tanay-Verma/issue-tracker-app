"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "redaxios"
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const statuses: { label: string; value: Status }[] = [
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];
const StatusSelect = ({ issueId,status }: { issueId:number,status: Status }) => {
  const router = useRouter()
  return (
    <>
      <Select.Root defaultValue={status} onValueChange={async (status:Status)=>{
        try {
          await axios.patch(`/api/issues/${issueId}`,{
            status
          })
          
          toast.success(`Status changed to ${status === "IN_PROGRESS" ? "IN PROGRESS":status}`)
          router.refresh();
        } catch (error) {
          toast.error("Changes could not be saved")
        }
      }}>
        <Select.Trigger placeholder="Status..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Status</Select.Label>
            {statuses.map((status) => (
              <Select.Item key={status.value} value={status.value}>
                {status.label}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster/>
    </>
  );
};

export default StatusSelect;
