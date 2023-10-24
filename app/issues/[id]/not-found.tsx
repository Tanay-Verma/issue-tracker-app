import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const notFound = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center items-center space-x-3">
          <h2>404</h2>
          <p >Could not find requested resource</p>
      </div>
      <Button>
        <Link href="/issues">Return</Link>
      </Button>
    </div>
  );
};

export default notFound;
