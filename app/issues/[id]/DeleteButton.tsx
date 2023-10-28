"use client";
import { Spinner } from "@/components";
import { AlertDialog, Button, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import axios from "redaxios";

const DeleteButton = ({ issueId }: { issueId: string }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const handleDelete = async () => {
    try {
      setDeleting(true);
      await axios.delete(`/api/issues/${issueId}`);
      router.push("/issues/list");
      router.refresh();
    } catch (error) {
      setDeleting(false);
      setError(true);
    }
  };
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" disabled={isDeleting}>
            <AiFillDelete />
            <Text as="span" className="cursor-pointer">
              Delete Issue
            </Text>
            {isDeleting && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion?</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete this issue? This action cannot be
            undone.
          </AlertDialog.Description>
          <div className="flex justify-end gap-4 mt-2">
            <AlertDialog.Cancel>
              <Button color="gray" variant="soft">
                <Text as="span" className="cursor-pointer">
                  Cancel
                </Text>
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color="red" variant="soft" onClick={handleDelete}>
                <Text as="span" className="cursor-pointer">
                  Delete
                </Text>
              </Button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            Something went wrong this error could not be deleted...
          </AlertDialog.Description>
          <div className="flex justify-end mt-2">
            <Button variant="soft" color="gray" onClick={() => setError(false)}>
              <Text as="span" className="cursor-pointer">
                Okay
              </Text>
            </Button>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteButton;
