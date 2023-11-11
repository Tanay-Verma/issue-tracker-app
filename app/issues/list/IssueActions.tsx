import { Button } from "@radix-ui/themes";
import Link from "next/link";
import FilterIssueStatus from "./FilterIssueStatus";
import FilterIssueAssignee from "./FilterIssueAssignee";

const IssueActions = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-1">
      <div className="flex flex-col md:flex-row gap-1">
        <FilterIssueStatus />
        <FilterIssueAssignee/>
      </div>
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </div>
  );
};

export default IssueActions;
