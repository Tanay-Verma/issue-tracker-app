"use client";
import { Button, Callout, Text, TextArea, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiFillWarning } from "react-icons/ai";
import axios from "redaxios";
import { zodResolver } from "@hookform/resolvers/zod";
import { IssuesSchema } from "../../IssuesSchema";
import { z } from "zod";
import { ErrorMessage, Spinner } from "@/components";
import { Issue } from "@prisma/client";
import SimpleMDE from "react-simplemde-editor";

type IssueFormData = z.infer<typeof IssuesSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({ resolver: zodResolver(IssuesSchema) });
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit: SubmitHandler<IssueFormData> = async (data) => {
    try {
      setSubmitting(true);
      if (issue) await axios.patch(`/api/issues/${issue.id}`, data);
      else await axios.post("/api/issues", data);
      router.push("/issues/list");
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError("An unexpected error occured.");
    }
  };

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Icon>
            <AiFillWarning />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="title">Title</label>
          <TextField.Root>
            <TextField.Input
              id="title"
              placeholder="Title for you issue…"
              defaultValue={issue?.title}
              {...register("title")}
            />
          </TextField.Root>
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
        </div>
        <div>
          <label>Description</label>
          <Controller
            name="description"
            control={control}
            defaultValue={issue?.description}
            render={({ field: { onChange, onBlur, value } }) => (
              <SimpleMDE
                placeholder="Description for your issue..."
                onChange={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          <ErrorMessage>{errors.description?.message}</ErrorMessage>
        </div>
        <Button disabled={isSubmitting}>
          <Text as="span" className="cursor-pointer">
            {issue ? "Update Issue" : "Submit New Issue"}{" "}
            {isSubmitting && <Spinner />}
          </Text>
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
