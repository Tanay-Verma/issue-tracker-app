import { Skeleton } from "@/components";

const IssueFormSkeleton = () => {
  return (
    <div className="max-w-xl">
      <form className="space-y-4">
        <div>
          <label htmlFor="title">Title</label>
          <Skeleton height="2rem" />
        </div>
        <div>
          <label>Description</label>
          <Skeleton height="20rem" />
        </div>
        <Skeleton height="2rem" width="10rem" className="mt-16"/>
      </form>
    </div>
  );
};

export default IssueFormSkeleton;
