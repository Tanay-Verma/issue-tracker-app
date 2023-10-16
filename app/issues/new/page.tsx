"use client";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";

const NewIssuePage = () => {
  return (
    <div className="max-w-xl space-y-4">
      <div>
          <label htmlFor="title">Title</label>
          <TextField.Root>
            <TextField.Input id="title" placeholder="Title for you issue…" />
          </TextField.Root>
      </div>
      <div>
          <label htmlFor="description">Description</label>
          <TextArea id="description" placeholder="Description for your issue…" />
      </div>
    <Button>Submit New Issue</Button>
    </div>
  );
};

export default NewIssuePage;
