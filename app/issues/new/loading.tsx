import {Skeleton} from "@/components"

import React from "react";

const LoadingNewIssuePage = () => {
  return (
    <div className="max-w-xl">
      <form className="space-y-4">
        <div>
          <label htmlFor="title">Title</label>
          <Skeleton />
        </div>
        <div>
          <label>Description</label>
          <Skeleton height="20rem" />
        </div>
        <Skeleton />
      </form>
    </div>
  );
};

export default LoadingNewIssuePage;
