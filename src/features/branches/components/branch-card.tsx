"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditIcon, TrashIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useConfirm } from "@/hooks/use-confirm";

import { useDeleteBranch } from "../api/use-delete-branch";
import { useUpdateBranch } from "../api/use-update-branch";
import { ButtonLoader } from "@/components/global/button-loader";

interface Props {
  name: string;
  id: string;
}

const schema = z.object({
  name: z.string(),
});

export const BranchCard = ({ name, id }: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  const [drop, setDrop] = useState(false);

  const { mutate, isPending } = useDeleteBranch();
  const { mutate: updateBranch, isPending: updatePending } = useUpdateBranch();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: name,
    },
  });

  const [DeleteBranchDialog, deleteBranch] = useConfirm(
    `Delete ${name} program`,
    `Are you sure you want to delete ${name} program`
  );

  const onSubmit = (values: z.infer<typeof schema>) => {
    updateBranch(
      { json: { name: values.name }, param: { branchId: id } },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      }
    );
  };

  const handleDeleteProgram = async () => {
    const ok = await deleteBranch();
    setDrop(false);
    if (!ok) return;
    mutate(
      { param: { branchId: id } },
      {
        onSuccess: () => {
          setIsEditing(!!id);
        },
      }
    );
  };

  return (
    <>
      <DeleteBranchDialog />
      <div className="group py-2 px-4 bg-neutral-50 capitalize dark:bg-neutral-900  flex items-center justify-between ">
        {isEditing ? (
          <Form {...form}>
            <form
              action=""
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-2"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        required
                        disabled={updatePending}
                        placeholder="update"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  size={"sm"}
                  variant={"outline"}
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button size={"sm"} type="submit" disabled={updatePending}>
                  <ButtonLoader
                    label="Save"
                    isLoading={updatePending}
                    loadingText="Saving"
                  />
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <p className="">{name}</p>
        )}

        {!isEditing && (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
            <Button
              variant={"ghost"}
              size={"icon"}
              onClick={() => setIsEditing(!!id)}
              className="rounded-full "
            >
              <EditIcon />
            </Button>
            <Button
              variant={"ghost"}
              size={"icon"}
              className="rounded-full "
              onClick={handleDeleteProgram}
            >
              <TrashIcon className="text-rose-500" />
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
