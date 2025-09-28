"use client";

import { useForm } from "react-hook-form";
import z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetPrograms } from "@/features/programs/api/use-get-programs";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCreateBranchProgram } from "../api/use-create-branch-program";
import { ButtonLoader } from "@/components/global/button-loader";
import { useState } from "react";

const programSchema = z.object({
  programId: z.string().min(1),
  branchId: z.string().min(1),
});

export function ProgramSelectForm({ branchId }: { branchId: string }) {
  const { data: programs } = useGetPrograms();
  const [open, setOpen] = useState(false);

  const { mutate: createBranchProgram, isPending } = useCreateBranchProgram();

  const form = useForm<z.infer<typeof programSchema>>({
    resolver: zodResolver(programSchema),
    defaultValues: {
      branchId,
      programId: "",
    },
  });

  const onSubmit = (values: z.infer<typeof programSchema>) => {
    createBranchProgram(
      {
        param: { branchId: values.branchId },
        json: { programId: values.programId },
      },
      {
        onSuccess: () => {
          setOpen(false);
          form.reset();
        },
      }
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="shadow-none">
          Add Program
        </Button>
      </PopoverTrigger>

      <PopoverContent className="min-w-sm max-w-lg">
        <Form {...form}>
          <form
            action=""
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 my-2"
          >
            <FormField
              control={form.control}
              name="programId"
              render={({ field }) => (
                <FormItem className=" flex flex-col gap-4 w-full">
                  <FormLabel>Programs</FormLabel>
                  <FormControl>
                    <Select
                      disabled={isPending}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full bg-background shadow-none">
                        <SelectValue placeholder="Add program to this branch" />
                      </SelectTrigger>
                      <SelectContent>
                        {programs?.map((program) => (
                          <SelectItem key={program.id} value={program.id}>
                            {program.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button
                type="submit"
                size={"sm"}
                className=""
                disabled={isPending}
              >
                <ButtonLoader
                  label="Add"
                  loadingText="Adding"
                  isLoading={isPending}
                />
              </Button>
            </div>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}
