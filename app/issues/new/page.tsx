"use client";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

interface IssueForm {
  title: string;
  description: string;
}
const NewIssuePage = () => {
  const { register, control, handleSubmit } = useForm<IssueForm>();

  const router = useRouter();

  const onSubmit: SubmitHandler<IssueForm> = async (data) => {
    await fetch("/api/issues", { method: "POST", body: JSON.stringify(data) });
    router.push("/issues");
  };

  return (
    <form className="max-w-xl space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="title">Title</label>
        <TextField.Root>
          <TextField.Input
            id="title"
            placeholder="Title for you issue…"
            {...register("title")}
          />
        </TextField.Root>
      </div>
      <div>
        <label>Description</label>
        <Controller
          name="description"
          control={control}
          render={({ field: { onChange, onBlur } }) => (
            <SimpleMDE
              placeholder="Description for your issue..."
              onChange={onChange}
              onBlur={onBlur}
            />
          )}
        />
      </div>
      <Button>Submit New Issue</Button>
    </form>
  );
};

export default NewIssuePage;
