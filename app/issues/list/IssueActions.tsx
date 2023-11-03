import { Button } from "@radix-ui/themes";
import Link from "next/link";
import FilterIssueStatus from "./FilterIssueStatus";

const IssueActions = () => {
  return (
    <div className="flex justify-between">
      <FilterIssueStatus />
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </div>
  );
};

export default IssueActions;
